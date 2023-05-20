import os
import subprocess
import sys

scripts = [
    'simple_microservices/product/product.py',
    'simple_microservices/order/order.py',
    'simple_microservices/shipping/shipping.py',
    'simple_microservices/review/review.py',
    'simple_microservices/search/search.py',
    'complex_microservices/view_cart/view_cart.py',
    'simple_microservices/stripe/stripe.py',
    'complex_microservices/process_order/process_order.py',
    'simple_microservices/shop/shop.py',
    'user/user.py',
    'simple_microservices/cart/cart.py',
    'complex_microservices/give_rating/give_rating.py'
]

def run_script_in_new_console(script):
    if os.name == 'nt':  # Windows
        cmd = ["cmd.exe", "/c", "start", "python", script]
    elif sys.platform == 'darwin':  # macOS
        cmd = ["open", "-a", "Terminal", "-n", "--args", "python", script]
    elif sys.platform == 'linux':  # Linux
        cmd = ["gnome-terminal", "--", "python", script]
    else:
        raise RuntimeError("Unsupported operating system: " + os.name)

    subprocess.Popen(cmd)

for script in scripts:
    run_script_in_new_console(script)
