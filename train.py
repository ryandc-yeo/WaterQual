import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score, accuracy_score, f1_score, precision_score, recall_score
from sklearn.ensemble import RandomForestClassifier
import scipy.stats as stats

water = pd.read_csv("water_potability.csv")

water['ph'] = water['ph'].fillna(water.groupby('Potability')['ph'].transform('mean'))
water['Sulfate'] = water['Sulfate'].fillna(water.groupby('Potability')['Sulfate'].transform('mean'))
water['Trihalomethanes'] = water['Trihalomethanes'].fillna(water.groupby('Potability')['Trihalomethanes'].transform('mean'))

water = water[water["ph"] > 0]

X = water.drop("Potability", axis=1)
y = water["Potability"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

random_forest = RandomForestClassifier(max_depth=14, n_estimators=600, n_jobs=-1, random_state=42)
random_forest.fit(X_train, y_train)

y_pred = random_forest.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)

print(f"Accuracy: {accuracy:.2f}")
print(f"F1 Score: {f1:.2f}")
print(f"Precision: {precision:.2f}")
print(f"Recall: {recall:.2f}")
print(classification_report(y_test, y_pred))

roc_auc = roc_auc_score(y_test, y_pred)
print(f"ROC AUC Score: {roc_auc:.2f}")
