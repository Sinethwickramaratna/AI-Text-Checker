from fastapi.middleware.cors import CORSMiddleware

def add_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "https://ai-text-checker-q67p3mk8q-sineth-wickramaratnas-projects.vercel.app",
            "http://localhost:3000"
        ],  # Allow all origins
        allow_credentials=True,
        allow_methods=["*"],  # Allow all HTTP methods
        allow_headers=["*"],  # Allow all headers
    )