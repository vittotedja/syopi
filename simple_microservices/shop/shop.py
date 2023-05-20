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

supabase_url = os.getenv('SHOP_URL')
supabase_key = os.getenv('SHOP_KEY')
supabase = create_client(supabase_url, supabase_key)

app = Flask(__name__)

CORS(app)

@app.route("/shop/")
def get_all():
    shoplist = supabase.table("shops").select("*").execute()
    return jsonify({
        "code" : 200,
        "message": "Returning all shops",
        "data": shoplist.data
    })


@app.route("/shop/search/<string:search_term>")
def search_by_name(search_term, limit=10):
    #search where its similar to search term and shop is active
    shops = supabase.table("shops").select("*").ilike("ShopName", f"%{search_term}%").eq("IsActive", "Active").execute()
    if not shops:
        return jsonify(
            {
                'message': 'No products found.',
                "data": None,
                "code": 404
            }), 404
    #get exact match
    exact_match = [shop for shop in shops.data if shop["ShopName"].lower() == search_term.lower()]
    #get shops with similar name
    similar_shops = [shop for shop in shops.data if shop not in exact_match]
    #sort the similar shops by Levenshtein distance to search term
    similar_shops = sorted(similar_shops, key=lambda p: Levenshtein.distance(p["ShopName"].lower(), search_term.lower()))
    #sorted_shops is a list of the exact match at the top, then similar shops
    sorted_shops = exact_match + similar_shops
    #results
    results = [{'ShopId': shop["ShopId"], 'ShopName': shop["ShopName"], 'ShopAddress': shop["ShopAddress"], 'ShopPhoneNumber': shop["ShopPhoneNumber"], "IsActive": shop["IsActive"]} for shop in sorted_shops]

    return jsonify({
        'data': results,
        "code": 200,
        "message": "Sorted list of shops returned"
        })


@app.route("/shop/<string:name>")
def find_by_name(name):
    #get shop with name (Case insensitive)
    shop = supabase.table("shops").select("*").ilike("ShopName", name).execute()
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


@app.route("/shop/add_shop", methods=['POST'])
def add_shop(): #form to be rendered in app.jsx
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        form_name = data['ShopName']
        print(form_name)
        form_address = data['ShopAddress']
        print(form_address)
        form_phone_number = data['ShopPhoneNumber']
        print(form_phone_number)
        #get shop with name (Case insensitive)
        # form_name = 'sanur'
        # form_address = 'mangga dua'
        # form_phone_number = '111-2222'
        shop = supabase.table("shops").select("*").ilike("ShopName", form_name).execute()
        print(shop)
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
                "ShopName": form_name,
                "ShopAddress": form_address,
                "ShopPhoneNumber": form_phone_number,
                "IsActive": "Active"
                }).execute()
            print(data)
            if data:
                return jsonify({
                    'code': 200,
                    "data": {
                        "ShopName": form_name,
                        "ShopAddress": form_address,
                        "ShopPhoneNumber": form_phone_number,
                        "IsActive": "Active"
                    },
                    'message': 'Insertion succesfull.'
                }), 200
            else:
                  return jsonify({
                    'code': 500,
                    'data': None,
                    'message': 'Error inserting shop into database.'
                }), 500


@app.route("/shop/update_shop/<string:name>", methods=["GET", "POST", 'PUT'])
def update_shop(name): #form to be rendered in app.jsx
    if request.method == 'GET':
        #get shop with name (Case insensitive)
        shop = supabase.table("shops").select("*").ilike("ShopName", name).execute()
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
            data = supabase.table("shops").update({"ShopAddress": form_address, "ShopPhoneNumber": form_phone_number}).eq("ShopName", form_name).execute()
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
    
@app.route("/shop/deactivate/<string:name>", methods=["GET"])
def deactivate_shop(name): #form to be rendered in app.jsx
    if request.method == 'GET':
        #get shop with name (Case insensitive)
        shop = supabase.table("shops").select("*").ilike("ShopName", name).execute()
        if shop.data:
            data = supabase.table("shops").update({"IsActive": "Inactive"}).ilike("ShopName", name).execute()
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
        
@app.route('/shop/get_multiple_shops', methods=['POST'])
def get_multiple_shops():
    data = request.get_json()
    # print(data["data"])
    response = supabase.table('shops').select("*").in_("ShopId", data["data"]).execute()
    return response.data
    

@app.route('/shop/getshopbyid/<string:shopId>', methods=['GET'])
def getshopbyid(shopId):
    response = supabase.table('shops').select("*").eq("ShopId", shopId).execute()
    if response:
        return jsonify({
                "code": 200,
                "message": "Store found",
                "data": response.data
                })
    else:
        return jsonify({})
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)