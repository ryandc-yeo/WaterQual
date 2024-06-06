from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load('random_forest_model.pkl')  # Load the trained model
acceptable_ranges = {
    'ph': (0, 14),
    'Hardness': (47.4, 323),
    'Solids': (321, 61200),  # Converted 61.2k to 61200 for consistency
    'Chloramines': (0.35, 13.1),
    'Sulfate': (129, 481),
    'Conductivity': (181, 753),
    'Organic_carbon': (2.2, 28.3),
    'Trihalomethanes': (0.74, 124),
    'Turbidity': (1.45, 6.74)
}

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
        # Check pH values
        if 'ph' in data_df:
            if data_df['ph'].iloc[0] < 0:
                return jsonify({'potability': False, 'message': 'pH value is too low.'})
            if data_df['ph'].iloc[0] > 14:
                return jsonify({'potability': False, 'message': 'pH value is too high.'})


        # Check for sufficient data points
        non_empty_values = data_df.count().sum()
        if non_empty_values < 5:
            return jsonify({'potability': False, 'message': 'There are too few values provided so the model may not be completely accurate.'})

        # Impute missing values
        data_df = impute_missing_values(data_df)

        # Predict potability
        prediction = model.predict(data_df)
        potability = bool(prediction[0])
        message = "Our result is based on the provided data."

        if not potability:
            # Check for values outside acceptable ranges
            reasons = []
            for param, range_val in acceptable_ranges.items():
                if param in data_df.columns:
                    value = data_df.at[0, param]
                    if pd.notna(value) and (value < range_val[0] or value > range_val[1]):
                        reasons.append(f"{param} value of {value} is outside the acceptable range ({range_val[0]} - {range_val[1]})")

            if reasons:
                message = "Possible reasons: " + "; ".join(reasons)
            else:
                message = "Water is not potable based on the analysis."

        # Return the prediction as JSON
        return jsonify({'potability': potability, 'message': message})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
