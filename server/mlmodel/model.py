import sys
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

import torch
from transformers import AutoTokenizer
from torch.optim import AdamW
from models.text_dataset import TextDataset
from models.bert_classifier import BERTClassifier
import numpy as np
from torch.utils.data import DataLoader
from torch.nn.utils import clip_grad_norm_
from itertools import islice
from torch.nn import CrossEntropyLoss
import os
from tqdm import tqdm
from huggingface_hub import hf_hub_download,HfApi,login
import io
import tempfile
from dotenv import load_dotenv

load_dotenv()

token = os.getenv("HUGGINGFACEHUB_TOKEN")
login(token=token)
print("🔑 Hugging Face Token Loaded:", bool(token))
model_name = os.getenv("HUGGINGFACEHUB_MODEL_NAME")

class AITextIdentificationModel:
  def __init__(self, epochs=3, max_len=128, batch_size=32, lr=2e-5, weight=None):
    torch.manual_seed(42)
    np.random.seed(42)

    if torch.cuda.is_available():
      torch.cuda.manual_seed_all(42)
      torch.backends.cudnn.deterministic = True
      torch.backends.cudnn.benchmark = False

    self.model = None
    self.tokenizer = None
    self.batch_size = batch_size
    self.epochs = epochs
    self.max_len = max_len
    self.lr = lr
    self.weight = weight
    self.optimizer = None
    self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

  def load_model(self):
    self.model = BERTClassifier()
    
    model_path = hf_hub_download(
        repo_id=model_name,
        filename="model.pth",
        repo_type="model",
    )

    model_data = torch.load(model_path, map_location=self.device)
    
    state_dict = model_data['model']
    clean_state_dict = {
      k.replace("module.", ""): v for k, v in state_dict.items()
    }
    self.model.load_state_dict(clean_state_dict)
    self.model.to(self.device)
    self.model.eval()

    #self.batch_size = model_data['batch_size']
    #self.epochs = model_data['epoch']
    #self.max_len = model_data['max_len']
    #self.lr = model_data['lr']
    
    self.optimizer = AdamW(self.model.parameters(), lr=self.lr)
    
    self.tokenizer = AutoTokenizer.from_pretrained(model_name, subfolder="tokenizer")
    print("✅ Model loaded from Hugging Face Hub successfully.")

  def save_model(self, model, optimizer, tokenizer):
    api = HfApi()

    buffer = io.BytesIO()

    torch.save({
      "model": model.state_dict(),
      "optimizer": optimizer.state_dict() if optimizer is not None else None,
      "epoch": self.epochs,
      "lr": self.lr,
      "batch_size": self.batch_size,
      "max_len": self.max_len,
    }, buffer)

    buffer.seek(0)

    api.upload_file(
      path_or_fileobj=buffer,
      path_in_repo="model.pth",
      repo_id=model_name,
      repo_type="model",
    )

    with tempfile.TemporaryDirectory() as tmpdir:
        tokenizer.save_pretrained(tmpdir)

        api.upload_folder(
            folder_path=tmpdir,
            path_in_repo="tokenizer",
            repo_id=model_name,
            repo_type="model",
        )

    print("✅ Uploaded to Hugging Face")

    print("✅ Model saved to Hugging Face Hub successfully.")

  def fit(self, X_train, y_train, resume=False):
    if self.model is None:
      raise ValueError("Model not loaded. Call load_model() first.")
    
    if self.optimizer is None:
      self.optimizer = AdamW(self.model.parameters(), lr=self.lr)
    
    X_train = X_train.to_numpy()
    y_train = y_train.to_numpy()

    dataset = TextDataset(X_train, y_train, self.tokenizer, self.max_len)

    g = torch.Generator()
    g.manual_seed(42)

    loader  = DataLoader(
       dataset, 
       batch_size=self.batch_size, 
       shuffle=True,
       generator = g,
       pin_memory=True if self.device.type == "cuda" else False
    )

    def get_class_weights(labels):
      labels = torch.tensor(labels)
      counts = torch.bincount(labels, minlength=2)

      weights = len(labels) / (len(counts) * counts.float())
      return weights
    

    class_weights = get_class_weights(y_train) if self.weight is None else self.weight
    class_weights = class_weights.to(self.device)
    criterion = CrossEntropyLoss(weight=class_weights)

    self.model.to(self.device)
    self.model.train()

    def save_checkpoint(model, optimizer, epoch, batch_idx):
      checkpoint_dir = os.path.join(os.path.dirname(__file__), "..", "train_checkpoint")
      os.makedirs(checkpoint_dir, exist_ok=True)

      buffer = io.BytesIO()
      torch.save({
          "model": model.state_dict(),
          "optimizer": optimizer.state_dict(),
          "epoch": epoch,
          "batch_idx": batch_idx,
      }, buffer)

      buffer.seek(0)

      api = HfApi()
      api.upload_file(
          path_or_fileobj=buffer,
          path_in_repo="checkpoint/checkpoint.pth",
          repo_id=model_name,
          repo_type="model",
      )

    
    def load_checkpoint(model, optimizer):
      try:
        checkpoint_path = hf_hub_download(
            repo_id=model_name,
            filename="checkpoint/checkpoint.pth",
            repo_type="model",
        )

        print("🔄 Loading from checkpoint...")

        ckpt = torch.load(checkpoint_path, map_location=self.device)
        
        print(f"✅ Checkpoint loaded: Epoch {ckpt['epoch']+1}, Batch {ckpt['batch_idx']+1}")
        model.load_state_dict(ckpt["model"])
        optimizer.load_state_dict(ckpt["optimizer"])

        return ckpt["epoch"], ckpt["batch_idx"]

      except Exception as e:
        print("⚠️ No checkpoint found. Starting from scratch.")
        return 0, 0

    def remove_checkpoint():
      api = HfApi()
      try:
        api.delete_file(
          repo_id=model_name,
          path_in_repo="checkpoint/checkpoint.pth",
          repo_type="model",
        )
        print("🗑️ Checkpoint removed successfully.")
      except Exception as e:
        print("⚠️ No checkpoint to remove.")
    
    if resume:
      print("🔄 Resuming training from last checkpoint...")
      start_epoch, start_batch = load_checkpoint(self.model, self.optimizer)
    else:
      print("🚀 Starting training from scratch...")
      start_epoch, start_batch = 0, 0

    for epoch in range(start_epoch, self.epochs):

      total_loss = 0.0
      total_batches = 0

      n_batches = len(loader)
      start_idx = start_batch if epoch == start_epoch else 0

      # If resuming, start from the saved batch index using islice so skipped
      # batches are not iterated or counted.
      if epoch == start_epoch and start_idx >= n_batches:
        start_batch = 0
        continue

      if epoch == start_epoch:
        data_iter = islice(loader, start_idx, None)
        total_to_process = n_batches - start_idx
      else:
        data_iter = loader
        total_to_process = n_batches

      enumerator = enumerate(data_iter, start=start_idx)
      progress_bar = tqdm(enumerator, total=total_to_process, desc=f"Epoch {epoch+1}/{self.epochs} - Training")

      for batch_idx, batch in progress_bar:
        input_ids = batch["input_ids"].to(self.device)
        attention_mask = batch["attention_mask"].to(self.device)
        labels = batch["label"].to(self.device).long()

        logits = self.model(input_ids, attention_mask)
        loss = criterion(logits, labels)

        self.optimizer.zero_grad()
        loss.backward()
        clip_grad_norm_(self.model.parameters(), 1.0)
        self.optimizer.step()

        total_loss += loss.item()
        total_batches += 1

      epoch_loss = total_loss / total_batches if total_batches > 0 else 0.0
      print(f"\n✅ Epoch {epoch+1} Completed | Average Loss: {epoch_loss:.4f}\n")
      last_batch_idx = batch_idx if 'batch_idx' in locals() else start_idx
      #save_checkpoint(self.model, self.optimizer, epoch, last_batch_idx)
      start_batch = 0
    remove_checkpoint()
    self.save_model(self.model, self.optimizer, self.tokenizer)
  
  def predict_proba(self, text):
    self.model.eval()

    encoding = self.tokenizer(
      text,
      return_tensors='pt',
      padding='max_length',
      truncation=True,
      max_length=self.max_len
    )

    input_ids = encoding['input_ids'].to(self.device)
    attention_mask = encoding['attention_mask'].to(self.device)

    with torch.no_grad():
      outputs = self.model(input_ids, attention_mask)
      probabilities = torch.softmax(outputs, dim=1)
    
    ai_prob = probabilities[0][1].item()
    human_prob = probabilities[0][0].item()

    return {
       'human': human_prob,
       'ai': ai_prob
    }
  
  def evaluate(self, X_data, y_data):
    dataset = TextDataset(X_data, y_data, self.tokenizer, self.max_len)
    dataloader = DataLoader(dataset, batch_size = self.batch_size, shuffle=False)
    self.model.eval()

    all_preds = []
    all_labels = []
    
    with torch.no_grad():
        for batch in tqdm(dataloader, desc="Evaluating"):

            input_ids = batch["input_ids"].to(self.device)
            attention_mask = batch["attention_mask"].to(self.device)
            labels = batch["label"].to(self.device).long()

            logits = self.model(input_ids, attention_mask)

            probs = torch.softmax(logits, dim=1)

            preds = torch.argmax(probs, dim=1)

            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(labels.cpu().numpy())

    return np.array(all_labels), np.array(all_preds)