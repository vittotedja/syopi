from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()

import os

from supabase import create_client

url = os.environ.get("SHIPPING_URL")
key = os.environ.get("SHIPPING_KEY")
supabase = create_client(url, key)

app = Flask(__name__)
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

# @app.route('/', methods=['GET', 'POST'])
# def home_page():
#     if request.methods=='GET':
        
#         example_embed='This string is from python'
#         return render_template('shipping.html', embed=example_embed)
@app.route('/shipping', methods=['GET','POST'])
def index():
    # GET request
    if request.method == 'GET':
        response = supabase.table('shipping').select("*").execute()
        return response.data

    # POST request
    if request.method == 'POST':
        data = request.get_json()
        response = supabase.table('shipping').insert(data).execute()
        return response.data
 
# @app.route('/shipping', methods=['GET', 'POST'])
# def get_all_shipping():
#     #see all the shipping    
#     response = supabase.table('shipping').select("*").execute()
#     return response.data

# @app.route('/shipping/<string:from_port>', methods=['GET', 'POST'])
# def get_shipping_by_from(from_port):
#     #see the shipping from  a particular port
#     response = supabase.table('shipping').select("*").eq('from_port', from_port).execute()
#     return response.data

# @app.route('/shipping/<string:to_port>', methods=['GET', 'POST'])
# def get_shipping_by_to(to_port):
#     #see the shipping to a particular port
#     response = supabase.table('shipping').select("*").eq('to_port', to_port).execute()
#     return response.data

# @app.route('/shipping/<string:status>', methods=['GET', 'POST'])
# def get_shipping_by_status(status):
#     #see the shipping according to the status
#     response = supabase.table('shipping').select("*").eq('status', status).execute()
#     return response.data

# @app.route('/shipping/<string:order_id>', methods=['POST'])
# def create_shipment(order_id):
#     #check if the order_id is inside the shipping database or not and then  if not add the shipping data inside
#     orders = supabase.table('shipping').select("*").eq('order_id', order_id).execute()
#     if len(orders.data) > 0:
#         return jsonify({"message": "Order already exists."})
#     else:
#         #need to add all the information in the column of the shipping table
        
#         response = supabase.table('shipping').insert({"order_id": order_id, "from_port": "Dari", "to_port": "Kepada", "status": "OTW"}).execute()
#         return jsonify(list(response))

# @app.route('/shipping/<string:order_id>', methods=['PUT'])
# def update_shipment_status(order_id):
#     #update the status of the shipment, if successfully delivered then change status to delivered, but if lost at sea then change the status accordingly
#     response = supabase.table('shipping').update({"status": "Delivered"}).eq('order_id', order_id).execute()
#     return jsonify(list(response))

# @app.route('/shipping/<string:order_id>', methods=['PUT'])
# def update_shipment_current_place(order_id):
#     #update the current place of the order
#     response = supabase.table('shipping').update({"from_port": "Dari"}).eq('order_id', order_id).execute()
#     return jsonify(list(response))

#need to update the current place of the order ['PUT']
#need to update who is currently handling the order ['PUT']
#need to add column on who is handling the order ['POST']
#need to find those that are currently at the same port and change the status accordingly eg. PENDING for all orders that  are at the suiz canal ['GET' and 'PUT']
#need to figure out how to get all the info from the place order





if __name__ == '__main__':
    app.run(port=5000, debug=True)

#Selection of Data
# data = supabase.table("shipping").select("id, to_port").execute()

# Insertion of Data
# data = supabase.table("shipping").insert({"from_port":"Hatiku", "to_port":"Hatimu", "status":"OTW"}).execute()

#Update of Data
# data = supabase.table("shipping").update({"from_port": "Dunia", "to_port": "Surga"}).eq("from_port", "Singapore").execute()
# print(data)
