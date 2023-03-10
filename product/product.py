from flask import Flask
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client, Client

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

app = Flask(__name__)
 
@app.route('/')

def index():    
    response = supabase.table('product').select("*").execute()
    return response.data

if __name__ == '__main__':
    app.run(port=5000, debug=True)