from flask import request,jsonify, Flask, Blueprint
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get('USERS_URL')
key = os.environ.get('SUPABASE_KEY')
supabase = create_client(url, key)

user_bp = Blueprint('user', __name__)
cors = CORS(user_bp)

@user_bp.route('/getbyemail/<string:email>', methods=['GET', 'POST'])
def get_by_email(email):
    # Fetch all users from Supabase
    res = supabase.table('User').select('*').eq('Email', email).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@user_bp.route('/getbyname/<string:username>', methods=['GET', 'POST'])
def get_by_name(username):
    # Fetch all users from Supabase
    res = supabase.table('User').select('*').eq('Username', username).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@user_bp.route('/getbyshop/<string:shop>', methods=['GET', 'POST'])
def get_by_shop(shop):
    # Fetch all users from Supabase
    res = supabase.table('User').select('*').eq('ShopId', shop).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
    
@user_bp.route('/getall', methods=['GET', 'POST'])
def get_all_users():
    # Fetch all users from Supabase
    res = supabase.table('User').select('*').execute()
    # Return JSON response
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404


@user_bp.route('/signup/<string:Email>/<string:Password>/<string:Username>', methods=['POST', 'GET'])
def signup(Email, Password, Username):
    if get_by_email(Email):
        return jsonify(
                {
                    "code": 400,
                    "data": {
                        "Email": Email
                    },
                    "message": "Email already used."
                }
            ), 400
    
    else:   
        res = supabase.table('User').insert({
            "UserId": '4',
            "Email": Email,
            "Password": Password,
            "Username": Username,
        }).execute()

        return res.data, 200

@user_bp.route('/setshop/<string:userid>/<string:shopid>', methods=['POST', 'PUT'])
def setshop(userid, shopid):
    res = supabase.table('User').update({"ShopId": shopid}).eq('UserId', userid).execute()
    return jsonify(list(res))

@user_bp.route('/updatecart/<string:userid>/<string:productid>/<int:qty>', methods=['POST', 'PUT'])
def updatecart(userid, productid, qty):
    res = supabase.table('Cart').update({"Quantity": qty}).eq('UserId', userid).eq('ProductId', productid).execute()
    return jsonify(list(res))