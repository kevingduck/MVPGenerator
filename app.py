from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import openai
import os
import json

app = Flask(__name__)
CORS(app)

openai.api_key = os.environ.get("OPENAI_KEY")


@app.route('/')
def app_page():
    return render_template('app.html')


@app.route('/waitlist')
def waitlist():
    return render_template('waitlist.html')


@app.route('/home')
def home():
    return render_template('index.html')


@app.route('/generate-response', methods=['POST'])
def generate_response():
    data = request.get_json()
    user_input = data['input']

    if 'messages' in data:
        messages = data['messages']
    else:
        messages = [{"role": "system", "content": "You are a helpful assistant who is good at business, strategy and designing solutions that can generate revenue. You will help me generate MVP ideas and business plans to go along with them. "}]

    messages.append({"role": "user", "content": user_input})

    response = openai.ChatCompletion.create(
        model="gpt-4",  # Update the model to the desired version
        messages=messages,
        max_tokens=150,
        n=1,
        temperature=0.7,
    )

    message = response.choices[0].message.content.strip()
    messages.append({"role": "assistant", "content": message})
    return jsonify(message=message, messages=messages)


if __name__ == '__main__':
    app.run(debug=True)
