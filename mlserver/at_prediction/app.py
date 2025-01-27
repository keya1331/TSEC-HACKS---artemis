import numpy as np 
from flask import Flask,request,jsonify,render_template
import os
import tensorflow as tf
from transformers import AutoTokenizer
from transformers import TFAutoModelForSeq2SeqLM,DataCollatorForSeq2Seq
from transformers import AdamWeightDecay
from transformers import AutoTokenizer, TFAutoModelForSeq2SeqLM
import speech_recognition as sr
from pydub import AudioSegment


app = Flask(__name__)

# Load the translation model and tokenizer
model_checkpoint = "Helsinki-NLP/opus-mt-en-hi"
tokenizer = AutoTokenizer.from_pretrained(model_checkpoint)
model = TFAutoModelForSeq2SeqLM.from_pretrained("tf_model/")

def convert_m4a_to_wav(m4a_path, wav_path):
    audio = AudioSegment.from_file(m4a_path, format="m4a")
    audio.export(wav_path, format="wav")

def convert_audio_to_text(audio_file_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file_path) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
    return text

def translate_text_to_hindi(input_text):
    tokenized = tokenizer([input_text], return_tensors="np")
    out = model.generate(**tokenized, max_length=128)
    with tokenizer.as_target_tokenizer():
        decoded_text = tokenizer.decode(out[0], skip_special_tokens=True)
    return decoded_text

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/convert', methods=['POST'])
def convert():
    if 'audioFile' not in request.files:
        return "No file uploaded", 400

    file = request.files['audioFile']
    if file.filename == '':
        return "No selected file", 400

    # Save the uploaded file
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    # Convert .m4a to .wav if necessary
    if file.filename.endswith('.m4a'):
        wav_path = file_path.replace('.m4a', '.wav')
        convert_m4a_to_wav(file_path, wav_path)
    else:
        wav_path = file_path

    # Convert audio to English text
    english_text = convert_audio_to_text(wav_path)

    # Translate English text to Hindi
    hindi_text = translate_text_to_hindi(english_text)

    return render_template("index.html", converted_text=hindi_text)

if __name__ == "__main__":
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)

