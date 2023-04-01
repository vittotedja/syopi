from flask import request,jsonify, Flask, Blueprint
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get('USER_URL')
key = os.environ.get('USER_KEY')
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
    
    
# @user_bp.route('/getall', methods=['GET', 'POST'])
# def get_all_users():
#     # Fetch all users from Supabase
#     res = supabase.table('User').select('*').execute()
#     # Return JSON response
#     if res:
#         return res.data, 200
#     else:
#         return 'error: No users found.', 404


# @user_bp.route('/signup/<string:Email>/<string:Password>/<string:Username>', methods=['POST', 'GET'])
# def signup(Email, Password, Username):
#     if get_by_email(Email):
#         return jsonify(
#                 {
#                     "code": 400,
#                     "data": {
#                         "Email": Email
#                     },
#                     "message": "Email already used."
#                 }
#             ), 400
    
#     else:   
#         res = supabase.table('User').insert({
#             "UserId": '4',
#             "Email": Email,
#             "Password": Password,
#             "Username": Username,
#         }).execute()

#         return res.data, 200

@user_bp.route('/setshop/<string:userid>/<string:shopid>', methods=['POST', 'PUT'])
def setshop(userid, shopid):
    res = supabase.table('User').update({"ShopId": shopid}).eq('UserId', userid).execute()
    return jsonify(list(res))

@user_bp.route('/updatecart/<string:userid>/<string:productid>/<int:qty>', methods=['POST', 'PUT'])
def updatecart(userid, productid, qty):
    res = supabase.table('Cart').update({"Quantity": qty}).eq('UserId', userid).eq('ProductId', productid).execute()
    return jsonify(list(res))

@user_bp.route('/getcart/<string:userid>/<string:productid>', methods=['GET', 'POST'])
def get_cart(userid, productid):
    # Fetch all users from Supabase
    res = supabase.table('Cart').select('*').eq('UserId', userid).eq('ProductId', productid).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404

@user_bp.route('/addtocart/<string:userid>/<string:productid>/<string:quantity>', methods=['POST', 'GET'])
def addtocart(userid, productid, quantity):
    res = supabase.table('Cart').insert({
        "UserId": userid,
        "ProductId": productid,
        "Quantity": quantity
        }).execute()
    
    return res.data, 200


@user_bp.route('/tambahcart/<string:productid>/<string:quantity>', methods=['POST', 'GET'])
def tambahcart(productid, quantity):
    res = supabase.table('Cart').insert({
        "ProductId": productid,
        "Quantity": quantity
        }).execute()
    
    return res.data, 200

@user_bp.route('/keranjang/<string:userid>', methods=['POST', 'GET'])
def keranjang(userid):
    res = supabase.table('Cart').select('*').eq('UserId', userid).execute()
    return jsonify({
        "code": 200,
        "message": "Cart Returned",
        "data": res.data
    }), 200

@user_bp.route('/get_owner_and_admin', methods=['GET'])
def get_owner_and_admin():
    res = supabase.table('ShopManaged').select('*').execute()
    # Return JSON response
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@user_bp.route('/get_shop/<string:user_id>', methods=['GET'])
def get_shop(user_id):
    res = supabase.table('ShopManaged').select('*').eq('id', user_id).execute()
    # Return JSON response
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@user_bp.route('/openshop', methods=['PUT'])
def openshop():
    print('Received request for openshop')
    id = '88ec6a39-9223-4342-ae3c-ce02c462c847'
    shop_id = 3
    shop_name = 'coba'
    if request.method == 'PUT':
        res = supabase.table('ShopManaged').select('*').eq('id', id).execute()
        print(res)
        if res.data[0]['shop_id'] is None:
            supabase.table('ShopManaged').update({
                                                  'shop_id': shop_id, 
                                                  'shop_role': 'owner', 
                                                  'shop_name': shop_name
                                                  }).eq('id', id).execute()
            return jsonify({
                "code": 202,
                "message": "yay",
                "data": None
            }), 202
            
        else:
            return jsonify({
                    "code": 404,
                    "message": "User can only open 1 shop",
                    "data": None
                }), 404


    