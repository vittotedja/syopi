from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
from datetime import datetime, timedelta
from supabase import create_client

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

app = Flask(__name__)
cors = CORS(app)

@app.route('/review', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        response = supabase.table('review').select("*").execute()
        return response.data

    if request.method == 'POST':
        data = request.get_json()
        response = supabase.table('review').insert(data).execute()
        return response.data

@app.route('/review/<string:ProductId>', methods=['GET'])
def get_review(ProductId):
    if request.method == 'GET':
        response = supabase.table('review').select("*").eq("product_id", ProductId).execute()
        return (response.data)


if __name__ == '__main__':
    app.run(port=5002, debug=True)