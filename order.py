from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/order'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Order(db.Model):
    __tablename__ = 'order'

    productId = db.Column(db.String(13), primary_key=True)
    productName = db.Column(db.String(64), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    availability = db.Column(db.Integer)
    paymentStatus = db.Column(db.Boolean)

    def __init__(self, productId, productName, price, availability, paymentStatus):
        self.productId = productId
        self.productName = productName
        self.price = price
        self.availability = availability
        self.paymentStatus = paymentStatus

    def json(self):
        return {"productId": self.productId, "productName": self.productName, "price": self.price, "availability": self.availability, "paymentStatus": self.paymentStatus}


@app.route("/order")
def get_all():
    orderlist = Order.query.all()
    if len(orderlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "orders": [order.json() for order in orderlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no orders."
        }
    ), 404


@app.route("/order/<string:productId>")
def find_by_productId(productId):
    order = order.query.filter_by(productId=productId).first()
    if order:
        return jsonify(
            {
                "code": 200,
                "data": order.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Order not found."
        }
    ), 404


@app.route("/order/<string:productId>", methods=['POST'])
def create_order(productId):
    if (Order.query.filter_by(productId=productId).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "productId": productId
                },
                "message": "Order already exists."
            }
        ), 400

    data = request.get_json()
    order = Order(productId, **data)

    try:
        db.session.add(order)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "productId": productId
                },
                "message": "An error occurred creating the order."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": order.json()
        }
    ), 201


if __name__ == '__main__':
    app.run(port=5000, debug=True)
