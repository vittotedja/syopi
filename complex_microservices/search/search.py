from flask import Flask, jsonify, request, Blueprint
import json
import pandas as pd
from flask_cors import CORS
import requests
import string

app = Flask(__name__)

cors = CORS(app)


# df_search = pd.DataFrame(requests.get('http://127.0.0.1:5000/product/').json())
 
@app.route('/recommender', methods=['GET'])
def get_all():
    if request.method == 'GET':
        res = requests.get('http://product1:5002/product')
        product_list = res.json()
        return jsonify({
        "code" : 200,
        "message": "Recommended products returned succesfully",
        "data": jsonify(sorted(product_list, key=lambda x: x['AvgRating']*x['AmountSold'], reverse=True))
         })
    else:
        return jsonify({
        "code" : 404,
        "message": "Recommended products could not be returned",
        "data": None
    }), 404
        
    

@app.route('/recommender/search', methods=['GET'])
def search():
    if request.method == 'GET':
        keyword = request.args.get('keyword')
        page = request.args.get('page', 1)
        res = requests.get(f'http://localhost:5002/product/search?keyword={keyword}&page={page}')
        if res:
            return jsonify({
            "code" : 200,
            "message": "Search is working",
            "data": res.json()
            })
        else:
            return jsonify({
            "code" : 404,
            "message": "Search is not working",
            "data": None
        }), 404
        
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5010, debug=True)