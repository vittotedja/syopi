from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify, render_template, Blueprint
from flask_cors import CORS, cross_origin
import os
from supabase import create_client

supabase_url = os.getenv('ORDER_URL')
supabase_key = os.getenv('ORDER_KEY')
supabase = create_client(supabase_url, supabase_key)

app = Flask(__name__)

CORS(app)
 
@app.route('/order/get_all_order', methods=['GET'])
def getall_order():
    order = supabase.table("order").select("*").execute()
    return order.data


@app.route("/order/find_by_orderid/<string:OrderId>", methods=['GET'])
def find_by_orderid(OrderId):
    order = supabase.table("order").select("*").eq("OrderId", OrderId).execute()
    if order:
        return jsonify(
            {
                "code": 200,
                "data": order.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Order not found."
        }
    ), 404



@app.route('/order/create_order', methods=['GET', 'POST'])
def create_order():
    data = request.get_json()
    response = supabase.table('order').insert(data).execute()
    return response.data




@app.route("/order/delete/<string:OrderId>")
def delete_order(OrderId):
    order = data = supabase.table("order").delete().eq("OrderId", OrderId).execute()

    return jsonify(
            {
                "code": 201,
                "data": order.json()
            }
        ), 201

# Seller accepts order
@app.route("/order/accept", methods=['POST'])
def update_order_status():
    order_id = request.get_json()['OrderId']
    order_status = request.get_json()['OrderStatus']
    order = supabase.table("order").update({"OrderId":order_id, "OrderStatus": order_status}).eq("OrderId", order_id).execute()
    return order.data

# Courier accepts order delivery
@app.route("/order/deliver/<string:OrderId>")
def deliver_order(OrderId):
    order = supabase.table("order").update({"OrderId":OrderId, "OrderStatus": "In Delivery"}).eq("OrderId", OrderId).execute()
    return order.data

# User confirms order delivery
# @order_bp.route("/order/delivered/<string:orderid>")
# def update_order_status(orderid):
#     order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": 'Delivered'}).eq("OrderId", orderid).execute().data
#     return order

@app.route("/order/cancelled/<string:orderid>", methods=['GET', 'POST', 'PUT'])
def cancel_order(orderid):
    checkstatus = supabase.table("order").select("OrderStatus").eq("OrderId", orderid).execute()
    newstatus= "Cancelled"
    print(checkstatus.data[0]["OrderStatus"])
    if checkstatus.data[0]["OrderStatus"]=="Unpaid":
        order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus}).eq("OrderId", orderid).execute()

        return jsonify(
                list(order)
            )
    if checkstatus.data[0]["OrderStatus"]=="Paid":
        order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus}).eq("OrderId", orderid).execute()

        return jsonify(
                list(order)
            )
    return jsonify(
        {
            "code": 404,
            "message": "can't be returned."
        }
    ), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
    
