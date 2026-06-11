# Docker Setup Guide - AI Text Checker

This project is fully containerized with optimized Docker configurations for both the **FastAPI Server** and the **Vite React Client**, orchestrated using **Docker Compose**.

## Project File Structure

Here is how the Docker files are laid out across the project structure:

```
AI_Text_Checker/
├── docker-compose.yml          # Orchestrates the server and client containers
├── DOCKER_GUIDE.md             # This guide
├── client/
│   ├── Dockerfile              # Multi-stage build for building and serving the React app
│   ├── nginx.conf              # Nginx server configuration with SPA routing support
│   └── .dockerignore           # Excludes node_modules and builds from Docker context
└── server/
    ├── Dockerfile              # Slim Python image optimized for CPU PyTorch workloads
    └── .dockerignore           # Excludes venv, caches, and local configuration
```

---

## Configuration Files Detailed

### 1. Server (`server/Dockerfile`)
- Uses `python:3.10-slim` as a base image.
- **PyTorch CPU Optimization:** Instead of downloading the standard PyPI version of PyTorch (which includes heavy CUDA GPU binaries and is ~2.5GB), we explicitly fetch the **CPU-only PyTorch build** (`--index-url https://download.pytorch.org/whl/cpu`). This reduces the server container image size by nearly **2 GB**.
- **Hugging Face Caching:** Sets `HF_HOME=/cache/huggingface` so the BERT model download location is redirectable to a persistent volume.

### 2. Client (`client/Dockerfile` & `nginx.conf`)
- **Multi-Stage Build:** Uses `node:20-alpine` to install dependencies and run the production build (`npm run build`). The resulting static files are then copied into a tiny `nginx:alpine` image.
- **Single Page App Routing:** Uses a custom `nginx.conf` so that paths visited directly (like `/how-it-works`) are correctly routed back to React Router instead of causing Nginx 404 errors.
- **Environment Handling:** Injects `VITE_API_URL` during the build stage using a Docker build argument.

### 3. Docker Compose (`docker-compose.yml`)
- Automates building and launching both containers.
- Mounts the `hf-cache` named volume to the server at `/cache` so the downloaded Hugging Face model (`SineWick/AITextChecker`) is cached on your hard drive. Restarting the server container will not require re-downloading the model.
- Automatically reads the environment variables (`HUGGINGFACEHUB_TOKEN`, `HUGGINGFACEHUB_MODEL_NAME`) from your existing `server/.env` file.

---

## How to Run

### Prerequisites
- Make sure [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose are installed and running on your machine.
- Verify your Hugging Face credentials are set in `server/.env`:
  ```env
  HUGGINGFACEHUB_TOKEN=your_token_here
  HUGGINGFACEHUB_MODEL_NAME=SineWick/AITextChecker
  ```

### Steps to Run

1. **Start the Application**
   Run the following command in the root directory:
   ```bash
   docker compose up --build -d
   ```
   *Note: The first time the server starts, it will download the Hugging Face model and tokenizer weights (~400MB). You can inspect the logs to check the download progress:*
   ```bash
   docker compose logs -f server
   ```

2. **Access the Services**
   - **Client (Frontend):** [http://localhost:3000](http://localhost:3000)
   - **Server (FastAPI Backend docs):** [http://localhost:8000/docs](http://localhost:8000/docs)

3. **Stop the Application**
   ```bash
   docker compose down
   ```

4. **Clear Caches (If you want to re-download the model)**
   ```bash
   docker compose down -v
   ```
