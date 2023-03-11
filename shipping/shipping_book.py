from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/shipping'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)


class Shipping(db.Model):
    __tablename__ = 'shipping'


    shipment_id = db.Column(db.String(13), primary_key=True)
    from_port = db.Column(db.String(13), nullable=False)
    to_port = db.Column(db.String(13), nullable=False)
    status = db.Column(db.String(13))


    def __init__(self, shipment_id, from_port, to_port, status):
        self.shipment_id = shipment_id
        self.from_port = from_port
        self.to_port = to_port
        self.status = status


    def json(self):
        return {"shipment_id": self.shipment_id, "from_port": self.from_port, "to_port": self.to_port, "status": self.status}


@app.route("/shipping")
def get_all():
    shippinglist = Shipping.query.all()
    if len(shippinglist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "shipping": [shipment.json() for shipment in shippinglist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no shippings."
        }
    ), 404

@app.route("/shipping/<string:shipment_id>")
def find_by_shipment_id(shipment_id):
    shipment = Shipping.query.filter_by(shipment_id=shipment_id).first()
    if shipment:
        return jsonify(
            {
                "code": 200,
                "data": shipment.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Shipment not found."
        }
    ), 404

@app.route("/shipping/<string:shipment_id>", methods=['POST'])
def create_shipment(shipment_id):
    if (Shipping.query.filter_by(shipment_id=shipment_id).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "shipment_id": shipment_id
                },
                "message": "Shipment already exists."
            }
        ), 400


    data = request.get_json()
    shipment = Shipping(shipment_id, **data)

    try:
        print(type(shipment.shipment_id))
        db.session.add(shipment)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "shipment_id": shipment_id
                },
                "message": "An error occurred creating the shipment."
            }
        ), 500


    return jsonify(
        {
            "code": 201,
            "data": shipment.json()
        }
    ), 201

if __name__ == '__main__':
    app.run(port=5000, debug=True)


