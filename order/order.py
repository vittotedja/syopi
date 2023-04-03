from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify, render_template, Blueprint
from flask_cors import CORS, cross_origin
import os
from supabase import create_client

app = Flask(__name__, template_folder='order')
order_bp = Blueprint('order', __name__)    
cors = CORS(order_bp)

url = os.environ.get("ORDER_URL")
key = os.environ.get("ORDER_KEY")
supabase = create_client(url, key)

# Get all orders 
@order_bp.route('/order/getall_order', methods=['GET'])
def get_all_order():
    order = supabase.table("order").select("*").execute()
    return order.data

# Find order by OrderId
@order_bp.route("/order/find_by_orderid/<string:OrderId>", methods=['GET'])
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

# Create a new order
@order_bp.route('/order/create_order', methods=['POST'])
def create_order():
    data = request.get_json()
    response = supabase.table('order').insert(data).execute()
    return response.data

# Delete an order, but why
@order_bp.route("/order/delete/<string:OrderId>")
def delete_order(OrderId):
    order = data = supabase.table("order").delete().eq("OrderId", OrderId).execute()

    return jsonify(
            {
                "code": 201,
                "data": order.json()
            }
        ), 201

# Seller accepts order
@order_bp.route("/order/accept", methods=['POST'])
def accept_order():
    order_id = request.get_json()['OrderId']
    order = supabase.table("order").update({"OrderId":order_id, "OrderStatus": "Accepted"}).eq("OrderId", order_id).execute()
    return order.data

# Courier accepts order delivery
@order_bp.route("/order/deliver/<string:OrderId>")
def deliver_order(OrderId):
    order = supabase.table("order").update({"OrderId":OrderId, "OrderStatus": "In Delivery"}).eq("OrderId", OrderId).execute()
    return order.data

# User confirms order delivery
@order_bp.route("/order/delivered/<string:orderid>")
def update_order_status(orderid):
    order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": 'Delivered'}).eq("OrderId", orderid).execute().data
    return order

@order_bp.route("/order/cancelled/<string:orderid>", methods=['GET', 'POST', 'PUT'])
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

# Get all orders by status
@order_bp.route("/order/getall_order_by_status/<string:status>", methods=['GET'])
def get_all_order_by_status(status):
    order = supabase.table("order").select("*").eq("OrderStatus", status).execute()
    return order.data
