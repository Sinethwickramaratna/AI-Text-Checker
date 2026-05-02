import torch
import torch.nn as nn
from transformers import AutoModel

MODEL_NAME = 'sentence-transformers/all-MiniLM-L6-v2'


class BERTClassifier(nn.Module):
    def __init__(self, num_labels=2):
        super().__init__()

        self.bert = AutoModel.from_pretrained(MODEL_NAME)
        hidden_size = self.bert.config.hidden_size

        self.dropout = nn.Dropout(0.3)
        self.fc = nn.Linear(hidden_size, num_labels)

    def forward(self, input_ids, attention_mask):

        outputs = self.bert(
            input_ids=input_ids,
            attention_mask=attention_mask
        )

        cls = outputs.last_hidden_state[:, 0, :]
        x = self.dropout(cls)
        logits = self.fc(x)

        return logits