from flask import Flask, request, jsonify, render_template, redirect, url_for, Blueprint
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# from sqlalchemy import func
import Levenshtein
import os
import json
from supabase import create_client
from dotenv import load_dotenv
load_dotenv()

url = os.environ.get("SUPABASE  _URL")
key = os.environ.get("SUPABASE  _KEY")
supabase = create_client(url, key)


shop_bp = Blueprint('shop', __name__)
# shop_bp.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/shop_db'
# shop_bp.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(shop_bp)

CORS(shop_bp)


# class Shop(db.Model):
# __tablename__ = 'shops'

# id = db.Column(db.Integer, primary_key=True)
# name = db.Column(db.String(255), nullable=False)
# address = db.Column(db.String(255), nullable=False)
# phone_number = db.Column(db.String(20), nullable=False)
# active = db.Column(db.String(20), nullable=False)


def __init__(self, name, address, phone_number, active):
    self.name = name
    self.address = address
    self.phone_number = phone_number
    self.active = active


def json(self):
    return {"id": self.id, "name": self.name, "address": self.address, "phone_number": self.phone_number, "active": self.active}


@shop_bp.route("/shop")
def get_all():
    shoplist = supabase.table("shops").select("*").execute()
    return shoplist.data


@shop_bp.route("/shop/search/<string:search_term>")
def search_by_name(search_term, limit=10):
    shops = supabase.table("shops").select(
        "*").ilike("name", f"%{search_term}%").execute()
    if not shops:
        return jsonify(
            {
                'message': 'No products found.'
            }), 404
    for shop in shops.data:
        print(shop)
    exact_match = [
        shop for shop in shops.data if shop["name"].lower() == search_term.lower()]
    similar_shops = [shop for shop in shops.data if shop not in exact_match]
    similar_shops = sorted(similar_shops, key=lambda p: Levenshtein.distance(
        p["name"].lower(), search_term.lower()))

    sorted_shops = exact_match + similar_shops

    results = [{'id': shop["id"], 'name': shop["name"], 'address': shop["address"],
                'phone_number': shop["phone_number"], "active": shop["active"]} for shop in sorted_shops]

    return jsonify({'results': results})


@shop_bp.route("/shop/<string:name>")
def find_by_name(name):
    shop = supabase.table("shops").select("*").ilike("name", name).execute()

    if shop.data:
        print("STORE FOUND")
        return jsonify(
            {
                "code": 200,
                "data": shop.data
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Book not found."
        }
    ), 404


@shop_bp.route("/shop/add_shop", methods=["GET", 'POST'])
def add_shop():
    if request.method == 'GET':
        return render_template('add_shop.html')
    else:
        payload = request.form  # get JSON payload
        form_name = payload["name"]
        form_address = payload["address"]
        form_phone_number = payload["phone_number"]
        shop = supabase.table("shops").select(
            "*").eq("name", form_name).execute()
        if (shop.data):
            return jsonify(
                {
                    "code": 400,
                    "data": {
                        "name": form_name
                    },
                    "message": "Store already exists."
                }
            ), 400
        else:
            data = supabase.table("shops").insert({
                "name": form_name,
                "address": form_address,
                "phone_number": form_phone_number,
                "active": "Active"
                }).execute()
            print(data)
            if data:
                # return jsonify({
                #     'code': 200,
                data = {
                        "name": form_name,
                    "address": form_address,
                    "phone_number": form_phone_number,
                    "active": "Active"
                }
                #     'message': 'Insertion succesfull.'
                # }), 200
                return render_template("shop.html", data=data)
            else:
                  return jsonify({
                    'code': 500,
                    'data': None,
                    'message': 'Error inserting shop into database.'
                }), 500


@shop_bp.route("/shop/update_shop/<string:name>", methods=["GET", "POST", 'PUT'])
def update_shop(name):
    if request.method == 'GET':
        shop = supabase.table("shops").select("*").ilike("name", name).execute()
        return render_template("update_shop.html", shop=shop.data[0])
    elif request.method == 'POST':
        form_name = request.form["name"]
        form_address = request.form["address"]
        form_phone_number = request.form["phone_number"]
        shop = supabase.table("shops").select("*").eq("name", form_name).execute()
        if request.form['submit_button'] == "Update":
            if shop:
                data = supabase.table("shops").update({"address": form_address, "phone_number": form_phone_number}).eq("name", form_name).execute()
                return redirect(url_for('find_by_name', name=form_name))
            return jsonify(
                {
                    "code": 404,
                    "data": {
                        "name": form_name
                    },
                    "message": "Shop not found."
                }
            ), 404
        else:
            print("Deactivating the store")
            data = supabase.table("shops").update({"active": "Inactive"}).eq("name", form_name).execute()
            return redirect(url_for('find_by_name', name=form_name))