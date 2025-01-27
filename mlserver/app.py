from flask import Flask, request, jsonify, url_for, redirect, render_template
import pandas as pd
import numpy as np
from joblib import load
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Load the model once when the app starts

ndp_model=pickle.load(open('model.pkl','rb'))

try:
    dp_model = load("./disease_predictions/saved_model/mnb.joblib")
except Exception as e:
    print(f"Error loading model: {e}")
    dp_model = None

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
    if dp_model is None:
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
        prediction = dp_model.predict(df_test)
        
        return jsonify({
            'disease': prediction[0],
            'symptoms_received': symptoms
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/diseas_prediction/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model_loaded': dp_model is not None})


@app.route('/natural_disaster_prediction/')
def hello_world():
    return render_template("forest_fire.html")


@app.route('/natural_disaster_prediction/predict',methods=['POST','GET'])
def predict():
    int_features=[int(x) for x in request.form.values()]
    final=[np.array(int_features)]
    print(int_features)
    print(final)
    prediction=ndp_model.predict_proba(final)
    output='{0:.{1}f}'.format(prediction[0][1], 2)

    if output>str(0.5):
        return render_template('forest_fire.html',pred='Your Forest is in Danger.\nProbability of fire occuring is {}'.format(output),bhai="kuch karna hain iska ab?")
    else:
        return render_template('forest_fire.html',pred='Your Forest is safe.\n Probability of fire occuring is {}'.format(output),bhai="Your Forest is Safe for now")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
