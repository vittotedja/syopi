from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify, render_template, Blueprint
from flask_cors import CORS, cross_origin
import os
from supabase import create_client
import pandas as pd

supabase_url = os.getenv('ORDER_URL')
supabase_key = os.getenv('ORDER_KEY')
supabase = create_client(supabase_url, supabase_key)

app = Flask(__name__)

CORS(app)
 
@app.route('/order/get_all_order', methods=['GET'])
def getall_order():
    order = supabase.table("order").select("*").execute()
    if order:
        return order.data
    return jsonify(
        {
            "code": 404,
            "message": "Order not found."
        }
    ), 404

@app.route('/order/get_shop_order/<string:shopId>', methods=['GET'])
def get_shop_order(shopId):
    response = supabase.table("order").select("*").eq("ShopId", shopId).execute()
    if response.data:
        order = pd.DataFrame(response.data).groupby("OrderId").apply(lambda x: x.to_dict(orient='records')).to_list()
        return jsonify(order)
    return jsonify([])

@app.route("/order/find_by_orderid/<string:OrderId>", methods=['GET'])
def find_by_orderid(OrderId):
    order = supabase.table("order").select("*").eq("OrderId", OrderId).execute()
    if order.data:
        return order.data
    return jsonify(
        {
            "code": 404,
            "message": "Order not found."
        }
    ), 404




@app.route('/order/create_order', methods=['POST'])
def create_order():
    data = request.get_json()
    response = supabase.table('order').insert(data).execute()
    return response.data
    
@app.route('/order/find_by_userid/<string:UserId>', methods=['GET'])
def find_by_user_id(UserId):
    response = supabase.table('order').select("*").eq("UserId", UserId).execute()
    return response.data

# Seller accepts order
@app.route("/order/accept", methods=['POST'])
def update_order_status():
    order_id = request.get_json()['OrderId']
    order_status = request.get_json()['OrderStatus']
    order = supabase.table("order").update({"OrderId":order_id, "OrderStatus": order_status}).eq("OrderId", order_id).execute()
    return order.data

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
    
