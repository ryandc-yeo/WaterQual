import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score, accuracy_score, f1_score, precision_score, recall_score
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
water = pd.read_csv("water_potability.csv")

# Handle missing values
water['ph'] = water['ph'].fillna(water.groupby('Potability')['ph'].transform('mean'))
water['Sulfate'] = water['Sulfate'].fillna(water.groupby('Potability')['Sulfate'].transform('mean'))
water['Trihalomethanes'] = water['Trihalomethanes'].fillna(water.groupby('Potability')['Trihalomethanes'].transform('mean'))

# Remove outliers
water = water[water["ph"] > 0]

# Define features and target variable
X = water.drop("Potability", axis=1)
y = water["Potability"]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize RandomForestClassifier with the best parameters
best_random_forest = RandomForestClassifier(max_depth=None, min_samples_leaf=2, min_samples_split=10, n_estimators=300, n_jobs=-1, random_state=42)

# Train the best model on the entire training set
best_random_forest.fit(X_train, y_train)

# Make predictions on the test set
y_pred = best_random_forest.predict(X_test)


# Evaluate the model on the test set
accuracy = accuracy_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
roc_auc = roc_auc_score(y_test, y_pred)

print(f"Test Accuracy: {accuracy:.2f}")
print(f"Test F1 Score: {f1:.2f}")
print(f"Test Precision: {precision:.2f}")
print(f"Test Recall: {recall:.2f}")
print(classification_report(y_test, y_pred))
print(f"Test ROC AUC Score: {roc_auc:.2f}")

joblib.dump(best_random_forest, 'random_forest_model.pkl')
