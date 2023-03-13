console.log('vitto jelek')
fetch('http://127.0.0.1:5000/')
.then(function (response) {
    return response.json();
}).then(function (data) {
    console.log('GET response:');
    console.log(data); 
    document.querySelector('#test').innerText = data;
});

function addProduct() {
    console.log('addProduct()')
    const productName = document.querySelector('#ProductName').value
    const shopId = document.querySelector('#ShopId').value
    const stock = document.querySelector('#Stock').value
    const data = {
        productName: productName,
        shopId: shopId,
        stock: stock
    }
    console.log(data)
    fetch('http://127.0.0.1:5000/', {
        method:'POST',
        origin: "http://127.0.0.1:5500",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    })
}