console.log("HELLO")
const form = document.querySelector('form')
form.addEventListener('submit', addOrder)
function addOrder() {
    const OrderId = document.querySelector('#OrderId').value
    const ProductId = document.querySelector('#ProductId').value
    const ShopId = document.querySelector('#ShopId').value
    const UserId = document.querySelector('#UserId').value
    const Price = document.querySelector('#Price').value
    const Quantity = document.querySelector('#Quantity').value
    const DateTime = document.querySelector('#DateTime').value
    const OrderStatus = document.querySelector('#OrderStatus').value
    const ShippingId = document.querySelector('#ShippingId').value
    const data = {
        "OrderId": OrderId,
        "ProductId": ProductId,
        "ShopId": ShopId,
        "UserId": UserId,
        "Price": Price,
        "Quantity": Quantity,
        "DateTime": DateTime,
        "OrderStatus": OrderStatus,
        "ShippingId": ShippingId
    }
    console.log(data)
    fetch('/order/add_order', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        })
}
