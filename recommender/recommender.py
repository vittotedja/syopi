from flask import Flask, jsonify, request, Blueprint
import json
import pandas as pd
from flask_cors import CORS
import requests
import os

app = Flask(__name__)

cors = CORS(app)

product_URL = os.environ.get("product_URL")
 
@app.route('/recommender', methods=['GET'])
def index():
    if request.method == 'GET':
        res = requests.get(product_URL)
        product_list = res.json()
        return sorted(product_list, key=lambda x: x['AvgRating']*x['AmountSold'], reverse=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5010, debug=True)
