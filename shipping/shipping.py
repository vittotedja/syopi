import os
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/shipping", methods=['POST'])
def receiveOrder():
    # Check if the order contains valid JSON
    order = None
    if request.is_json:
        order = request.get_json()
        result = processOrder(order)
        return jsonify(result), result["code"]
    else:
        data = request.get_data()
        print("Received an invalid order:")
        print(data)
        return jsonify({"code": 400,
                        # make the data string as we dunno what could be the actual format
                        "data": str(data),
                        "message": "Order should be in JSON."}), 400  # Bad Request input


def processOrder(order):
    print("Processing an order for shipping:")
    print(order)
    # Can do anything here, but aiming to keep it simple (atomic)
    order_id = order['order_id']
    # If customer id contains "ERROR", simulate failure
    if "ERROR" in order['customer_id']:
        code = 400
        message = 'Simulated failure in shipping record creation.'
    else:  # simulate success
        code = 201
        message = 'Simulated success in shipping record creation.'

    print(message)
    print()  # print a new line feed as a separator

    return {
        'code': code,
        'data': {
            'order_id': order_id
        },
        'message': message
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)

