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

@app.route('/getcart/<string:userid>/<string:productid>', methods=['GET', 'POST'])
def get_cart(userid, productid):
    # Fetch all users from Supabase
    res = supabase.table('Cart').select('*').eq('UserId', userid).eq('ProductId', productid).execute()
    # Return JSON response 
    if res:
        return res.data, 200
    else:
        return 'error: No users found.', 404


if __name__ == '__main__':
    app.run(port=5000, debug=True)