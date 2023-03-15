from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
from supabase import create_client

review_url = os.environ.get("REVIEW_URL")
review_key = os.environ.get("REVIEW_KEY")
review = create_client(review_url, review_key)

product_url = os.environ.get("PRODUCT_URL")
product_key = os.environ.get("PRODUCT_KEY")
product = create_client(product_url, product_key)

app = Flask(__name__)
cors = CORS(app)

@app.route('/rating/<string:ProductId>', methods=['GET'])
def index(ProductId):
    res = review.table('review').select("review_rating").eq("product_id", ProductId).execute()
    rating_list = res.data
    sum  = 0
    count = 0
    for i in range(len(rating_list)):
        sum += rating_list[i]['review_rating']
        count += 1
    product.table('product').update({"AvgRating": sum/count}).eq("ProductId", ProductId).execute()
    return [sum/count]

@app.route('/giverating/<string:ProductId>', methods=['POST'])
def give_rating(ProductId):
    data = request.get_json()
    response = review.table('review').insert(data).execute()
    return response.data    


if __name__ == '__main__':
    app.run(port=5003, debug=True)