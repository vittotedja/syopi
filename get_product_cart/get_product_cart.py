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
    # print(productIdDict)
    x = requests.post(f'http://127.0.0.1:5000/product/getmultipleproducts', json=productIdDict)
    shopIdDict = {"data": []}
    # print(x.json())
    for product in x.json():
        print(product)
        shopIdDict["data"].append(product["ShopId"])
    # print("PRINTING SHOP ID DICT")
    # print(shopIdDict)
    y = requests.post(f'http://127.0.0.1:5000/shop/getmultipleshops', json=shopIdDict)
    shop_list = y.json()["data"]
    product_list = x.json()
    final_list = [prod.update(shop) or prod for prod, shop in zip(shop_list, product_list)]
    # print(final_list)
    return jsonify({
        "data": final_list
    })