from pymongo import MongoClient
import json
from bson import json_util
from pprint import pprint

# setup mongodb
client = MongoClient("mongodb+srv://vincentlewi:ZYjoiyuH1YJcB0kG@syopi.ks3652i.mongodb.net/?retryWrites=true&w=majority")

dbs = client.list_database_names()
# db = client['product']
# product = db['product']
product = client.product
collections = product.list_collection_names()
pprint(client['product']['product'].find_one({'ProductName': 'bebek'}))

