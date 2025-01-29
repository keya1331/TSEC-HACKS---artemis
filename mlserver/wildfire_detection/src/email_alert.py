import sqlite3
from mailersend import emails
import os

from satellite_functions import satellite_cnn_predict
from meteorological_functions import weather_data_predict

from jinja2 import Template
from datetime import datetime


# Connect to the alerts database
def fetch_alerts():
    conn = sqlite3.connect("alerts.db")
    cursor = conn.cursor()
    cursor.execute("SELECT email, latitude, longitude FROM alerts")
    records = cursor.fetchall()
    conn.close()
    return records


# Perform predictions and generate a report
def generate_report(email, latitude, longitude):
    output_size = (350, 350)
    crop_amount = 35
    save_path = "satellite_image.png"

    satellite_prediction = satellite_cnn_predict(
        latitude,
        longitude,
        output_size=output_size,
        zoom_level=15,
        crop_amount=crop_amount,
        save_path=save_path,
    )

    weather_prediction = weather_data_predict(latitude, longitude)
    average_prediction = (satellite_prediction + weather_prediction) / 2

    report = {
        "email": email,
        "latitude": latitude,
        "longitude": longitude,
        "satellite_probability": round(satellite_prediction * 100),
        "weather_probability": round(weather_prediction * 100),
        "average_probability": round(average_prediction * 100),
        "risk_level": "High" if average_prediction > 0.6 else "Medium" if average_prediction > 0.4 else "Low",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    return report


# Prepare the HTML email content using a template
def prepare_email_content(report):
    template = Template(
        """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wildfire Risk Alert</title>
        <style>
            @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
        </style>
    </head>
    <body class="bg-gray-100 text-gray-800">
        <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
            <h1 class="text-2xl font-bold mb-4">🔥 Wildfire Risk Alert</h1>
            <div class="mb-4">
                <p class="text-lg">Alert Time: {{ report.timestamp }}</p>
                <p class="text-xl font-bold mt-2" style="color: {% if report.average_probability > 60 %}#ef4444{% elif report.average_probability > 40 %}#f59e0b{% else %}#22c55e{% endif %}">
                    Risk Level: {{ report.risk_level }}
                </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
                <h2 class="text-xl font-semibold mb-2">Location Details:</h2>
                <ul class="list-none space-y-2">
                    <li><strong>Latitude:</strong> {{ report.latitude }}</li>
                    <li><strong>Longitude:</strong> {{ report.longitude }}</li>
                </ul>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
                <h2 class="text-xl font-semibold mb-2">Risk Analysis:</h2>
                <ul class="list-none space-y-2">
                    <li>🛰️ <strong>Satellite Analysis:</strong> {{ report.satellite_probability }}% risk</li>
                    <li>🌤️ <strong>Weather Conditions:</strong> {{ report.weather_probability }}% risk</li>
                    <li>📊 <strong>Overall Risk:</strong> {{ report.average_probability }}%</li>
                </ul>
            </div>
            {% if report.average_probability > 60 %}
            <div class="bg-red-100 text-red-700 p-4 mt-4 rounded-lg">
                <strong>⚠️ High Risk Alert:</strong> Please stay vigilant and monitor local emergency communications.
            </div>
            {% endif %}
            <p class="mt-4 text-sm text-gray-600">This is an automated alert from our Wildfire Detection System.</p>
        </div>
    </body>
    </html>
    """
    )
    return template.render(report=report)


# Send the email using MailerSend
def send_email(report, email_content):
    mailer = emails.NewEmail(
        os.getenv("MAILERSEND_KEY")
    )

    mail_from = {
        "name": "Wildfire Alerts",
        "email": "alerts@trial-k68zxl21dwm4j905.mlsender.net",
    }

    recipients = [{"email": report["email"]}]

    mail_body = {}
    mailer.set_mail_from(mail_from, mail_body)
    mailer.set_mail_to(recipients, mail_body)
    mailer.set_subject("Wildfire Risk Report for Your Area", mail_body)
    mailer.set_html_content(email_content, mail_body)

    response = mailer.send(mail_body)
    print(f"Email sent to {report['email']} with response: {response}")


# Main function to process all alerts
def process_alerts():
    alerts = fetch_alerts()
    for alert in alerts:
        email, latitude, longitude = alert
        report = generate_report(email, latitude, longitude)
        email_content = prepare_email_content(report)
        send_email(report, email_content)


if __name__ == "__main__":
    process_alerts()