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
    res = supabase.table('UserPublic').select('*').execute()
    # Return JSON response
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@user_bp.route('/get_shop/<string:user_id>', methods=['GET'])
def get_shop(user_id):
    res = supabase.table('UserPublic').select('*').eq('id', user_id).execute()
    # Return JSON response
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@user_bp.route('/openshop', methods=['PUT'])
def openshop():
    print('Received request for openshop')
    # print(supabase.auth.get_user())
    get_user = get_user_id()[0][0]
    uid = get_user['id']
    user_email = get_user['email']
    print(uid)
    shopid = 3
    shopname = 'coba'
    res = supabase.table('UserPublic').select('*').eq('id', uid).execute()
    print(res)
    if res.data[0]['shopid'] is None:
        supabase.table('UserPublic').update({
                                                'shopid': shopid, 
                                                'acc_type': 'seller', 
                                                'shopname': shopname,
                                                'owner': True
                                            }).eq('id', uid).execute()
        supabase.table('Admin').insert({
            'shopid': shopid,
            'email': user_email
        })
            
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

    
@user_bp.route('/get_user_id', methods=['GET'])
def get_user_id():
    # Fetch all users from Supabase
    res = supabase.table('TempUser').select('*').execute()
        # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    

@user_bp.route('/assignadmin', methods=['PUT', 'POST'])
def assignadmin():
    print('Received request for openshop')
    # print(supabase.auth.get_user())
    admin_email = 'yozafardharold@gmail.com'
    get_admin = get_user_id()
    sellerid = get_admin[0][0]['id']
    
    check_if_owner = supabase.table('UserPublic').select('owner').eq('id', sellerid).execute()
    print(check_if_owner.data[0]['owner'])

    if check_if_owner.data[0]['owner'] == True:
        check_user = supabase.table('UserPublic').select('*').eq('email', admin_email).execute().data
        print(check_user)
        if check_user:
            check_if_admin_exists = supabase.table('Admin').select('*').eq('admin_email', admin_email).execute().data
            print(check_if_admin_exists)
            if check_if_admin_exists:
                return "Inputted email is already admin", 404
            else:
                shop = supabase.table('UserPublic').select('*').eq('id', sellerid).execute().data[0]
                add_admin = supabase.table('Admin').insert({
                    'shopid': shop['shopid'],
                    'admin_email': admin_email,
                }).execute()

                set_admin = supabase.table('UserPublic').update({
                    'acc_type': 'seller',
                    'shopid': shop['shopid'],
                    'shopname': shop['shopname']
                    }).eq('email', admin_email).execute()
                return "Yay", 202
                
        else:
            return "Email not found", 404

    # if check_if_owner:
    #     getshop = supabase.table('UserPublic').select('shopid').eq('id', sellerid).execute()
    #     if getshop:
    #         checkadmin = supabase.table('Admin').select('shopid').eq('id', get_admin[0][0]['id']).execute()
    #     else:
    #         return 'error: Please open a shop first.', 404 
    #     res = supabase.table('UserPublic').select('*').eq('id', uid).execute()
    #     print(res)
    #     if res.data[0]['shopid'] is None:
    #         supabase.table('UserPublic').update({
    #                                               'shopid': shopid, 
    #                                               'acc_type': 'owner', 
    #                                               'shopname': shopname
    #                                               }).eq('id', uid).execute()
    #         return jsonify({
    #             "code": 202,
    #             "message": "yay",
    #             "data": None
    #         }), 202
            
    #     else:
    #         return jsonify({
    #                 "code": 404,
    #                 "message": "User can only open 1 shop",
    #                 "data": None
    #             }), 404
        
