from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from joblib import load
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Load the model once when the app starts
try:
    model = load("./disease_predictions/saved_model/mnb.joblib")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def create_feature_vector(symptoms_dict):
    # Initialize all symptoms to 0
    all_symptoms = {
        'itching': 0, 'skin_rash': 0, 'nodal_skin_eruptions': 0, 'continuous_sneezing': 0,
        # ...add all other symptoms with 0 as default...
    }
    
    # Update with received symptoms
    for symptom in symptoms_dict:
        if symptom in all_symptoms:
            all_symptoms[symptom] = 1
    
    return all_symptoms

@app.route('/disease_prediction/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        # Get symptoms from request
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        
        # Create feature vector
        feature_dict = create_feature_vector(symptoms)
        
        # Convert to DataFrame
        df_test = pd.DataFrame([feature_dict])
        
        # Make prediction
        prediction = model.predict(df_test)
        
        return jsonify({
            'disease': prediction[0],
            'symptoms_received': symptoms
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/diseas_prediction/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
