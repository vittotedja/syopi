from flask import request,jsonify, Flask, Blueprint
from flask_cors import CORS, cross_origin
import os
from supabase import create_client
from invokes import invoke_http

cart_bp = Blueprint('cart', __name__)
cors = CORS(cart_bp)


user_URL = "http://127.0.0.1:500/user"
product_URL = "http://127.0.0.1:500/product"
shop_URL= "http://127.0.0.1:500/shop"

@cart_bp.route("/view_cart", methods=["GET"])
def view_cart():
    if request.method=="GET":
        user_cart_response = invoke_http(user_URL+"/keranjang/1", method="GET")
        if user_cart_response.code == 200:
            user_cart_list = user_cart_response.data
            products = []
            for product_in_cart in user_cart_list:
                product_info_response = invoke_http(product_URL+"/"+product_in_cart["ProductId"], method="GET")
                shop_response = invoke_http(shop_URL+"/"+product_info_response.data["ProductId"])
                product_info = product_info_response.data[0]
                product_info.update(shop_response.data[0])
                products.append(product_info)
            return jsonify({
                "code": 200,
                "message": "List of products with complete info is returned",
                "data": products
            })
