from fastapi import FastAPI
from app.middleware.cors import add_cors_middleware
from app.routes import predict

app = FastAPI()

add_cors_middleware(app)

app.include_router(predict.router, prefix="/api")