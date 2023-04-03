import subprocess

x = [["python", "product/product.py"], ["python", "order/order.py"]]
for i in x:
    subprocess.run(i)