from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()

import os

from supabase import create_client

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# @app.route('/', methods=['GET', 'POST'])
# def home_page():
#     example_embed='This string is from python'
#     return render_template('shipping.html', embed=example_embed)
 
@app.route('/shipping', methods=['GET', 'POST'])
def get_all_shipping():    
    response = supabase.table('shipping').select("*").execute()
    return response.data

@app.route('/shipping/<string:from_port>')
def get_shipping_by_from(from_port):
    response = supabase.table('shipping').select("*").eq('from_port', from_port).execute()
    return response.data

@app.route('/shipping/<string:to_port>')
def get_shipping_by_to(to_port):
    response = supabase.table('shipping').select("*").eq('to_port', to_port).execute()
    return response.data

@app.route('/shipping/<string:status>')
def get_shipping_by_status(status):
    response = supabase.table('shipping').select("*").eq('status', status).execute()
    return response.data

@app.route('/shipping/<string:order_id>', methods=['POST'])
def create_shipment(from_port, to_port):

    response = supabase.table('shipping').insert({"from_port": from_port, "to_port": to_port, "status": "OTW"}).execute()
    return jsonify(list(response))

@app.route('/shipping/<string:order_id>', methods=['PUT'])
def update_shipment(order_id):
    response = supabase.table('shipping').update({"status": "Delivered"}).eq('order_id', order_id).execute()
    return jsonify(list(response))



if __name__ == '__main__':
    app.run(port=5000, debug=True)

#Selection of Data
# data = supabase.table("shipping").select("id, to_port").execute()

# Insertion of Data
# data = supabase.table("shipping").insert({"from_port":"Hatiku", "to_port":"Hatimu", "status":"OTW"}).execute()

#Update of Data
# data = supabase.table("shipping").update({"from_port": "Dunia", "to_port": "Surga"}).eq("from_port", "Singapore").execute()
# print(data)
