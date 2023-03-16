from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS

recommender_bp = Blueprint('recommender', __name__)

cors = CORS(recommender_bp)
 
@recommender_bp.route('/recommender', methods=['GET', 'POST'])
def index():
    return jsonify({'message': 'Hello, World!'})