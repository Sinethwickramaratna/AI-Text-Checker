from fastapi import FastAPI
from pydantic import BaseModel
from mlmodel.model import AITextIdentificationModel

app = FastAPI()

model = AITextIdentificationModel()
model.load_model()

class TextInput(BaseModel):
	text: str

@app.get("/")
def home():
	return {"message": "Welcome to the AI Text Checker API!"}

@app.post("/analyze")
def analyze_text(request: TextInput):
	print(request)
	text = request.text
	# Placeholder for text analysis logic

	words = text.split()
	word_count = len(words)

	probabilities = model.predict_proba(text)

	return{
		'probabilities': probabilities,
		'length': len(text),
		'word_count': word_count,
		'status': 'Success',
	}