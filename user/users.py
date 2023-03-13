from flask import request,jsonify, Flask
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get('USERS_URL')
key = os.environ.get('SUPABASE_KEY')
supabase = create_client(url, key)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/getbyemail/<string:email>', methods=['GET', 'POST'])
def get_by_email(email):
    # Fetch all users from Supabase
    res = supabase.table('User').select('*').eq('Email', email).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@app.route('/getbyname/<string:username>', methods=['GET', 'POST'])
def get_by_name(username):
    # Fetch all users from Supabase
    res = supabase.table('User').select('*').eq('Username', username).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
@app.route('/getbyshop/<string:shop>', methods=['GET', 'POST'])
def get_by_shop(shop):
    # Fetch all users from Supabase
    res = supabase.table('User').select('*').eq('ShopId', shop).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404
    
    
@app.route('/getall', methods=['GET', 'POST'])
def get_all_users():
    # Fetch all users from Supabase
    res = supabase.table('User').select('*').execute()

    # Return JSON response
    
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404

if __name__ == '__main__':
    app.run(port=5000, debug=True)