from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
import requests

recommender_bp = Blueprint('recommender', __name__)

cors = CORS(recommender_bp)
 
@recommender_bp.route('/recommender', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        res = requests.get('http://127.0.0.1:5000/product')
        product_list = res.json()
        return product_list