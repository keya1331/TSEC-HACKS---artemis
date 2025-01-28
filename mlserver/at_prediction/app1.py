import numpy as np 
from flask import Flask,request,jsonify,render_template
import os
import tensorflow as tf
from transformers import AutoTokenizer
from transformers import TFAutoModelForSeq2SeqLM,DataCollatorForSeq2Seq
from transformers import AdamWeightDecay
from transformers import AutoTokenizer, TFAutoModelForSeq2SeqLM
import speech_recognition as sr



app = Flask(__name__)

model_checkpoint = "Helsinki-NLP/opus-mt-en-hi"
tokenizer = AutoTokenizer.from_pretrained(model_checkpoint)
model = TFAutoModelForSeq2SeqLM.from_pretrained("tf_model/")



# Example function for translation using the model (adjust as per your model)
def translate_text(text, model, tokenizer):
    tokenized = tokenizer([text], return_tensors="np")
    out = model.generate(**tokenized, max_length=256)
    with tokenizer.as_target_tokenizer():
        decoded_text = tokenizer.decode(out[0], skip_special_tokens=True)
    return decoded_text

@app.route('/')
def index():
    return render_template('index1.html')

@app.route('/convert', methods=['POST'])
def convert():
    text = request.form['text']  # Get the English text from the form

    # Translate the text using the deep learning model
    translated_text = translate_text(text, model, tokenizer)

    return render_template('index1.html', translated_text=translated_text)

if __name__ == '__main__':
    app.run(debug=True)
