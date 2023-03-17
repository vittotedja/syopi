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


"""
@order_bp.route("/order/search/<string:search_term>")
def find_by_orderid(search_term, limit=10):
    orders = supabase.table("order").select(
        "*").ilike("OrderId", f"%{search_term}%").execute()
    if not orders:
        return jsonify(
            {
                'message': 'No orders found.'
            }), 404
    for order in orders.data:
        print(order)
    exact_match = [
        order for order in orders.data if order["OrderId"].lower() == search_term.lower()]
    similar_orders = [order for order in orders.data if order not in exact_match]
    similar_orders = sorted(similar_orders, key=lambda p: Levenshtein.distance(
        p["OrderId"].lower(), search_term.lower()))

    sorted_orders = exact_match + similar_orders

    results = [{'id': order["id"], 'name': order["name"], 'address': order["address"],
                'phone_number': order["phone_number"], "active": order["active"]} for order in sorted_orders]

    return jsonify({'results': results})
"""
"""
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
"""
    
"""
    if (supabase.table("order").query.filter_by(OrderId=OrderId).first()):
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

    

@order_bp.route("/order/add_order", methods=["GET", 'POST'])
def add_order():
    if request.method == 'GET':
        return render_template('add_order.html')
    else:
        payload = request.form  # get JSON payload
        form_orderid = payload["OrderId"]
        form_productid = payload["ProductId"]
        form_shopid = payload["ShopId"]
        form_userid = payload["UserId"]
        form_price = payload["Price"]
        form_quantity = payload["Quantity"]
        form_datetime = payload["DateTime"]
        form_orderstatus = payload["OrderStatus"]
        form_shippingid = payload["ShippingId"]
        
        order = supabase.table("order").select(
            "*").eq("OrderId", form_orderid).execute()
        if (order.data):
            return jsonify(
                {
                    "code": 400,
                    "data": {
                        "OrderId": form_orderid
                    },
                    "message": "Store already exists."
                }
            ), 400
        else:
            data = supabase.table("order").insert({
                "OrderId": form_orderid,
                "ProductId": form_productid,
                "ShopId": form_shopid,
                "UserId": form_userid,
                "Price": form_price,
                "Quantity": form_quantity,
                "DateTime": form_datetime,
                "OrderStatus": form_orderstatus,
                "ShippingId": form_shippingid
                
                }).execute()
            print(data)
            if data:
                # return jsonify({
                #     'code': 200,
                data = {
                        "OrderId": form_orderid,
                "ProductId": form_productid,
                "ShopId": form_shopid,
                "UserId": form_userid,
                "Price": form_price,
                "Quantity": form_quantity,
                "DateTime": form_datetime,
                "OrderStatus": form_orderstatus,
                "ShippingId": form_shippingid
                    
                }
                #     'message': 'Insertion succesfull.'
                # }), 200
                return render_template("order.html", data=data)
            else:
                  return jsonify({
                    'code': 500,
                    'data': None,
                    'message': 'Error inserting order into database.'
                }), 500

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

    return order.data

@order_bp.route("/order/indelivery/<string:orderid>")
def update_order_to_in_delivery(orderid):
    newstatus= "In Delivery"
    shippingid= "12345678"
    order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus, "ShippingId":shippingid}).eq("OrderId", orderid).execute()

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

@order_bp.route("/order/cancelled/<string:orderid>")
def update_order_to_cancelled(orderid):
    newstatus= "Cancelled"
    order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatus}).eq("OrderId", orderid).execute()


    return jsonify(
                list(order)
            )

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
