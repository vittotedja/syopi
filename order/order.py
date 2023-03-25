from dotenv import load_dotenv
load_dotenv()
import Levenshtein
from flask import Flask, request, jsonify, render_template, Blueprint
#from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import os
from datetime import datetime, timedelta
from supabase import create_client

app = Flask(__name__, template_folder='order')

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client("https://ecjtnlpxgmzoqfezbork.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjanRubHB4Z216b3FmZXpib3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg3MDI0NjcsImV4cCI6MTk5NDI3ODQ2N30.W2igW2hMKNEjUlWPehmCWeGc-CDWvuGJQ9o8M9SRAoA")


order_bp = Blueprint('order', __name__)    
cors = CORS(order_bp)
#app.config['CORS_HEADERS'] = 'Content-Type'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/order'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

 
@order_bp.route('/order/getall_order', methods=['GET'])
def getall_order():
    order = supabase.table("order").select("*").execute()
    return order.data


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



@order_bp.route('/order/create_order', methods=['GET', 'POST'])
def create_order():
    data = {"OrderId": "Testing", "ShopId": "bbbbbbb", "ProductId": "ccccccc"}
    response = supabase.table('order').insert(data).execute()
    return response.data




@order_bp.route("/order/delete/<string:OrderId>")
def delete_order(OrderId):
    order = data = supabase.table("order").delete().eq("OrderId", OrderId).execute()

    return jsonify(
            {
                "code": 201,
                "data": order.json()
            }
        ), 201


"""

@order_bp.route("/order/<string:OrderId>", methods=['PUT'])
def update_order(orderid, productid, shopid, userid, price, quantity, datetime, orderstatus, shippingid):
    order = supabase.table("order").update({"OrderId":orderid, "ProductId": productid, "ShopId": shopid, "UserId": userid, "Price": price, "Quantity": quantity,"DateTime": datetime, "OrderStatus": orderstatus, "ShippingId":shippingid}).eq("OrderId", orderid).execute()
#    if (supabase.table("order").query.filter_by(OrderId=orderid).first()):
#            if (supabase.table("order").query.filter_by(ProductId=productid).first()):

    return jsonify(
                {
                    "code": 201,
                    "data": order.json()
                }
            ), 201 
"""



@order_bp.route("/order/paid/<string:orderid>")
def update_order_to_paid(orderid):
    newstatus= "Paid"
    order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus}).eq("OrderId", orderid).execute()

    return jsonify(
        list(order)
    )

@order_bp.route("/order/indelivery/<string:orderid>")
def update_order_to_in_delivery(orderid):
    newstatus= "In Delivery"
    shippingid= "12345678"
    order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus, "ShippingId":shippingid}).eq("OrderId", orderid).execute()

    return jsonify(
                list(order)
            )

@order_bp.route("/order/delivered/<string:orderid>")
def update_order_to_delivered(orderid):
    newstatus= "Delivered"
    order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus}).eq("OrderId", orderid).execute()

    return jsonify(
                list(order)
            )


@order_bp.route("/order/successful/<string:orderid>")
def update_order_to_successful(orderid):
    newstatus= "Successful"
    order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus}).eq("OrderId", orderid).execute()

    return jsonify(
                list(order)
            )

"""
def find_by_orderid(OrderId):
    order = supabase.table("order").select("*").eq("OrderId", OrderId).execute()
    
    if order:
        return jsonify(
            {
                "code": 200,
                "data": order.json()
            }
        )
"""


@order_bp.route("/order/returned/<string:orderid>")
def update_order_to_returned(orderid):
    checkstatus = supabase.table("order").select("*").eq("OrderId", orderid).eq("OrderStatus", "Successful").execute()
    newstatus= "Returned"
    if checkstatus:
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

@order_bp.route("/order/cancelled/<string:orderid>")
def update_order_to_cancelled(orderid):
    checkstatus1 = supabase.table("order").select("*").eq("OrderId", orderid).eq("OrderStatus", "Unpaid").execute()
    checkstatus2 = supabase.table("order").select("*").eq("OrderId", orderid).eq("OrderStatus", "Paid").execute()
    newstatus= "Cancelled"
    if checkstatus1:
        order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus}).eq("OrderId", orderid).execute()

        return jsonify(
                list(order)
            )
    if checkstatus2:
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

"""
@order_bp.route("/order/<string:OrderId>", methods=['PUT'])
def update_order_to_paid(orderid):
    newstatus= "Paid"
    order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus}).eq("OrderId", orderid).execute()

    return order.data

def update_order_to_in_delivery(orderid):
    newstatus= "In Delivery"
    shippingid= "12345678"
    order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus, "ShippingId":shippingid}).eq("OrderId", orderid).execute()

    return jsonify(
                list(order)
            )

def update_order_to_successful(orderid):
    newstatus= "Successful"
    order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus}).eq("OrderId", orderid).execute()

    return jsonify(
                list(order)
            )

def update_order_to_cancelled(orderid):
    newstatus= "Cancelled"
    order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus}).eq("OrderId", orderid).execute()


    return jsonify(
                list(order)
            )
"""



#data = supabase.table("order").select("*").execute()

#print(data)

#DateTime = datetime.utcnow() - timedelta(hours=0)

#data = supabase.table("order").insert({"OrderId":"82626372", "ProductId": "14243454", "ShopId": "72618372", "DateTime": str(DateTime)}).execute()

#data = supabase.table("order").update({"OrderId":"82626372", "ShippingId": "12442324"}).eq("OrderId", "82626372").execute()

#data = supabase.table("order").delete().eq("OrderId", "82626372").execute()

#data = supabase.table("order").select("*").execute()

#print(data)

if __name__ == '__main__':
    order_bp.run(port=5000, debug=True)
