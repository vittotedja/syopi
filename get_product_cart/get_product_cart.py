from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify, Blueprint
import requests
from flask_cors import CORS, cross_origin
import json

get_product_cart_bp = Blueprint('get_product_cart', __name__)
cors = CORS(get_product_cart_bp)

@get_product_cart_bp.route('/getcartsproduct/<string:userid>', methods=['GET'])
def get_cart(userid):
    productList = []
    productIdDict = {'data': []}
    cart_list = requests.get(f'http://127.0.0.1:5000/keranjang/1')
    for order in cart_list.json():
        productIdDict['data'].append(order['ProductId'])
    x = requests.post(f'http://127.0.0.1:5000/product/getmultipleproducts', json=productIdDict)
    return x.json()