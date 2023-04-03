from flask import Flask, render_template, jsonify, request, redirect
from flask_cors import CORS
import json
import os
import stripe
# from stripe import PaymentIntent
import requests

# This is your test secret API key.
stripe.api_key = 'sk_test_51MrgP0BJIMpkY9J2JBqVmLA4gjghReMD7rCJZ1dY3WDmJMqXNAFfLprCBPWammR0omZ1PiQ75tw49W6ZAHAcGLRQ00p6oF0YGw  '

app = Flask(__name__, static_folder='public',
            static_url_path='', template_folder='public')

CORS(app)

product_URL = os.environ.get("product_URL")

def calculate_order_amount(items):
    total = 0
    for productId in items:
        print(productId)
        res = requests.get(f'http://product1:5002/product/{productId}')
        if res.status_code != 200:
            print(f"Error fetching product {productId}: {res.status_code} {res.content}")
            continue
        res = res.json()
        data = res[0]
        print(data)
        total += int(round(data['Price'] * items[productId],2)*100)
    return total
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client


@app.route('/stripe/create-payment-intent', methods=['POST'])
def create_payment():   
    data = json.loads(request.data)
    print((data['items']))
    # Create a PaymentIntent with the order amount and currency
    # return calculate_order_amount(data['items'])
    payment_intent = stripe.PaymentIntent.create(
        amount=calculate_order_amount(data['items']),
        currency='sgd',
        automatic_payment_methods={
            'enabled': True,
        },
        metadata= data['items'],
        # payment_method_types=['card'],
    )
    return jsonify({
        'clientSecret': payment_intent['client_secret']
    })

@app.route('/stripe/retrieve-payment-intent/<string:clientID>', methods=['GET'])
def retrieve_payment(clientID):
    data = stripe.PaymentIntent.retrieve(clientID)
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5011, debug=True)
