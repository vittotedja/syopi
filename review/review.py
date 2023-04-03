from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import os
from supabase import create_client

url = os.environ.get("REVIEW_URL")
key = os.environ.get("REVIEW_KEY")
supabase = create_client(url, key)


app = Flask(__name__)
cors = CORS(app)

@app.route('/review', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        response = supabase.table('review').select("*").execute()
        return response.data

@app.route('/review/<string:ProductId>', methods=['GET'])
def get_review(ProductId):
    if request.method == 'GET':
        response = supabase.table('review').select("*").eq("ProductId", ProductId).execute()
        return response.data
    
@app.route('/review/getreviewrating/<string:ProductId>', methods=['GET'])
def get_review_rating(ProductId):
    if request.method == 'GET':
        response = supabase.table('review').select("Rating").eq("ProductId", ProductId).execute()
        return response.data
    
@app.route('/review/giverating', methods=['POST'])
def give_rating():
    data = request.get_json()
    response = supabase.table('review').insert(data).execute()
    return response.data   

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)
