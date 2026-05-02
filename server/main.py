from mlmodel.model import AITextIdentificationModel
import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
import os

def main():
	model = AITextIdentificationModel()
	model.load_model()

	texts = input("Enter text to classify: ")
	while texts.lower() != 'exit':
		proba = model.predict_proba(texts)
		label = "AI-Generated" if proba['ai'] > 0.5 else "Human-Written"
		print(f"Predicted Label: {label} (AI Probability: {proba['ai']:.4f})")
		texts = input("Enter text to classify (or 'exit' to quit): ")
	



 
if __name__ == "__main__":
	main()