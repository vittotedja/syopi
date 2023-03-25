from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify, Blueprint
import requests
from flask_cors import CORS, cross_origin
from supabase import create_client

give_rating_bp = Blueprint('give_rating', __name__)
cors = CORS(give_rating_bp)

@give_rating_bp.route('/rating/<string:ProductId>', methods=['GET'])
def index(ProductId):
    res = requests.get(f'http://127.0.0.1:5000/getreviewrating/{ProductId}')
    rating_list = res.json()
    sum  = 0
    count = 0
    for i in range(len(rating_list)):
        sum += rating_list[i]['review_rating']
        count += 1
    avgRating = sum/count
    x = requests.get(f'http://127.0.0.1:5000/product/{ProductId}/{avgRating}')
    return x.json()[0]

# @give_rating_bp.route('/giverating/<string:ProductId>', methods=['POST'])
# def give_rating(ProductId):
#     data = request.get_json()
#     response = review.table('review').insert(data).execute()
#     return response.data    