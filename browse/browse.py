from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
import requests
import os

app = Flask(__name__)

CORS(app)

search_URL = os.environ.get("search_URL")
 
@app.route('/browse', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        res = requests.get(search_URL)
        product_list = res.json()
        return product_list
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5007, debug=True)
