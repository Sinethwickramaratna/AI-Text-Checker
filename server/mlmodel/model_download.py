import os
import sys

if sys.platform == "win32" or sys.platform == "darwin" or sys.platform == "linux" or sys.platform == "linux2" or sys.platform == "cygwin" or sys.platform == "msys":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

from dotenv import load_dotenv
from huggingface_hub import login, snapshot_download

# Locate paths relative to this script
current_dir = os.path.dirname(os.path.abspath(__file__))
# The .env file is in the parent directory (server/.env)
env_path = os.path.join(current_dir, "..", ".env")

# Load environment variables
load_dotenv(env_path)

token = os.getenv("HUGGINGFACEHUB_TOKEN")
model_name = os.getenv("HUGGINGFACEHUB_MODEL_NAME")

if not model_name:
    raise ValueError("HUGGINGFACEHUB_MODEL_NAME environment variable not set in .env")

print("🔄 Authenticating with Hugging Face...")
if token:
    login(token=token)
    print("🔑 Hugging Face Token Loaded.")
else:
    print("⚠️ No HUGGINGFACEHUB_TOKEN found in environment variables. Attempting public download...")

print(f"📥 Downloading model and tokenizer files for '{model_name}'...")

try:
    snapshot_download(
        repo_id=model_name,
        repo_type="model",
        local_dir=current_dir,
        local_dir_use_symlinks=False,
        allow_patterns=["model.pth", "tokenizer/*"]
    )
    print(f"🎉 Model and tokenizer files downloaded successfully to '{current_dir}'!")
except Exception as e:
    print(f"❌ Failed to download model: {e}")
    raise e
