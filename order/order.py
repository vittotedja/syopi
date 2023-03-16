from dotenv import load_dotenv
load_dotenv()
 
from flask import Flask, request, jsonify, render_template, Blueprint
#from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import os
from datetime import datetime, timedelta
from supabase import create_client


url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client("https://ecjtnlpxgmzoqfezbork.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjanRubHB4Z216b3FmZXpib3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg3MDI0NjcsImV4cCI6MTk5NDI3ODQ2N30.W2igW2hMKNEjUlWPehmCWeGc-CDWvuGJQ9o8M9SRAoA")


order_bp = Blueprint('order', __name__)    
cors = CORS(order_bp)
#app.config['CORS_HEADERS'] = 'Content-Type'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/order'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

 
@order_bp.route('/order', methods=['GET'])
def getall_order():
    order = supabase.table("order").select("*").execute()
    return order.data


@order_bp.route('/', methods=['GET', 'POST'])
def index():
    # GET request
    if request.method == 'GET':
        response = supabase.table('order').select("*").execute()
        return response.data

    # POST request
    if request.method == 'POST':
        data = request.get_json()
        response = supabase.table('order').insert(data).execute()
        return response.data
    

@order_bp.route("/order/<string:OrderId>", methods=['GET'])
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

@order_bp.route("/order/<string:orderid>", methods=['POST'])
def create_order():
    orderid = 12345678
    productid = 21345678
    shopid = 12345678
    userid = 12345678
    price = 12345678
    quantity = 12345678
    dateTime = datetime.utcnow()
    orderstatus = "Unpaid"
    shippingid = 12345678
    order = supabase.table("order").insert({"OrderId":orderid, "ProductId": productid, "ShopId": shopid, "UserId": userid, "Price": price, "Quantity": quantity,"DateTime": dateTime, "OrderStatus": orderstatus, "ShippingId":shippingid}).execute()
    return order.data
"""   if (supabase.table("order").query.filter_by(OrderId=OrderId).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "OrderId": OrderId
                },
                "message": "Order already exists."
            }
        ), 400
"""
    
"""    return jsonify(
        {
            "code": 201,
            "data": order.json()
        }
    ), 201 
"""

    

#    data = request.get_json()
#    order = supabase.table("order")(ProductId, **data)

    

#    try:
#        order.session.add(order)
#        order.session.commit()

 
#    except:
#        return jsonify(
#            {
#                "code": 500,
#                "data": {
#                    "productId": ProductId
#                },
#                "message": "An error occurred creating the order."
#            }
#        ), 500

#    return jsonify(
#        {
#            "code": 201,
#            "data": order.json()
#        }
#    ), 201


"""
@order_bp.route("/order/<string:OrderId>")
def delete_order(OrderId):
    order = data = supabase.table("order").delete().eq("OrderId", "82626372").execute()

    if (supabase.table("order").query.filter_by(OrderId=OrderId).first()):
        return jsonify(
            {
                "code": 201,
                "data": order.json()
            }
        ), 201

"""

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
