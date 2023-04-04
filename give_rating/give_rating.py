from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify, Blueprint
import requests
from flask_cors import CORS, cross_origin
from supabase import create_client
import os

app = Flask(__name__)
cors = CORS(app)

review_URL = os.environ.get("review_URL")
product_URL = os.environ.get("product_URL")

@app.route('/rating/<string:ProductId>', methods=['GET'])
def index(ProductId):
    res = requests.get(f'http://review1:5003/review/getreviewrating/{ProductId}')
    rating_list = res.json()
    sum  = 0
    count = 0
    for i in range(len(rating_list)):
        sum += rating_list[i]['review_rating']
        count += 1
    avgRating = sum/count
    x = requests.get(f'{product_URL}/{ProductId}/{avgRating}')
    return x.json()[0]

# @app.route('/giverating/<string:ProductId>', methods=['POST'])
# def give_rating(ProductId):
#     data = request.get_json()
#     response = review.table('review').insert(data).execute()
#     return response.data    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5009, debug=True)
