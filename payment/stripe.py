from flask import Flask, render_template, jsonify, request, Blueprint
from flask_cors import CORS
import json
import os
import stripe

# This is your test secret API key.
stripe.api_key = 'sk_test_51MrgP0BJIMpkY9J2rI7LfwAepAbvIOjGVEQl13zkAe00qXz8bvj8boOkxo028hU8zZX7gjvFmocElL0Ep0F83E4P00r146emq1'

stripe_bp = Blueprint('stripe', __name__)

cors = CORS(stripe_bp)

# app = Flask(__name__, static_folder='public',
#             static_url_path='', template_folder='public')


def calculate_order_amount(items):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return 1400


@stripe_bp.route('/create-payment-intent', methods=['POST'])
def create_payment():   
    try:
        data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            currency='sgd',
            automatic_payment_methods={
                'enabled': True,
            },
            metadata= data['items'],
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403
    

@stripe_bp.route('/retrieve-payment-intent/<string:clientID>', methods=['GET'])
def retrieve_payment(clientID):
    data = stripe.PaymentIntent.retrieve(clientID)
    return data