from dotenv import load_dotenv
load_dotenv()
 
from flask import Flask, request, jsonify, Blueprint
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import os
from datetime import datetime, timedelta
from supabase import create_client


url = os.environ.get("ORDER_URL")
key = os.environ.get("ORDER_KEY")
supabase = create_client("https://ecjtnlpxgmzoqfezbork.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjanRubHB4Z216b3FmZXpib3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg3MDI0NjcsImV4cCI6MTk5NDI3ODQ2N30.W2igW2hMKNEjUlWPehmCWeGc-CDWvuGJQ9o8M9SRAoA")


order_bp = Blueprint('order', __name__)   
cors = CORS(order_bp)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/order'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

 
@order_bp.route('/order', methods=['GET', 'POST'])
def getall_order():
    order = supabase.table("order").select("*").execute()
    return order.data

@order_bp.route("/order/<string:ProductId>")
def find_by_productId(ProductId):
    order = supabase.table("order").select("*").eq("ProductId", ProductId).execute()
    
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

@order_bp.route("/order/<string:ProductId>", methods=['POST'])
def create_order(ProductId):
    if (supabase.table("order").query.filter_by(ProductId=ProductId).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "ProductId": ProductId
                },
                "message": "Order already exists."
            }
        ), 400

    data = request.get_json()
    order = supabase.table("order")(ProductId, **data)

    try:
        order.session.add(order)
        order.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "productId": ProductId
                },
                "message": "An error occurred creating the order."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": order.json()
        }
    ), 201



    

 


#data = supabase.table("order").select("*").execute()

#print(data)

DateTime = datetime.utcnow() - timedelta(hours=0)

#data = supabase.table("order").insert({"OrderId":"82626372", "ProductId": "14243454", "ShopId": "72618372", "DateTime": str(DateTime)}).execute()

#data = supabase.table("order").update({"OrderId":"82626372", "ShippingId": "12442324"}).eq("OrderId", "82626372").execute()

#data = supabase.table("order").delete().eq("OrderId", "82626372").execute()

#data = supabase.table("order").select("*").execute()

#print(data)

if __name__ == '__main__':
    order_bp.run(port=5000, debug=True)
