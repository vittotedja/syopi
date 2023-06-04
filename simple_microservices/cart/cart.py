from flask import request,jsonify, Flask, Blueprint
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get('CART_URL')
key = os.environ.get('CART_KEY')
supabase = create_client(url, key)

app = Flask( __name__)
cors = CORS(app)

@app.route('/cart/getcart/<string:userid>/<string:productid>', methods=['GET', 'POST'])
def get_cart(userid, productid):
    # Fetch all users from Supabase
    res = supabase.table('Cart').select('*').eq('UserId', userid).eq('ProductId', productid).execute()
    # Return JSON response 
    if res:
       return jsonify({
            'message': 'Cart found',
            "data": res.data,
            "code": 200
        }), 200
    return jsonify(
        {
            "code": 404,
            "data": None,
            "message": "Cart not found."
        }
    ), 404

@app.route('/cart/addtocart/<string:userid>/<string:productid>/<string:quantity>', methods=['POST', 'GET'])
def signup(userid, productid, quantity):
    res = supabase.table('Cart').insert({
        "UserId": userid,
        "ProductId": productid,
        "Quantity": quantity
        }).execute()
    
    if res:
       return jsonify({
            'message': 'Cart found',
            "data": res.data,
            "code": 200
        }), 200
    return jsonify(
        {
            "code": 404,
            "data": None,
            "message": "Cart not found."
        }
    ), 404

@app.route('/cart/keranjang/<string:userid>', methods=['POST', 'GET'])
def keranjang(userid):
    res = supabase.table('Cart').select('*').eq('UserId', userid).execute()
    if res:
       return jsonify({
            'message': 'Cart found',
            "data": res.data,
            "code": 200
        }), 200
    return jsonify(
        {
            "code": 404,
            "data": None,
            "message": "Cart not found."
        }
    ), 404

@app.route('/cart/tambahcart/<string:productid>/<string:quantity>', methods=['POST', 'GET'])
def tambahcart(productid, quantity):
    response = supabase.table('Cart').select('*').eq('ProductId', productid).execute()
    cart = supabase.table('Cart').select('*').eq('UserId', "1").eq('ProductId', productid).execute()
    if len(cart.data) == 0:
        res = supabase.table('Cart').insert({
        "ProductId": productid,
        "Quantity": quantity
        }).execute()
    else:
        res = supabase.table('Cart').update({
        "Quantity": int(response.data[0]['Quantity']) + int(quantity)
        }).eq('UserId', "1").eq('ProductId', productid).execute()
    if res:
       return jsonify({
            'message': 'Cart found',
            "data": res.data,
            "code": 200
        }), 200
    return jsonify(
        {
            "code": 404,
            "data": None,
            "message": "Cart not found."
        }
    ), 404

@app.route('/cart/updatequantity', methods=['POST'])
def updatequantity():
    data = request.get_json()
    res = supabase.table('Cart').update({'Quantity': data["Quantity"]}).eq('UserId', "1").eq('ProductId', data["ProductId"]).execute()
    if res:
       return jsonify({
            'message': 'Cart found',
            "data": res.data,
            "code": 200
        }), 200
    return jsonify(
        {
            "code": 404,
            "data": None,
            "message": "Cart not found."
        }
    ), 404

@app.route('/cart/clear/<string:userid>', methods=['POST'])
def clear_cart(userid):
    data = request.get_json()
    product_ids = data.get('product_ids', [])
    
    if not product_ids:
        return jsonify(
            {
                "code": 404,
                "data": None,
                "message": "No product IDs provided."
            }
        ), 404

    for product_id in product_ids:
        res = supabase.table('Cart').delete().eq('UserId', 1).eq('ProductId', product_id).execute()
        if res:
            return jsonify({
                    'message': 'Cart found',
                    "data": res.data,
                    "code": 200
                }), 200
        else:
            return jsonify(
                {
                    "code": 404,
                    "data": None,
                    "message": "Cart not found."
                }
            ), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5007, debug=True)

