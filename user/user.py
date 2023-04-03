from flask import request,jsonify, Flask, Blueprint
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get('USER_URL')
key = os.environ.get('USER_KEY')
# get_jwt = os.environ.get('USer_JWT')
supabase = create_client(url, key)

app = Flask(__name__)
cors = CORS(app)

@app.route('/user/getbyemail/<string:email>', methods=['GET', 'POST'])
def get_by_email(email):
    # Fetch all users from Supabase
    res = supabase.table('User').select('*').eq('Email', email).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@app.route('/user/getbyname/<string:username>', methods=['GET', 'POST'])
def get_by_name(username):
    # Fetch all users from Supabase
    res = supabase.table('User').select('*').eq('Username', username).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@app.route('/user/getbyshop/<string:shop>', methods=['GET', 'POST'])
def get_by_shop(shop):
    # Fetch all users from Supabase
    res = supabase.table('User').select('*').eq('ShopId', shop).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    

@app.route('/user/getall', methods=['GET', 'POST'])
def get_all_users():
    # Fetch all users from Supabase
    res = supabase.table('UserPublic').select('*').execute()
    # Return JSON response
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404


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

@app.route('/user/setshop/<string:userid>/<string:shopid>', methods=['POST', 'PUT'])
def setshop(userid, shopid):
    res = supabase.table('User').update({"ShopId": shopid}).eq('UserId', userid).execute()
    return jsonify(list(res))

@app.route('/user/updatecart/<string:userid>/<string:productid>/<int:qty>', methods=['POST', 'PUT'])
def updatecart(userid, productid, qty):
    res = supabase.table('Cart').update({"Quantity": qty}).eq('UserId', userid).eq('ProductId', productid).execute()
    return jsonify(list(res))

@app.route('/user/getcart/<string:userid>/<string:productid>', methods=['GET', 'POST'])
def get_cart(userid, productid):
    # Fetch all users from Supabase
    res = supabase.table('Cart').select('*').eq('UserId', userid).eq('ProductId', productid).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404

@app.route('/user/addtocart/<string:userid>/<string:productid>/<string:quantity>', methods=['POST', 'GET'])
def addtocart(userid, productid, quantity):
    res = supabase.table('Cart').insert({
        "UserId": userid,
        "ProductId": productid,
        "Quantity": quantity
        }).execute()
    
    return res.data, 200


@app.route('/user/tambahcart/<string:productid>/<string:quantity>', methods=['POST', 'GET'])
def tambahcart(productid, quantity):
    res = supabase.table('Cart').insert({
        "ProductId": productid,
        "Quantity": quantity
        }).execute()
    
    return res.data, 200

@app.route('/user/keranjang/<string:userid>', methods=['POST', 'GET'])
def keranjang(userid):
    res = supabase.table('Cart').select('*').eq('UserId', userid).execute()
    return jsonify({
        "code": 200,
        "message": "Cart Returned",
        "data": res.data
    }), 200

@app.route('/user/get_owner_and_admin', methods=['GET'])
def get_owner_and_admin():
    res = supabase.table('UserPublic').select('*').execute()
    # Return JSON response
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@app.route('/get_shop/<string:user_id>', methods=['GET'])
def get_shop(user_id):
    res = supabase.table('UserPublic').select('*').eq('id', user_id).execute()
    # Return JSON response
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@app.route('/user/openshop', methods=['PUT'])
def openshop():
    print('Received request for openshop')
    # print(supabase.auth.get_user())
    uid = '8ac63700-6693-4cba-90ed-dd722a593593'
    # print(id)
    shopid = 3
    shopname = 'coba'
    if request.method == 'PUT':
        res = supabase.table('UserPublic').select('*').eq('id', uid).execute()
        print(res)
        if res.data[0]['shopid'] is None:
            supabase.table('UserPublic').update({
                                                  'shopid': shopid, 
                                                  'shoprole': 'owner', 
                                                  'shopname': shopname
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

@app.route('/user/createshop', methods=['PUT', 'GET'])
def createshop():
    print('semoga jalan ya Tuhan')
    res = supabase.table('UserPublic').select('*').execute()
    session = supabase.auth.get_session()
    print(session)
    return jsonify({
                    "code": 202,
                    "message": session,
                    "data": session
                }), 202

    
@app.route('/user/get_user_id', methods=['GET'])
def get_user_id():
    head = request.headers
    print('head: ', head)
    auth_header = request.headers.get('Authorization')
    print('auth_header: ',auth_header)
    if auth_header is not None:
        auth_token = auth_header.replace('Bearer ', '')
        print(auth_token)
        # auth_token = request.headers.get('Authorization').replace('Bearer ', '')
        # user = supabase.auth.get_user(auth_token)
        return auth_header
    else:
        return jsonify({
                    "code": 404,
                    "message": "WTF",
                    "data": None
                }), 404
    
@app.route('/cobalagi', methods=['GET'])
def get_id():
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5006, debug=True)
