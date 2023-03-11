from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import func
import Levenshtein


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/shop_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)  

class Shop(db.Model):
    __tablename__ = 'shops'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)

    def __init__(self, name, address, phone_number):
        self.name = name
        self.address = address
        self.phone_number = phone_number

    def json(self):
        return {"id": self.id, "name": self.name, "address": self.address, "phone_number": self.phone_number}


@app.route("/shop")
def get_all():
    shoplist = Shop.query.all()
    if len(shoplist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "shops": [shop.json() for shop in shoplist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no shops."
        }
    ), 404

@app.route("/shop/search/<string:search_term>")
def search_by_name(search_term, limit=10):
    shops = Shop.query.filter(Shop.name.like(f'%{search_term}%')).all()
    if not shops:
        return jsonify(
            {
                'message': 'No products found.'
            }), 404
    
    exact_match = [shop for shop in shops if shop.name.lower() == search_term.lower()]
    similar_shops = [shop for shop in shops if shop not in exact_match]
    similar_shops = sorted(similar_shops, key=lambda p: Levenshtein.distance(p.name.lower(), search_term.lower()))

    sorted_shops = exact_match + similar_shops
    
    results = [{'id': shop.id, 'name': shop.name, 'address': shop.address, 'phone_number': shop.phone_number} for shop in sorted_shops]

    return jsonify({'results': results})

@app.route("/shop/<string:name>")
def find_by_name(name):
    shop = Shop.query.filter_by(name=name).first()
    if shop:
        return jsonify(
            {
                "code": 200,
                "data": shop.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Book not found."
        }
    ), 404

@app.route("/shop/add_shop_form/")
def add_shop_form():
    return render_template("add_shop.html")

@app.route("/shop/add_shop", methods=['POST'])
def add_shop():
    # data = request.get_json()
    # name = data["name"]
    # address = data["address"]
    # phone_number = data["phone_number"]
    form_name = request.form["name"]
    form_address = request.form["address"]
    form_phone_number = request.form["phone_number"]
    
    print("REQUEST IS LOGGED")

    if (Shop.query.filter_by(name=form_name).first()):
        return jsonify( 
            {
                "code": 400,
                "data": {
                    "name": form_name
                },
                "message": "Store already exists."
            }
        ), 400

    shop = Shop(name=form_name, address=form_address, phone_number=form_phone_number)

    try:
        db.session.add(shop)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "name": form_name
                },
                "message": "An error occurred creating the book."
            }
        ), 500
    
    return redirect(url_for('find_by_name', name=form_name))

    # return jsonify(
    #     {
    #         "code": 201,
    #         "data": shop.json()
    #     }
    # ), 201

@app.route("/shop/update_shop_form/")
def update_shop_form():
    return render_template("update_shop.html")

@app.route("/shop/update_shop", methods=['PUT'])
def update_shop():
    form_name = request.form["name"]
    form_address = request.form["address"]
    form_phone_number = request.form["phone_number"]
    
    shop = Shop.query.filter_by(name=form_name).first()
    if shop:
        if form_name:
            book.title = data['title']
        if data['price']:
            book.price = data['price']
        if data['availability']:
            book.availability = data['availability'] 
        db.session.commit()
        return jsonify(
            {
                "code": 200,
                "data": book.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "isbn13": isbn13
            },
            "message": "Book not found."
        }
    ), 404


# @app.route("/book/<string:isbn13>", methods=['DELETE'])
# def delete_book(isbn13):
#     book = Book.query.filter_by(isbn13=isbn13).first()
#     if book:
#         db.session.delete(book)
#         db.session.commit()
#         return jsonify(
#             {
#                 "code": 200,
#                 "data": {
#                     "isbn13": isbn13
#                 }
#             }
#         )
#     return jsonify(
#         {
#             "code": 404,
#             "data": {
#                 "isbn13": isbn13
#             },
#             "message": "Book not found."
#         }
#     ), 404


if __name__ == '__main__':
    app.run(port=5000, debug=True)
