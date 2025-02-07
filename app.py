from flask import Flask, render_template, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/mining')
def mining():
    return render_template('mining.html')

@app.route('/api/price')
def get_price():
    # Temporary mock data
    return jsonify({
        "price": "0.0001",
        "change": "+5.2%"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
