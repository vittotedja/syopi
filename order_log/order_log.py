#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import json
import os
import amqp_setup


from mailjet_rest import Client

api_key = "34dc5381012fe0a5e17ba3780453a039"
api_secret = "8f396177cb9d24de3e8befe3dfd93e37"
mailjet = Client(auth=(api_key, api_secret), version='v3')

monitorBindingKey = '*.order'


def receiveOrderLog():
    amqp_setup.check_setup()
    queue_name = 'Order_Log'

    # set up a consumer and start to wait for coming messages
    amqp_setup.channel.basic_consume(
        queue=queue_name, on_message_callback=callback, auto_ack=True)
    # an implicit loop waiting to receive messages;
    amqp_setup.channel.start_consuming()
    # it doesn't exit by default. Use Ctrl+C in the command window to terminate it.


# required signature for the callback; no return
def callback(channel, method, properties, body):
    print("\nReceived an order log by " + __file__)
    print("Recording an order log:")
    print(json.loads(body))
    data = json.loads(body)
    print()  # print a new line feed:
    css = """ <style type="text/css">
		body {
			font-family: Arial, sans-serif;
			font-size: 14px;
			line-height: 1.5;
			color: #333;
			margin: 0;
			padding: 0;
		}

		.container {
			max-width: 600px;
			margin: 0 auto;
			padding: 20px;
			background-color: #fff;
			box-shadow: 0 0 10px rgba(0,0,0,0.1);
			border-radius: 5px;
		}

		h1 {
			font-size: 24px;
			font-weight: bold;
			margin-top: 0;
			margin-bottom: 20px;
		}

		p {
			margin-top: 0;
			margin-bottom: 10px;
		}

		table {
			width: 100%;
			border-collapse: collapse;
		}

		table th,
		table td {
			padding: 10px;
			text-align: left;
			border-bottom: 1px solid #ccc;
		}

		table th {
			font-weight: bold;
		}
	</style>"""
    table_content = ""
    for item in data["order"]["order"]:
        print(item)
        table_content += f"""<tr>
                            <td>{ item["ProductName"] }</td>
                            <td>{ item["Quantity"] }</td>
                            <td>${ item["Price"] }</td>
                            </tr>"""

    message = {
        'FromEmail': 'jrenaldi.2021@scis.smu.edu.sg',
        'FromName': 'Syopi Support Team',
        'Subject': 'Order Confirmation',
        'Html-part': f""" <head>
        {css}
	    <title>Order Confirmation</title>
        </head>
        <body>
            <div class="container">
                <h1>Order Confirmation</h1>
                <p>Dear {data["order"]["email"]},</p>
                <p>Thank you for your recent order with us. We have received your order and it is being processed. Below are the details of your order:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table_content}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2">Total:{data["order"]["orderTotal"]}</td>
                        </tr>
                    </tfoot>
                </table>
                <p>Thank you for choosing us. If you have any questions or concerns about your order, please feel free to contact us.</p>
                <p>Sincerely,</p>
                <p>The Syopi Team</p>
            </div>
        </body>""",
        'Recipients': [{'Email': data["order"]["email"]}],
    }
    result = mailjet.send.create(message)
    print(result.status_code)
    print(result.json())


# execute this program only if it is run as a script (not by 'import')
if __name__ == "__main__":
    print("\nThis is " + os.path.basename(__file__), end='')
    print(": monitoring routing key '{}' in exchange '{}' ...".format(
        monitorBindingKey, amqp_setup.exchangename))
    receiveOrderLog()
