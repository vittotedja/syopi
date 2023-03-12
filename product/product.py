from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client("https://nltrvnaxmwsbhpvuevfz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdHJ2bmF4bXdzYmhwdnVldmZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0NTU3MDgsImV4cCI6MTk5NDAzMTcwOH0.m6w9E12opNBPFO8wxYxlv0n0M1zo0KJXEWzmlHWfTmk")

app = Flask(__name__)   

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
 
@app.route('/products', methods=['GET'])
def index():
    # GET request
    if request.method == 'GET':
        response = supabase.table('product').select("*").execute()
        return response.data

    # POST request
    if request.method == 'POST':
        data, count = supabase.table('product').insert({"id": 1, "name": "Denmark"}).execute()


if __name__ == '__main__':
    app.run(port=5000, debug=True)