import os
from dotenv import load_dotenv
from apscheduler.schedulers.background import BackgroundScheduler
import subprocess
import atexit
from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
import ollama

# from wildfire_detection.src.satellite_functions import satellite_cnn_predict
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
scheduler.add_job(func=run_alert_script, trigger="interval", hours=1)
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

# @app.route("/satellite_predict", methods=["POST"])
# def satellite_predict():
#     data = request.json
#     latitude = data["location"][1]
#     longitude = data["location"][0]
#     zoom = data["zoom"]

#     output_size = (350, 350)
#     crop_amount = 35
#     save_path = "satellite_image.png"

#     prediction_sattelite = satellite_cnn_predict(
#         latitude, longitude, output_size=output_size,
#         zoom_level=zoom, crop_amount=crop_amount, save_path=save_path
#     )

#     satellite_confidence = round((prediction_sattelite if prediction_sattelite > 0.5 else 1 - prediction_sattelite) * 100)
#     satellite_status = 1 if prediction_sattelite > 0.5 else 0

#     prediction_weather = weather_data_predict(latitude, longitude)
#     weather_confidence = round((prediction_weather if prediction_weather > 0.5 else 1 - prediction_weather) * 100)
#     weather_status = 1 if prediction_weather > 0.5 else 0

#     prediction_average = (prediction_sattelite + prediction_weather) / 2
#     average_confidence = round((prediction_average if prediction_average > 0.5 else 1 - prediction_average) * 100)
#     average_status = 1 if prediction_average > 0.5 else 0

#     return jsonify({
#         "satellite_probability": satellite_confidence,
#         "satellite_status": satellite_status,
#         "weather_probability": weather_confidence,
#         "weather_status": weather_status,
#         "average_probability": average_confidence,
#         "average_status": average_status
#     }), 200

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

if __name__ == "__main__":
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)