from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify, Blueprint
import requests
from flask_cors import CORS, cross_origin
import json
import os
from pandas import pd

app = Flask(__name__)
CORS(app)

user_URL = os.environ.get("user_URL")
product_URL = os.environ.get("product_URL")
shop_URL = os.environ.get("shop_URL")



@app.route('/getcartsproduct/<string:userid>', methods=['GET'])

def get_cart(UserId):
    products_in_cart = requests.get(f'http://127.0.0.1:5000/keranjang/{UserId}')

    product_ids = {'data': [product['ProductId'] for product in products_in_cart.json()]}
    products_details = requests.post(f'http://127.0.0.1:5000/product/get_multiple_products', json=product_ids).json()
    a = pd.DataFrame(products_details)

    shop_ids = {'data': [product['ShopId'] for product in products_details]}
    shop_list = requests.post(f'http://127.0.0.1:5000/shop/get_multiple_shops', json=shop_ids).json()
    b = pd.DataFrame(shop_list)

    final_dict = a.merge(b, on='ShopId', how='left').to_dict('records')
    return jsonify({
        "data": final_dict
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5008, debug=True)