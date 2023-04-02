from dotenv import load_dotenv
load_dotenv()
import Levenshtein
from flask import Flask, request, jsonify, render_template, Blueprint
#from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import os
from datetime import datetime, timedelta
from supabase import create_client

supabase_url = os.getenv('ORDER_URL')
supabase_key = os.getenv('ORDER_KEY')
supabase = create_client(supabase_url, supabase_key)

app = Flask(__name__)

CORS(app)

app = Flask(__name__, template_folder='order')

url = os.environ.get("ORDER_URL")
key = os.environ.get("ORDER_KEY")
supabase = create_client(url, key)
app = Flask(__name__)

CORS(app)
 
@app.route('/order/getall_order', methods=['GET'])
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
    data = {"OrderId": "Testing", "ShopId": "bbbbbbb", "ProductId": "ccccccc"}
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


"""

@app.route("/order/<string:OrderId>", methods=['PUT'])
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

"""
    if checkstatus=="Unpaid":
        ship = supabase.table("order").update({"OrderId":orderid, "ShippingId": NewShippingId}).eq("OrderId", orderid).execute()
        return jsonify(
                list(ship)
            )
    """

@app.route("/order/update/<string:orderid>", methods=['GET', 'POST', 'PUT'])
def update_order(orderid):
    checkstatus = supabase.table("order").select("OrderStatus").eq("OrderId", orderid).execute()
    
    newstatusPaid= "Paid"
    newstatusInDelivery= "In Delivery"
    newstatusDelivered= "Delivered"
    newstatusSuccessful= "Successful"
    newstatusReturned= "Returned"

    NewShippingId= "Generate New"
    print(checkstatus.data[0]["OrderStatus"])
    if checkstatus.data[0]["OrderStatus"]=="Unpaid":
        order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatusPaid}).eq("OrderId", orderid).execute()
        return jsonify(
                list(order)
            )
    if checkstatus.data[0]["OrderStatus"]=="Unpaid":
        ship = supabase.table("order").update({"OrderId":orderid, "ShippingId": NewShippingId}).eq("OrderId", orderid).execute()
        return jsonify(
                list(ship)
            )
    
    if checkstatus.data[0]["OrderStatus"]=="Paid":
        order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatusInDelivery}).eq("OrderId", orderid).execute()
       
        return jsonify(
                list(order)
            )
    
    if checkstatus.data[0]["OrderStatus"]=="In Delivery":
        order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatusDelivered}).eq("OrderId", orderid).execute()

        return jsonify(
                list(order)
            )
    if checkstatus.data[0]["OrderStatus"]=="Delivered":
        order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatusSuccessful}).eq("OrderId", orderid).execute()

        return jsonify(
                list(order)
            )
    
    
    if checkstatus.data[0]["OrderStatus"]=="Successful":
        order = supabase.table("order").update({"OrderId":orderid, "OrderStatus": newstatusReturned}).eq("OrderId", orderid).execute()

        return jsonify(
                list(order)
            )
    

    return jsonify(
        {
            "code": 404,
            "message": "can't be returned."
        }
    ), 404




@app.route("/order/cancelled/<string:orderid>", methods=['GET', 'POST', 'PUT'])
def update_order_to_cancelled(orderid):
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

"""
@app.route("/order/<string:OrderId>", methods=['PUT'])
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
    app.run(host='0.0.0.0', port=5001, debug=True)
