from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
 
@app.route('/', methods=['GET', 'POST'])
def index():    
    response = supabase.table('product').select("*").execute()
    return 'asuu'

if __name__ == '__main__':
    app.run(port=5000, debug=True)