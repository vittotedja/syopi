from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import os
from supabase import create_client

url = os.environ.get("REVIEW_URL")
key = os.environ.get("REVIEW_KEY")
supabase = create_client(url, key)

review_bp = Blueprint('review', __name__)
cors = CORS(review_bp)

@review_bp.route('/review', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        response = supabase.table('review').select("*").execute()
        return response.data

    if request.method == 'POST':
        data = request.get_json()
        response = supabase.table('review').insert(data).execute()
        return response.data

@review_bp.route('/review/<string:ProductId>', methods=['GET'])
def get_review(ProductId):
    if request.method == 'GET':
        response = supabase.table('review').select("*").eq("product_id", ProductId).execute()
        return response.data
    
@review_bp.route('/review/getreviewrating/<string:ProductId>', methods=['GET'])
def get_review_rating(ProductId):
    if request.method == 'GET':
        response = supabase.table('review').select("review_rating").eq("product_id", ProductId).execute()
        return response.data
    
@review_bp.route('/review/giverating', methods=['POST'])
def give_rating():
    data = request.get_json()
    response = supabase.table('review').insert(data).execute()
    return response.data   