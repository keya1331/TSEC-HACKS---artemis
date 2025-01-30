from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app) 

@app.route('/api/generate', methods=['POST'])
def chat():
    data = request.get_json()
    prompt = data.get('prompt', '')

    try:
        print(f"Received prompt: {prompt}")
        output = ollama.generate(
            model='llama3.2',
            prompt=f'Respond only with information relevant to wildlife conservation, environmental risks, flora/fauna identification, poaching prevention, fire hazards, and emergency coordination in forested areas. If the query is unrelated, steer the conversation back to these topics. Keep responses concise, accurate, and actionable. Prompt: {prompt}',
        )
        print(f"Response content: {output['response']}")
        return jsonify({"response": output['response']})
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)