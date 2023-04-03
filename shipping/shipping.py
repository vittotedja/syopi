from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS

shipping_bp = Blueprint('shipping', __name__)
CORS(shipping_bp)

from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get("SHIPPING_URL")
key = os.environ.get("SHIPPING_KEY")
supabase = create_client(url, key)

# Seller requests shipping
@shipping_bp.route("/shipping/request", methods=['POST'])
def request_shipping():
    data = request.get_json()
    response = supabase.table('shipping').insert(data).execute()
    return response.data

# Courier accepts shipping
@shipping_bp.route("/shipping/accept", methods=['POST'])
def create_shipping():
    data = request.get_json()
    response = supabase.table('shipping').insert(data).execute()
    return response.data