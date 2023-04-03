from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get("SHIPPING_URL")
key = os.environ.get("SHIPPING_KEY")
supabase = create_client(url, key)


@app.route("/shipping/find_by_shippingid/<string:ShippingId>", methods=['GET'])
def find_by_shippingid(ShippingId):
    shipping = supabase.table("shipping").select("*").eq("ShippingId", ShippingId).execute()
    if shipping:
        return jsonify(
            {
                "code": 200,
                "data": shipping.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Shipping not found."
        }
    ), 404


@app.route("/shipping/find_by_driverid/<string:DriverId>", methods=['GET'])
def find_by_driverid(DriverId):
    shipping = supabase.table("shipping").select("*").eq("DriverId", DriverId).execute()
    if shipping:
        return jsonify(
            {
                "code": 200,
                "data": shipping.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Shipping not found."
        }
    ), 404



@app.route('/shipping/getall_shipping', methods=['GET'])
def get_all_shipping():
    shipping = supabase.table("shipping").select("*").execute()
    return shipping.data

@app.route("/shipping/getall_shipping_by_status/<string:status>", methods=['GET'])
def get_all_shipping_by_status(status):
    shipping = supabase.table("shipping").select("*").eq("ShippingStatus", status).execute()
    return shipping.data


@app.route("/shipping/accept", methods=['POST'])
def update_shipping_status():
    shipping_id = request.get_json()['ShippingId']
    shipping_status = request.get_json()['ShippingStatus']
    shipping = supabase.table("shipping").update({"ShippingId":shipping_id, "ShippingStatus": shipping_status}).eq("ShippingId", shipping_id).execute()
    return shipping.data

"""
@app.route("/shipping/accept/<string:ShippingId>", methods=['POST'])
def update_shipping_status(ShippingId):
    shipping_status = "Awaiting Pickup"
    shipping = supabase.table("shipping").update({"ShippingId":ShippingId, "ShippingStatus": shipping_status}).eq("ShippingId", ShippingId).execute()
    return shipping.data
"""



# Seller requests shipping
@app.route("/shipping/request", methods=['POST'])
def request_shipping():
    data = request.get_json()
    response = supabase.table('shipping').insert(data).execute()
    return response.data

# Courier accepts shipping
@app.route("/shipping/accept", methods=['POST'])
def create_shipping():
    data = request.get_json()
    response = supabase.table('shipping').insert(data).execute()
    return response.data