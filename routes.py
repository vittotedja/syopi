from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient

app = Flask(__name__)
app.config['SECRET_KEY'] = 'aad91c65aee579cd33ffb46e37c5b27d8a25a580'
app.config['MONGO_URI'] = "mongodb+srv://vincentlewi:ZYjoiyuH1YJcB0kG@syopi.ks3652i.mongodb.net/?retryWrites=true&w=majority"

# setup mongodb
client = MongoClient("mongodb+srv://vincentlewi:ZYjoiyuH1YJcB0kG@syopi.ks3652i.mongodb.net/?retryWrites=true&w=majority")

@app.route('/')

def index():
    dbs = client.list_database_names()
    product = client.product
    collections = product.list_collection_names()
    return collections

if __name__ == '__main__':
    app.run(port=5000, debug=True)