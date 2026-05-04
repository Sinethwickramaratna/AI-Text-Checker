from fastapi import APIRouter, HTTPException, status
from app.models.schemas import TextInput
from mlmodel.model import AITextIdentificationModel
import re

router = APIRouter()
model = AITextIdentificationModel()
model.load_model()

@router.post("/predict")
async def predict(input: TextInput):
    result = model.predict_proba(input.text)
    isAIGenerated = result['ai'] > 0.5
    
    word_count = len(re.findall(r'\b\w+\b', input.text))
    if word_count > 1000:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail = f"Word limit exceeded. Maximum allowed is 1000 words, but got {word_count} words."
      )
    elif (word_count == 0):
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail = "Input text is empty. Please provide some text for analysis."
      )
    
    return {
      'prediction': result,
      'AI': isAIGenerated,
      'word_count': word_count,
      'text_length': len(input.text),
      'result': 'Success'
    }