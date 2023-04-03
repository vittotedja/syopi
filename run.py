import os
import subprocess
import sys

scripts = [
    'product/product.py',
    'order/order.py',
    'shipping/shipping.py',
    'review/review.py',
    'search/search.py',
    'view_cart/view_cart.py',
    'stripe/stripe.py',
    'process_order/process_order.py',
    'shop/shop.py',
    'user/user.py',
    'cart/cart.py',
    'give_rating/give_rating.py'
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
