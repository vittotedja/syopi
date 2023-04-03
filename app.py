from flask import Flask
from flask_cors import CORS
from product.product import product_bp
from shipping.shipping import shipping_bp
from review.review import review_bp
from shop.shop import shop_bp
from give_rating.give_rating import give_rating_bp
from search.search import search_bp
from order.order import order_bp
from user.cart import cart_bp
from user.user import user_bp
from view_cart.view_cart import view_cart_bp
from payment.stripe import stripe_bp
from process_order.process_order import process_order_bp

app = Flask(__name__)   
cors = CORS(app)

app.register_blueprint(product_bp)
app.register_blueprint(shipping_bp)
app.register_blueprint(review_bp)
app.register_blueprint(shop_bp)
app.register_blueprint(give_rating_bp) 
app.register_blueprint(search_bp)
app.register_blueprint(order_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(user_bp)
app.register_blueprint(view_cart_bp)
app.register_blueprint(stripe_bp)
app.register_blueprint(process_order_bp)

if __name__ == '__main__':
    app.run(port=5000, debug=True)