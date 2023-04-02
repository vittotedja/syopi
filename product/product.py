from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
import os
import pandas as pd
import string
from supabase import create_client

url = os.environ.get("PRODUCT_URL")
key = os.environ.get("PRODUCT_KEY")
supabase = create_client(url, key)

product_bp = Blueprint('product', __name__)

cors = CORS(product_bp) 
# app.config['CORS_HEADERS'] = 'Content-Type'

df_search = pd.DataFrame(supabase.table('product').select('ProductId, ProductName').execute().data).sort_values(by='ProductName', key=lambda x: x.str.len())
 
@product_bp.route('/product', methods=['GET', 'POST'])
def index():
    # GET request
    if request.method == 'GET':
        response = supabase.table('product').select("*, ImageUrls(ImageUrl)").limit(10).execute()
        return response.data

    # POST request
    if request.method == 'POST':
        data = request.get_json()
        response = supabase.table('product').insert(data).execute()
        return response.data

# search bar
@product_bp.route('/product/search_bar/<string:keyword>', methods=['GET'])
def search_bar(keyword):
    result = df_search[df_search.ProductName.apply(lambda x: keyword.lower().translate(str.maketrans('', '', string.punctuation)) in x.lower().translate(str.maketrans('', '', string.punctuation)))].head(5).rename(columns={'ProductId': 'value', 'ProductName': 'label'})
    return result.to_json(orient='records')

# For search.py to preload items
@product_bp.route('/product/search', methods=['GET'])
def search():
    keyword = request.args.get('keyword')
    page = int(request.args.get('page', 1))
    response = supabase.table('product').select('*, ImageUrls(ImageUrl)', count='exact').neq('Stock', 0).like('ProductName', f'%{keyword}%').order('AvgRating').range((page - 1)*10, page*10).execute()
    return response.json()

@product_bp.route('/product/<string:ProductId>', methods=['GET'])
def product(ProductId):
    response = supabase.table('product').select("*, ImageUrls(ImageUrl)").eq('ProductId', ProductId).execute()
    return response.data

@product_bp.route('/product/<string:ProductId>/<float:avgRating>', methods=['GET'])
def update_rating(ProductId, avgRating):
    response = supabase.table('product').update({"AvgRating": avgRating}).eq("ProductId", ProductId).execute()
    return response.data

@product_bp.route('/product/getmultipleproducts', methods=['POST'])
def get_multiple_products():
    data = request.get_json()
    # print(data["data"])
    response = supabase.table('product').select("*").in_("ProductId", data["data"]).execute()
    return response.data