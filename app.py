from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
                # Check pH values
        # Handle data types; assume all should be numeric
        data_df = data_df.apply(pd.to_numeric, errors='coerce')
        if 'ph' in data_df:
            if data_df['ph'].iloc[0] < 0:
                return jsonify({'potability': False, 'message': 'The pH value is too low!'})
            if data_df['ph'].iloc[0] > 14:
                return jsonify({'potability': False, 'message': 'The pH value is too high!'})
            
        # Check for sufficient data points
        non_empty_values = data_df.count().sum()
        if non_empty_values < 5:
            return jsonify({'potability': False, 'message': 'There are too few values provided so the model may not be completely accurate.'})

        # Impute missing values
        data_df = impute_missing_values(data_df)

        # Predict potability
        prediction = model.predict(data_df)

        # Return the prediction as JSON
        return jsonify({'potability': bool(prediction[0]), 'message': 'Our result based on provided data.'})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
