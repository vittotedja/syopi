from flask import Flask, render_template, jsonify, request, Blueprint
from flask_cors import CORS
import json
import os
import stripe
import requests

# This is your test secret API key.
stripe.api_key = 'sk_test_51MrgP0BJIMpkY9J2rI7LfwAepAbvIOjGVEQl13zkAe00qXz8bvj8boOkxo028hU8zZX7gjvFmocElL0Ep0F83E4P00r146emq1'

app = Flask(__name__)

cors = CORS(app)

product_URL = os.environ.get("product_URL")

def calculate_order_amount(items):
    total = 0
    for productId in items:
        print(productId)
        res = requests.get(f'{product_URL}/{productId}')
        res = res.json()
        data = res[0]
        total += int(round(data['Price'] * items[productId],2)*100)
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return total


@app.route('/create-payment-intent', methods=['POST'])
def create_payment():   
    try:
        data = json.loads(request.data)
        print((data['items']))
        # Create a PaymentIntent with the order amount and currency
        # return data['items']
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            currency='sgd',
            # automatic_payment_methods={
            #     'enabled': True,
            # },
            metadata= data['items'],
            payment_method_types=['card'],
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403
    

@app.route('/retrieve-payment-intent/<string:clientID>', methods=['GET'])
def retrieve_payment(clientID):
    data = stripe.PaymentIntent.retrieve(clientID)
    return data

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5011, debug=True)
