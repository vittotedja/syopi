from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import ObjectId

app = Flask(__name__)
app.config['SECRET_KEY'] = 'aad91c65aee579cd33ffb46e37c5b27d8a25a580'
app.config['MONGO_URI'] = "mongodb+srv://vincentlewi:ZYjoiyuH1YJcB0kG@syopi.ks3652i.mongodb.net/?retryWrites=true&w=majority"

# setup mongodb
client = MongoClient("mongodb+srv://vincentlewi:ZYjoiyuH1YJcB0kG@syopi.ks3652i.mongodb.net/?retryWrites=true&w=majority")

class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)
app.json_encoder = MyEncoder
 
@app.route('/')

def index():    
    dbs = client.list_database_names()
    # db = client['product']
    # product = db['product']
    product = client.product
    collections = product.list_collection_names()
    return list(client['product']['product'].find({}))

if __name__ == '__main__':
    app.run(port=5000, debug=True)