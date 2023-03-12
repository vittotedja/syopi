from flask import request,jsonify, Flask
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client

url = os.environ.get('SUPABASE_URL')
key = os.environ.get('SUPABASE_KEY')
supabase = create_client(url, key)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/create', methods=['POST', 'GET'])
def create_user():
    email = request.json['email']
    username = request.json['username']

    # Insert new user into Supabase
    user_data = {'email': email, 'username': username, 'shop': ''}
    res, error = supabase.table('users').insert(user_data).execute()

    # Return JSON response
    if error:
        return jsonify({'error': str(error)}), 400
    else:
        return jsonify(res['data'][0]), 201
    
    
@app.route('/getall', methods=['GET', 'POST'])
def get_all_users():
    # Fetch all users from Supabase
    res = supabase.table('users').select('*').execute()

    # Return JSON response
    
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404

if __name__ == '__main__':
    app.run(port=5000, debug=True)