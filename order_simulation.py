from flask import Flask, request, jsonify
from flask_cors import CORS

import os
import sys

import requests

import amqp_setup
import pika
import json

app = Flask(__name__)
CORS(app)

# activity_log_URL = "http://localhost:5003/activity_log"
# error_URL = "http://localhost:5004/error"


@app.route("/place_order", methods=['GET'])
def place_order():
    order = {"order_items":[{"productName":"Jordian", "quantity": 1, "price":99.99},{"productName":"Yoza", "quantity": 2, "price":19.99} ],"orderTotal":149.99, "email":"jordian.renaldi.00@gmail.com", "username":"Jordian Renaldi"}
    order_result = {"code": 200}
    if order_result["code"] not in range(200, 300):
        message = "Order Failed"
        amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="order.error",
            body=message, properties=pika.BasicProperties(delivery_mode=2))
        # make message persistent within the matching queues until it is received by some receiver
        # (the matching queues have to exist and be durable and bound to the exchange)
        return {
            "code": 500,
            "data": {"order_result": order_result},
            "message": "Order creation failure sent for error handling."
        }

    else:
        message = json.dumps({"message":"Order Success", "order": order})
        amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="order.order",
            body=message)
        print("EMAILING SUCCESS TO CLIENT")
        return ("Email is sent")

# Execute this program if it is run as a main script (not by 'import')
if __name__ == "__main__":
    print("This is flask " + os.path.basename(__file__) + " for placing an order...")
    app.run(host="0.0.0.0", port=5100, debug=True)
    # Notes for the parameters: 
    # - debug=True will reload the program automatically if a change is detected;
    #   -- it in fact starts two instances of the same flask program, and uses one of the instances to monitor the program changes;
    # - host="0.0.0.0" allows the flask program to accept requests sent from any IP/host (in addition to localhost),
    #   -- i.e., it gives permissions to hosts with any IP to access the flask program,
    #   -- as long as the hosts can already reach the machine running the flask program along the network;
    #   -- it doesn't mean to use http://0.0.0.0 to access the flask program.
