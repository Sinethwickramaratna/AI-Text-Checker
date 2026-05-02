from mlmodel.model import AITextIdentificationModel
import pandas as pd
from sklearn.model_selection import train_test_split
import os
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

model = AITextIdentificationModel()
model.load_model(for_training=True)

data_path = os.path.join(os.path.dirname(__file__), "./data/article_level_data.csv")
data = pd.read_csv(data_path)

X = data['article']
#author_mapping = {"Human": 0, "AI": 1}
#data['class'] = data['Author'].map(author_mapping)
y = data['class']

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train, epochs=3, batch_size=32)

y_true, y_pred = model.evaluate(X_val, y_val)

print("Accuracy:", accuracy_score(y_true, y_pred))
print("Precision: ", precision_score(y_true, y_pred))
print("Recall: ", recall_score(y_true, y_pred))
print("F1 Score: ", f1_score(y_true, y_pred))

print("Classification Report:")
print(classification_report(y_true, y_pred))