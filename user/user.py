from flask import request,jsonify, Flask, Blueprint
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get('NEW_USER_URL')
key = os.environ.get('NEW_USER_KEY')
# get_jwt = os.environ.get('USer_JWT')
supabase = create_client(url, key)

app = Flask(__name__)
cors = CORS(app)

@app.route('/get_owner_and_admin', methods=['GET'])
def get_owner_and_admin():
    res = supabase.table('UserPublic').select('*').execute()
    # Return JSON response
    if res:
        return jsonify({
        "code" : 200,
        "message": "Returning all users",
        "data": res.data
         })
    else:
        return jsonify({
        "code" : 404,
        "message": "No users found",
        "data": None
    }), 404
        
    
@app.route('/get_shop/<string:user_id>', methods=['GET'])
def get_shop(user_id):
    res = supabase.table('UserPublic').select('*').eq('id', user_id).execute()
    # Return JSON response
    if res:
        return jsonify({
        "code" : 200,
        "message": "Returning all users",
        "data": res.data
         })
    else:
        return jsonify({
        "code" : 404,
        "message": "No users found",
        "data": None
    }), 404
    
@app.route('/user/openshop', methods=['PUT'])
def openshop():
    print('Received request for openshop')
    # print(supabase.auth.get_user())
    data = request.get_json()
    print(data)
    get_user = get_user_id()[0][0]
    uid = get_user['id']
    user_email = get_user['email']
    # print(uid)
    shopname = data['shopname']
    res = supabase.table('UserPublic').select('*').eq('id', uid).execute()
    print(res)
    if res.data[0]['shopname'] is None:
        supabase.table('UserPublic').update({
                                                'acc_type': 'seller', 
                                                'shopname': shopname,
                                                'owner': True
                                            }).eq('id', uid).execute()
        supabase.table('Admin').insert({
            'shopname': shopname,
            'admin_email': user_email
        }).execute()
            
        
        return jsonify({
        "code" : 200,
        "message": "Shop succesfully opened",
        "data": res.data
         })
    else:
        return jsonify({
        "code" : 404,
        "message": "User can only have one shop",
        "data": None
    }), 404

    
@app.route('/user/get_user_id', methods=['GET'])
def get_user_id():
    # Fetch all users from Supabase
    res = supabase.table('TempUser').select('*').execute()
        # Return JSON response 
    if res:
        return jsonify({
        "code" : 200,
        "message": "Returning all users",
        "data": res.data
         })
    else:
        return jsonify({
        "code" : 404,
        "message": "No users found",
        "data": None
    }), 404
    

@app.route('/user/assignadmin', methods=['PUT', 'POST'])
def assignadmin():
    print('Received request for openshop')
    # print(supabase.auth.get_user())
    admin_email = 'yozafardharold@gmail.com'
    sellerid = get_user_id()[0][0]['id']
    
    check_if_owner = supabase.table('UserPublic').select('owner').eq('id', sellerid).execute()
    print(check_if_owner.data[0]['owner'])

    if check_if_owner.data[0]['owner'] == True:
        check_user = supabase.table('UserPublic').select('*').eq('email', admin_email).execute().data
        print(check_user)
        if check_user:
            check_if_admin_exists = supabase.table('Admin').select('*').eq('admin_email', admin_email).execute().data
            print(check_if_admin_exists)
            if check_if_admin_exists:        
                return jsonify({
                    "code" : 404,
                    "message": "Inputted email is already admin",
                    "data": None
                }), 404
            else:
                shop = supabase.table('UserPublic').select('*').eq('id', sellerid).execute().data[0]
                add_admin = supabase.table('Admin').insert({
                    'shopname': shop['shopname'],
                    'admin_email': admin_email,
                }).execute()

                set_admin = supabase.table('UserPublic').update({
                    'acc_type': 'seller',
                    'shopname': shop['shopname']
                    }).eq('email', admin_email).execute()
                if add_admin and set_admin:
                    return jsonify({
                    "code" : 200,
                    "message": "Admin succesfully added",
                    "data": set_admin.data
                    })
                else:
                    return jsonify({
                    "code" : 404,
                    "message": "Email not found",
                    "data": None
                }), 404
                

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5006, debug=True)