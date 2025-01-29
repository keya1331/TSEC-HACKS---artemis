import os
from dotenv import load_dotenv
from apscheduler.schedulers.background import BackgroundScheduler
import subprocess
import atexit
from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
import ollama
from ultralyticsplus import YOLO
import torch
import json
from torchvision import transforms, models
from PIL import Image
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
import pandas as pd

from wildfire_detection.src.satellite_functions import satellite_cnn_predict
from wildfire_detection.src.camera_functions import camera_cnn_predict
from wildfire_detection.src.meteorological_functions import weather_data_predict

import sqlite3

# Load environment variables from .env file
load_dotenv()
MAPBOX_TOKEN = os.getenv("MAPBOX_TOKEN")

def init_db():
    conn = sqlite3.connect(r"E:\Programs\TSEC\TSEC-HACKS---artemis\mlserver\wildfire_detection\src\alerts.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS alerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL
        )
    """
    )
    conn.commit()
    conn.close()

def run_alert_script():
    script_path = os.path.join(os.path.dirname(__file__), r"E:\Programs\TSEC\TSEC-HACKS---artemis\mlserver\wildfire_detection\src\email_alert.py")
    try:
        subprocess.run(["python", script_path], check=True)
        print("Processing script executed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error running processing script: {e}")

# Initialize the scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(func=run_alert_script, trigger="interval", minutes=5)  # Changed from hours=1
scheduler.start()

# Ensure the scheduler is shut down properly on exit
atexit.register(lambda: scheduler.shutdown())

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def home():
    return redirect("http://localhost:3000/wildfire")

@app.route("/detect/camera")
def detect_camera():
    return redirect("http://localhost:3000/wildfire/camera")

@app.route("/detect/satellite")
def detect_satellite():
    return redirect("http://localhost:3000/wildfire/satellite")

@app.route("/alert", methods=["GET", "POST"])
def alert():
    if request.method == "GET":
        return redirect("http://localhost:3000/wildfire/alert")

    if request.method == "POST":
        data = request.json
        email = data.get("email")
        latitude = data.get("latitude")
        longitude = data.get("longitude")

        if not email or latitude == 0 or longitude == 0:
            return jsonify({
                "success": False,
                "message": "Invalid coordinates or missing information."
            }), 400

        try:
            conn = sqlite3.connect(r"E:\Programs\TSEC\TSEC-HACKS---artemis\mlserver\wildfire_detection\src\alerts.db")
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM alerts WHERE email=?", (email,))
            existing_alert = cursor.fetchone()
            if existing_alert:
                return jsonify({
                    "success": False,
                    "message": "This email is already subscribed to alerts."
                }), 400

            cursor.execute(
                "INSERT INTO alerts (email, latitude, longitude) VALUES (?, ?, ?)",
                (email, latitude, longitude),
            )
            conn.commit()
            conn.close()
            return jsonify({
                "success": True,
                "message": "Alert subscription successful! You will now receive wildfire alerts."
            }), 200
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500

@app.route("/satellite_predict", methods=["POST"])
def satellite_predict():
    data = request.json
    latitude = data["location"][1]
    longitude = data["location"][0]
    zoom = data["zoom"]

    output_size = (350, 350)
    crop_amount = 35
    save_path = "satellite_image.png"

    prediction_sattelite = satellite_cnn_predict(
        latitude, longitude, output_size=output_size,
        zoom_level=zoom, crop_amount=crop_amount, save_path=save_path
    )

    satellite_confidence = round((prediction_sattelite if prediction_sattelite > 0.5 else 1 - prediction_sattelite) * 100)
    satellite_status = 1 if prediction_sattelite > 0.5 else 0

    prediction_weather = weather_data_predict(latitude, longitude)
    weather_confidence = round((prediction_weather if prediction_weather > 0.5 else 1 - prediction_weather) * 100)
    weather_status = 1 if prediction_weather > 0.5 else 0

    prediction_average = (prediction_sattelite + prediction_weather) / 2
    average_confidence = round((prediction_average if prediction_average > 0.5 else 1 - prediction_average) * 100)
    average_status = 1 if prediction_average > 0.5 else 0

    return jsonify({
        "satellite_probability": satellite_confidence,
        "satellite_status": satellite_status,
        "weather_probability": weather_confidence,
        "weather_status": weather_status,
        "average_probability": average_confidence,
        "average_status": average_status
    }), 200

@app.route("/camera_predict", methods=["POST"])
def camera_predict():
    image_file = request.files["image"]
    prediction = camera_cnn_predict(image_file)
    confidence = round((prediction if prediction > 0.5 else 1 - prediction) * 100)
    wildfire_prediction = 1 if prediction < 0.5 else 0

    return jsonify({
        "wildfire_prediction": wildfire_prediction,
        "confidence": confidence,
    }), 200

@app.route('/api/generate', methods=['POST'])
def chat():
    data = request.get_json()
    prompt = data.get('prompt', '')

    try:
        print(f"Received prompt: {prompt}")
        output = ollama.generate(
            model='llama3.2',
            prompt=f'{prompt}',
        )
        print(f"Response content: {output['response']}")
        return jsonify({"response": output['response']})
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": str(e)}), 500


# Initialize model once at startup - similar to notebook approach
def init_plant_model():
    model = YOLO('foduucom/plant-leaf-detection-and-classification')
    # Configure model parameters like in notebook
    model.overrides['conf'] = 0.1
    model.overrides['iou'] = 0.15
    model.overrides['agnostic_nms'] = False
    model.overrides['max_det'] = 1000
    return model

plant_model = init_plant_model()

@app.route("/detect_flora", methods=["POST"])
def detect_plant():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    try:
        # Handle image upload similar to camera_predict
        image_file = request.files["image"]
        temp_path = "temp_plant.jpg"
        image_file.save(temp_path)

        # Perform prediction like in notebook
        results = plant_model.predict(temp_path)
        
        # Get the first result's boxes like in notebook
        boxes = results[0].boxes
        detections = []
        
        # Process each detection
        for box in boxes:
            detection = {
                "class_id": int(box.cls[0].item()),
                "class_name": plant_model.names[int(box.cls[0].item())],
                "confidence": float(box.conf[0].item()) * 100,  # Convert to percentage
                "bbox": box.xyxy[0].tolist()
            }
            detections.append(detection)

        # Clean up
        os.remove(temp_path)
        
        return jsonify({
            "success": True,
            "detections": detections,
            "total_detections": len(detections)
        }), 200

    except Exception as e:
        if os.path.exists("temp_plant.jpg"):
            os.remove("temp_plant.jpg")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# Wildlife detection setup
wildlife_device = 'cuda' if torch.cuda.is_available() else 'cpu'

def init_wildlife_model():
    model = models.resnet50()
    num_features = model.fc.in_features
    model.fc = torch.nn.Linear(num_features, 15)
    model.load_state_dict(torch.load('wildlife_detection/animal_classifier.pth', map_location=wildlife_device))
    model = model.to(wildlife_device)
    model.eval()
    return model

wildlife_model = init_wildlife_model()

# Wildlife detection transforms and classes
wildlife_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

wildlife_classes = ['bear', 'bird', 'cat', 'cow', 'deer', 'dog', 'dolphin', 
                   'elephant', 'giraffe', 'horse', 'kangaroo', 'lion', 'panda', 
                   'tiger', 'zebra']

def load_wildlife_image(image_file):
    image = Image.open(image_file)
    image = wildlife_transform(image).unsqueeze(0)
    return image.to(wildlife_device)

def predict_wildlife(image_file):
    image = load_wildlife_image(image_file)
    with torch.no_grad():
        outputs = wildlife_model(image)
        _, predicted = torch.max(outputs, 1)
    return predicted.item()

@app.route("/detect_faunna", methods=["POST"])
def detect_wildlife():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    try:
        image_file = request.files["image"]
        temp_path = "temp_wildlife.jpg"
        image_file.save(temp_path)

        # Predict wildlife
        predicted_class_idx = predict_wildlife(temp_path)
        predicted_class = wildlife_classes[predicted_class_idx]

        # Clean up
        os.remove(temp_path)

        return jsonify({
            "success": True,
            "wildlife_class": predicted_class,
            "class_id": predicted_class_idx
        }), 200

    except Exception as e:
        if os.path.exists("temp_wildlife.jpg"):
            os.remove("temp_wildlife.jpg")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

def init_wildfire_model():
    return tf.keras.models.load_model('wildfire_detection/models/WildFireDetector.h5')

wildfire_detection_model = init_wildfire_model()

@app.route('/process_image', methods=['POST'])
def process_image():
    image_upload = request.files['image']
    file_path = 'Imagefile/' + image_upload.filename

    if not os.path.exists('Imagefile/'):
        os.makedirs('Imagefile/')

    try:
        image_upload.save(file_path)

        process_img = Image.open(file_path)
        process_img = process_img.resize((350, 350))
        process_img = np.array(process_img)
        process_img = process_img / 255.0
        process_img = np.expand_dims(process_img, axis=0)

        predictions = wildfire_detection_model.predict(process_img)

        os.remove(file_path)

        if predictions[0][1] > 0.90:
            result = f'Wildfire Occurring! Take Preventive Measures (Probability: {predictions[0][1]})'
        elif predictions[0][1] < 0.03:
            result = f'Looks like the place is safe (Probability: {predictions[0][1]})'
        else:
            result = f'Probability: {predictions[0][1]}'

        return jsonify({'result': result})

    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({'error': str(e)}), 500

def create_df_img(filepath):
    labels = list(map(lambda x: os.path.split(os.path.split(x)[0])[1], filepath))
    filepath = pd.Series(filepath, name='Filepath').astype(str)
    labels = pd.Series(labels, name='Label')
    return pd.concat([filepath, labels], axis=1)

if __name__ == "__main__":
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)