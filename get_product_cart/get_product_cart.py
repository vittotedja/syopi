from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify, Blueprint
import requests
from flask_cors import CORS, cross_origin
import json
import os


app = Flask(__name__)
CORS(app)

user_URL = os.environ.get("user_URL")
product_URL = os.environ.get("product_URL")
shop_URL = os.environ.get("shop_URL")



@app.route('/getcartsproduct/<string:userid>', methods=['GET'])
def get_cart(userid):
    productList = []
    productIdDict = {'data': []}
    cart_list = requests.get(f'{user_URL}/keranjang/1')
    for order in cart_list.json():
        productIdDict['data'].append(order['ProductId'])
    print(productIdDict)
    x = requests.post(f'{product_URL}/getmultipleproducts', json=productIdDict)
    shopIdDict = {"data": []}
    print(x.json())
    for product in x.json():
        print(product)
        shopIdDict["data"].append(product["ShopId"])
    print("PRINTING SHOP ID DICT")
    print(shopIdDict)
    y = requests.post(f'{shop_URL}/getmultipleshops', json=shopIdDict)
    shop_list = y.json()["data"]
    product_list = x.json()
    final_list = [prod.update(shop) or prod for prod, shop in zip(shop_list, product_list)]
    print(final_list)
    return jsonify({
        "data": final_list
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5008, debug=True)
