from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

app = Flask(__name__)   

cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
 
@app.route('/products', methods=['GET', 'POST'])
def index():
    # GET request
    if request.method == 'GET':
        response = supabase.table('product').select("*").execute()
        return response.data

    # POST request
    if request.method == 'POST':
        data = request.get_json()
        response = supabase.table('product').insert(data).execute()
        return response.data

@app.route('/products/<string:ProductId>', methods=['GET'])
def product(ProductId):
    response = supabase.table('product').select("*").eq('ProductId', ProductId).execute()
    return response.data[0]

if __name__ == '__main__':
    app.run(port=5000, debug=True)