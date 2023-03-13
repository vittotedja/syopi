from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

app = Flask(__name__)   

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
 
@app.route('/', methods=['GET', 'POST'])
def index():
    # GET request
    if request.method == 'GET':
        response = supabase.table('product').select("*").execute()
        return response.data

    # POST request
    if request.method == 'POST':
        data, count = supabase.table('product').insert({"ProductName": "ayam", "Stock": 100, "ShopId": 1}).execute()


if __name__ == '__main__':
    app.run(port=5000, debug=True)