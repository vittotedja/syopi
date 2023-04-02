import os
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS


shipping_bp = Blueprint('shipping', __name__)
CORS(shipping_bp)


@shipping_bp.route("/shipping/request", methods=['POST'])
def request_shipping():
    data = request.get_json()
    # shipping_id = data['shipping_id']
    # shop_address = data['shop_address']
    # customer_address = data['customer_address']
    # courier_id = 1
    return data

@shipping_bp.route("/shipping/accept", methods=['POST'])
def create_shipping():
    shipping_id = request.get_json()
    response = supabase.table('shipping').insert(data).execute()
    return response.data