from flask import request,jsonify, Flask, Blueprint
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get('USER_URL')
key = os.environ.get('USER_KEY')
supabase = create_client(url, key)

app = Flask( __name__)
cors = CORS(app)

@app.route('/cart/getcart/<string:userid>/<string:productid>', methods=['GET', 'POST'])
def get_cart(userid, productid):
    # Fetch all users from Supabase
    res = supabase.table('Cart').select('*').eq('UserId', userid).eq('ProductId', productid).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404

@app.route('/cart/addtocart/<string:userid>/<string:productid>/<string:quantity>', methods=['POST', 'GET'])
def signup(userid, productid, quantity):
    res = supabase.table('Cart').insert({
        "UserId": userid,
        "ProductId": productid,
        "Quantity": quantity
        }).execute()
    
    return res.data, 200

@app.route('/cart/keranjang/<string:userid>', methods=['POST', 'GET'])
def keranjang(userid):
    res = supabase.table('Cart').select('*').eq('UserId', userid).execute()
    return res.data, 200

@app.route('/cart/tambahcart/<string:productid>/<string:quantity>', methods=['POST', 'GET'])
def tambahcart(productid, quantity):
    response = supabase.table('Cart').select('*').eq('ProductId', productid).execute()
    cart = supabase.table('Cart').select('*').eq('UserId', "1").eq('ProductId', productid).execute()
    if len(cart.data) == 0:
        supabase.table('Cart').insert({
        "ProductId": productid,
        "Quantity": quantity
        }).execute()
    else:
        supabase.table('Cart').update({
        "Quantity": int(response.data[0]['Quantity']) + int(quantity)
        }).eq('UserId', "1").eq('ProductId', productid).execute()
    return response.data

@app.route('/cart/updatequantity', methods=['POST'])
def updatequantity():
    data = request.get_json()
    res = supabase.table('Cart').update({'Quantity': data["Quantity"]}).eq('UserId', "1").eq('ProductId', data["ProductId"]).execute()
    return res.data, 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5007, debug=True)

