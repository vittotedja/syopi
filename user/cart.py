from flask import request,jsonify, Flask, Blueprint
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get('USERS_URL')
key = os.environ.get('SUPABASE_KEY')
supabase = create_client(url, key)

cart_bp = Blueprint('cart', __name__)
cors = CORS(cart_bp)

@cart_bp.route('/getcart/<string:userid>/<string:productid>', methods=['GET', 'POST'])
def get_cart(userid, productid):
    # Fetch all users from Supabase
    res = supabase.table('Cart').select('*').eq('UserId', userid).eq('ProductId', productid).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404

@cart_bp.route('/addtocart/<string:userid>/<string:productid>/<string:quantity>', methods=['POST', 'GET'])
def signup(userid, productid, quantity):
    res = supabase.table('Cart').insert({
        "UserId": userid,
        "ProductId": productid,
        "Quantity": quantity
        }).execute()
    
    return res.data, 200