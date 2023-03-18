from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
import requests

browse_bp = Blueprint('browse', __name__)

cors = CORS(browse_bp)
 
@browse_bp.route('/browse', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        res = requests.get('http://127.0.0.1:5000/recommender')
        product_list = res.json()
        return product_list