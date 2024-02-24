# Import necessary libraries
from flask import Flask, request, jsonify
import json
import google.generativeai as genai
import os
import pickle
from flask_cors import CORS
from flask_cors import cross_origin

# Configure Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Set up the generative AI model
genai.configure(api_key="AIzaSyBRYGHYEWCEBrcStE2Y4ySqeU4rVcUpOWY")
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]
model = genai.GenerativeModel(
    model_name="gemini-pro", generation_config=generation_config, safety_settings=safety_settings
)

# Load conversation history
with open("history.json", "r") as f:
    print(f)
    history = json.load(f)

@app.route('/llm', methods=['POST'])
# @cross_origin()
def process_user_input():
    convo = model.start_chat(history=history)
    data = request.json
    user_input = data.get('Combined_Input')
    response = convo.send_message(user_input)
    response_text = response.text
    
    response_data = {"response": response_text}

    # response_data = response_data.replace('\n', '<br>') 

    # Add CORS headers
    response = jsonify(response_data)
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    response.headers.add("Access-Control-Allow-Credentials", "true")

    return response

if __name__ == '__main__':
    app.run(debug=True, port=6000)