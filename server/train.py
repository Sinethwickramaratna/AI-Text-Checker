from mlmodel.model import AITextIdentificationModel
import pandas as pd
from sklearn.model_selection import train_test_split
import os
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

model = AITextIdentificationModel(epochs=10)
model.load_model()

#data_path = os.path.join(os.path.dirname(__file__), "./data/article_level_data.csv")
#data = pd.read_csv(data_path)
#print(data.head())

test_data_path = os.path.join(os.path.dirname(__file__), "./data/test-00000-of-00001.parquet")
test_data = pd.read_parquet(test_data_path)

#print(data['generated'].value_counts())
#X_train = data['text']
#Y_train = data['generated']

X_test = test_data['text']
Y_test = test_data['generated']

#model.fit(X_train, Y_train)

print("Evaluating on test set...")
y_true, y_pred = model.evaluate(X_test, Y_test)
print("Accuracy:", accuracy_score(y_true, y_pred))
print("Precision: ", precision_score(y_true, y_pred))
print("Recall: ", recall_score(y_true, y_pred))
print("F1 Score: ", f1_score(y_true, y_pred))

print("Classification Report:")
print(classification_report(y_true, y_pred))
"""X = data['content_text']
author_mapping = {"Human": 0, "AI": 1}
data['class'] = data['author_type'].map(author_mapping)
y = data['class']
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.1, random_state=42)
model.fit(X_train, y_train)

y_true, y_pred = model.evaluate(X_val, y_val)

print("Accuracy:", accuracy_score(y_true, y_pred))
print("Precision: ", precision_score(y_true, y_pred))
print("Recall: ", recall_score(y_true, y_pred))
print("F1 Score: ", f1_score(y_true, y_pred))

print("Classification Report:")
print(classification_report(y_true, y_pred))"""