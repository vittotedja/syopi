from flask import Flask, request, jsonify, render_template, Blueprint
from flask_cors import CORS, cross_origin
import requests

app = Flask(__name__, template_folder='order')
process_order_bp = Blueprint('process_order', __name__)    
cors = CORS(process_order_bp)

# Seller accepts order
@process_order_bp.route("/process_order/accept", methods=['POST'])
def accept_order():
    # Update order status to 'Accepted'
    response = requests.post("http://localhost:5000/order/accept", json={"OrderId": request.get_json()['OrderId'], "OrderStatus": 'Accepted'})
    return response.json()

@process_order_bp.route("/process_order/request_shipping", methods=['POST'])
def request_shipping():
    # Update order status to 'In Delivery'
    a = requests.post("http://localhost:5000/order/accept", json={
        "OrderId": request.get_json()['OrderId'], 
        "OrderStatus": 'In Delivery'
    })

    # Create shipping
    response = requests.post("http://localhost:5000/shipping/request", json={
        "ShippingId": request.get_json()['ShippingId'],
        "ShopAddress": request.get_json()['ShopAddress'],
        "CustomerAddress": request.get_json()['CustomerAddress'],
        "CourierId": request.get_json()['CourierId'],
    })
    return response.json()