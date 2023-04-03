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

url = os.environ.get("SHOP_URL")
key = os.environ.get("SHOP_KEY")
supabase = create_client(url, key)


shop_bp = Blueprint('shop', __name__)

CORS(shop_bp)

@shop_bp.route("/shop/")
def get_all():
    shoplist = supabase.table("shops").select("*").execute()
    return jsonify({
        "code" : 200,
        "message": "Returning all shops",
        "data": shoplist.data
    })


@shop_bp.route("/shop/search/<string:search_term>")
def search_by_name(search_term, limit=10):
    #search where its similar to search term and shop is active
    shops = supabase.table("shops").select("*").ilike("name", f"%{search_term}%").eq("active", "Active").execute()
    if not shops:
        return jsonify(
            {
                'message': 'No products found.',
                "data": None,
                "code": 404
            }), 404
    #get exact match
    exact_match = [shop for shop in shops.data if shop["name"].lower() == search_term.lower()]
    #get shops with similar name
    similar_shops = [shop for shop in shops.data if shop not in exact_match]
    #sort the similar shops by Levenshtein distance to search term
    similar_shops = sorted(similar_shops, key=lambda p: Levenshtein.distance(p["name"].lower(), search_term.lower()))
    #sorted_shops is a list of the exact match at the top, then similar shops
    sorted_shops = exact_match + similar_shops
    #results
    results = [{'id': shop["id"], 'name': shop["name"], 'address': shop["address"], 'phone_number': shop["phone_number"], "active": shop["active"]} for shop in sorted_shops]

    return jsonify({
        'data': results,
        "code": 200,
        "message": "Sorted list of shops returned"
        })


@shop_bp.route("/shop/<string:name>")
def find_by_name(name):
    #get shop with name (Case insensitive)
    shop = supabase.table("shops").select("*").ilike("name", name).execute()
    if shop.data:
        return jsonify(
            {
                "code": 200,
                "message": "Store is found",
                "data": shop.data
            }
        )
    else:
        return jsonify(
            {
                "code": 404,
                "message": "Book not found.",
                "data": None
            }
        ), 404


@shop_bp.route("/shop/add_shop", methods=['POST'])
def add_shop(): #form to be rendered in app.jsx
    if request.method == 'POST':
        form_name = request.form["name"]
        form_address = request.form["address"]
        form_phone_number = request.form["phone_number"]
        #get shop with name (Case insensitive)
        shop = supabase.table("shops").select("*").ilike("name", form_name).execute()
        #if found
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
            if data:
                return jsonify({
                    'code': 200,
                    "data": {
                        "name": form_name,
                        "address": form_address,
                        "phone_number": form_phone_number,
                        "active": "Active"
                    },
                    'message': 'Insertion succesfull.'
                }), 200
            else:
                  return jsonify({
                    'code': 500,
                    'data': None,
                    'message': 'Error inserting shop into database.'
                }), 500


@shop_bp.route("/shop/update_shop/<string:name>", methods=["GET", "POST", 'PUT'])
def update_shop(name): #form to be rendered in app.jsx
    if request.method == 'GET':
        #get shop with name (Case insensitive)
        shop = supabase.table("shops").select("*").ilike("name", name).execute()
        if shop.data:
            return jsonify({
                "code": 200,
                "message": "Store found",
                "data": shop.data
            })
        else:
             return jsonify({
                "code": 404,
                "message": "Store not found",
                "data": None
            }), 404
    elif request.method == 'POST':
        form_name = request.form["name"]
        form_address = request.form["address"]
        form_phone_number = request.form["phone_number"]
        shop = supabase.table("shops").select("*").ilike("name", name).execute()
        #if shop exists
        if shop:
            data = supabase.table("shops").update({"address": form_address, "phone_number": form_phone_number}).eq("name", form_name).execute()
            if data:
                #if update success
                return jsonify({
                    "code": 200,
                    "message": "Store succesfully updated",
                    "data": None
                })
            else:
                #if update failed
                return jsonify({
                "code": 500,
                "message": "Store unable to deactivate",
                "data": None
            })
        #if shop doesnt exist
        else:
            return jsonify({
                    "code": 404,
                    "data": None,
                    "message": "Shop not found."
                }), 404
    
@shop_bp.route("/shop/deactivate/<string:name>", methods=["GET"])
def deactivate_shop(name): #form to be rendered in app.jsx
    if request.method == 'GET':
        #get shop with name (Case insensitive)
        shop = supabase.table("shops").select("*").ilike("name", name).execute()
        if shop.data:
            data = supabase.table("shops").update({"active": "Inactive"}).ilike("name", name).execute()
            #if deactivation success
            if data:
                return jsonify({
                    "code": 200,
                    "message": "Store succesfully deactivated",
                    "data": None
                })
            #if deactivation failed
            else:
                return jsonify({
                "code": 500,
                "message": "Store unable to deactivate",
                "data": None
            })
        #if store is not found
        else:
             return jsonify({
                "code": 404,
                "message": "Store not found",
                "data": None
            }), 404
        
@shop_bp.route('/shop/getmultipleshops', methods=['POST'])
def get_multiple_shops():
    data = request.get_json()
    print(data["data"])
    response = supabase.table('shops').select("*").in_("id", data["data"]).execute()
    if response:
        return jsonify({
                "code": 200,
                "message": "Stores found",
                "data": response.data
                })
    else:
        return jsonify({})
    

@shop_bp.route('/shop/getshopbyid/<string:shopId>', methods=['GET'])
def getshopbyid(shopId):
    response = supabase.table('shops').select("*").eq("id", shopId).execute()
    if response:
        return jsonify({
                "code": 200,
                "message": "Store found",
                "data": response.data
                })
    else:
        return jsonify({})