# 🛡️ VeriText AI — Enterprise-Grade AI Text Detector

VeriText AI is a high-fidelity, containerized AI text classification system built to identify machine-generated text with clinical precision. Combining a custom fine-tuned BERT model, an optimized FastAPI service, and a modern glassmorphic React interface, VeriText AI analyzes linguistic patterns, perplexity, and burstiness to separate human creativity from synthetic generation.

---

## 🚀 Key Features

*   **Linguistic Fingerprinting:** Detects mathematical markers and lack of natural variance characteristic of Large Language Models (LLMs).
*   **Context-Aware Detection:** Employs a custom-trained Transformer classifier based on bidirectional semantic encoders.
*   **Dual-Input Modalities:** Supporting both direct copy-pasted text and document uploads (PDF parsing using `pypdf`).
*   **Safety Constraints:** Automatic client-side and server-side verification (e.g., 1000-word limit, empty text prevention).
*   **Hugging Face Hub Integration:** Dynamically loads and checkpoints training weights and tokenizers directly to/from the Hugging Face Hub.
*   **Lightweight CPU Optimization:** PyTorch configuration tailored specifically for CPU environments in containerized setups, reducing the Docker footprint by nearly **2 GB**.
*   **Docker-Orchestrated Stack:** Automated single-command deployment with local volume caching for models.

---

## 🛠️ Technology Stack

### Backend (Server)
*   **Framework:** FastAPI (Python 3.10)
*   **ML Engine:** PyTorch, Hugging Face `transformers`
*   **Underlying Model:** `sentence-transformers/all-MiniLM-L6-v2` (BERT-based, 384-dimensional embeddings)
*   **Utilities:** `pypdf` (PDF extraction), `pydantic` (Schema Validation), `python-dotenv`

### Frontend (Client)
*   **Framework:** React 19 (Vite, Single Page Application routing)
*   **Styling:** Tailwind CSS v4 (Modern HSL system, custom glassmorphism components, and glowing border effects)
*   **HTTP Client:** Axios

### DevOps & Deployment
*   **Orchestration:** Docker Compose
*   **Reverse Proxy / Static Hosting:** Nginx (Alpine-based, customized for SPA fallback routing)

---

## 📂 Project Architecture

```text
AI_Text_Checker/
├── docker-compose.yml          # Docker service orchestrator
├── DOCKER_GUIDE.md             # Detailed Docker setup reference
├── README.md                   # Project documentation (this file)
├── client/
│   ├── Dockerfile              # Multi-stage production build (Node -> Nginx)
│   ├── nginx.conf              # Nginx configuration for React router fallbacks
│   ├── package.json            # Frontend dependency specifications
│   ├── vite.config.js          # Vite configurations
│   └── src/
│       ├── App.jsx             # React router setup
│       ├── index.css           # Global utility classes & design system
│       ├── components/         # Layout components (Navbar, Footer)
│       └── pages/              # Views (Homepage, How It Works, About, Contact)
└── server/
    ├── Dockerfile              # CPU-optimized Python container
    ├── main.py                 # Alternative development entrypoint
    ├── train.py                # Model training, evaluation, and evaluation reporting
    ├── requirements.txt        # Backend service dependencies
    ├── requirements-train.txt  # Training specific dependencies (pandas, scikit-learn)
    ├── app/
    │   ├── main.py             # FastAPI App configuration
    │   ├── middleware/         # CORS policy handlers
    │   ├── models/             # API Schemas (Pydantic models)
    │   └── routes/             # Predict and Predict-PDF endpoints
    └── mlmodel/
        ├── model.py            # Model wrapper (handles fit, predict, HF caching)
        └── models/             # PyTorch Dataset and Classifier modules
```

---

## ⚙️ Quick Start (Docker Compose)

The easiest way to get the entire ecosystem up and running is via Docker Compose.

### 1. Configure the Environment
Create a `.env` file in the `server/` directory:
```env
HUGGINGFACEHUB_TOKEN=your_huggingface_write_token_here
HUGGINGFACEHUB_MODEL_NAME=SineWick/AITextChecker
```

### 2. Build and Launch
Run the following in the project root:
```bash
docker compose up --build -d
```
*Note: During the initial start, the server will fetch the tokenizer and model weights (~400MB) from Hugging Face. The model is cached in a local Docker volume `hf-cache`, so subsequent restarts are instantaneous.*

### 3. Access
*   **Frontend Client:** [http://localhost:3000](http://localhost:3000)
*   **Interactive API Docs (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 💻 Local Development Setup

If you prefer to run the client and server locally without Docker:

### Prerequisites
*   Node.js (v20+)
*   Python (3.10+)

### Backend Installation & Setup
1. Navigate to the server folder and set up a virtual environment:
   ```bash
   cd server
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   pip install -r requirements-train.txt
   ```
3. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend Installation & Setup
1. Navigate to the client folder:
   ```bash
   cd client
   npm install
   ```
2. Set up environment variables (optional, defaults to port 8000):
   Create `client/.env`:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```
3. Launch Vite development server:
   ```bash
   npm run dev
   ```
   Open the browser at the listed local address (typically [http://localhost:5173](http://localhost:5173)).

---

## 🧬 Machine Learning & Model Training

The classifier uses **Sentence-Transformers/all-MiniLM-L6-v2** as its backbone. It extracts semantic embeddings and forwards them to a custom classification head (`BERTClassifier`) with dropout regularization.

### Training Pipeline
To train, resume training, or evaluate the model:
1. Make sure your training/testing datasets are placed in `server/data/` (e.g., `.parquet` or `.csv` files).
2. Configure your hyperparameters inside `server/train.py`:
   *   `epochs`
   *   `learning_rate`
   *   `max_len`
3. Execute the training script:
   ```bash
   python server/train.py
   ```
4. **Checkpointing & Uploads:**
   *   The wrapper (`AITextIdentificationModel`) uploads intermediate checkpoints to Hugging Face Hub dynamically during long runs.
   *   Upon successful completion, model weights (`model.pth`) and the tokenizer folder structure are serialized and pushed directly to the repository specified in `HUGGINGFACEHUB_MODEL_NAME`.

---

## 📡 API Endpoints

### `POST /api/predict`
Analyzes raw text content.
*   **Request Body (JSON):**
    ```json
    {
      "text": "Your text to analyze here..."
    }
    ```
*   **Response (JSON):**
    ```json
    {
      "prediction": {
        "human": 0.0543,
        "ai": 0.9457
      },
      "AI": true,
      "word_count": 5,
      "text_length": 28,
      "result": "Success"
    }
    ```

### `POST /api/predict-pdf`
Extracts text from an uploaded PDF and performs classification.
*   **Request Body (Multipart Form):**
    *   `file`: PDF document binary.
*   **Response (JSON):**
    ```json
    {
      "prediction": {
        "human": 0.9821,
        "ai": 0.0179
      },
      "AI": false,
      "word_count": 342,
      "text_length": 2104,
      "extracted_text": "Parsed document text...",
      "result": "Success"
    }
    ```

---

## 🛡️ License and Integrity
This repository is configured to respect CORS policies, secure credentials via environment variables, and manage model downloads efficiently. For deployment details or performance tuning, refer to the [Docker Setup Guide](DOCKER_GUIDE.md).
