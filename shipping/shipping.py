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

url = os.environ.get("SHIPPING_URL")
key = os.environ.get("SHIPPING_KEY")
supabase = create_client(url, key)

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