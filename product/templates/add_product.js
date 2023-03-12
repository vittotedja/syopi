console.log('vitto jelek')
fetch('http://127.0.0.1:5000/')
.then(function (response) {
    return response.text();
}).then(function (text) {
    console.log('GET response:');
    console.log(text); 
    document.querySelector('#test').innerText = text;
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
    fetch('http://127.0.0.1:5000/')
    .then(function (response) {
        return response.text()
    }).then(function (text) {
        console.log('GET response:')
        console.log(text);
        document.querySelector('#test').innerText = text
    })
}