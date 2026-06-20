from fastapi import APIRouter, HTTPException, status, UploadFile, File
from app.models.schemas import TextInput
from mlmodel.model import AITextIdentificationModel
import re
import io
from pypdf import PdfReader

router = APIRouter()
model = AITextIdentificationModel(locally=True)
model.load_model()

@router.post("/predict")
async def predict(input: TextInput):
    result = model.predict_proba(input.text)
    isAIGenerated = result['ai'] > 0.5
    
    word_count = len(re.findall(r'\b\w+\b', input.text))
    if word_count > 100000:
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

@router.post("/predict-pdf")
async def predict_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format. Please upload a PDF file."
        )
    
    try:
        contents = await file.read()
        pdf_file = io.BytesIO(contents)
        reader = PdfReader(pdf_file)
        
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        
        text = text.strip()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to parse PDF file: {str(e)}"
        )
        
    if not text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No text could be extracted from the PDF file."
        )
        
    word_count = len(re.findall(r'\b\w+\b', text))
    if word_count > 100000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Word limit exceeded. Maximum allowed is 1000 words, but PDF has {word_count} words."
        )
    elif word_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Extracted text is empty. Please provide a PDF with readable text."
        )
        
    result = model.predict_proba(text)
    isAIGenerated = result['ai'] > 0.5
    
    return {
        'prediction': result,
        'AI': isAIGenerated,
        'word_count': word_count,
        'text_length': len(text),
        'extracted_text': text,
        'result': 'Success'
    }