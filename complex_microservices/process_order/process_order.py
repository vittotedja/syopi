from flask import Flask, request, jsonify, render_template, Blueprint
from flask_cors import CORS, cross_origin
import requests
import os

app = Flask(__name__)
cors = CORS(app)

order_URL = os.environ.get("order_URL")
shipping_URL = os.environ.get("shipping_URL")

# Seller accepts order
@app.route("/process_order/accept", methods=['POST'])
def accept_order():
    # Update order status to 'Accepted'
    response = requests.post(order_URL+"/accept", json={"OrderId": request.get_json()['OrderId'], "OrderStatus": 'Accepted'})
    if response:
        return jsonify({
        "code" : 200,
        "message": "Shipping is accepted",
        "data": response.json()
         })
    else:
        return jsonify({
        "code" : 404,
        "message": "Shipping is not accepted",
        "data": None
    }), 404

@app.route("/process_order/request_shipping", methods=['POST'])
def request_shipping():
    # Update order status to 'In Delivery'
    a = requests.post(order_URL+"/accept", json={
        "OrderId": request.get_json()['OrderId'], 
        "OrderStatus": 'In Delivery'
    })

    # Create shipping
    response = requests.post("/request", json={
        "ShippingId": request.get_json()['ShippingId'],
        "ShopAddress": request.get_json()['ShopAddress'],
        "CustomerAddress": request.get_json()['CustomerAddress'],
        "CourierId": request.get_json()['CourierId'],
    })
    if response:
        return jsonify({
        "code" : 200,
        "message": "Shipping is requested",
        "data": response.json()
         })
    else:
        return jsonify({
        "code" : 404,
        "message": "Shipping is not requested",
        "data": None
    }), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5012, debug=True)
