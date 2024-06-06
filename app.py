from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)
model = joblib.load('random_forest_model.pkl')  # Load the trained model

def impute_missing_values(data_df):
    for column in data_df.columns:
        if data_df[column].dtype == float:
            data_df[column].fillna(data_df[column].mean(), inplace=True)
    return data_df

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract data from POST request as JSON
        data = request.get_json()

        # Convert data into DataFrame
        data_df = pd.DataFrame([data])

        # Handle data types; assume all should be numeric
        data_df = data_df.apply(pd.to_numeric, errors='coerce')

        # Impute missing values
        data_df = impute_missing_values(data_df)

        # Predict potability
        prediction = model.predict(data_df)

        # Return the prediction as JSON
        return jsonify({'potability': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
