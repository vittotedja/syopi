console.log("HELLO")
const form = document.querySelector('form')
form.addEventListener('submit', addShop)
function addShop() {
    const shopName = document.querySelector('#shopName').value
    const shopAddress = document.querySelector('#shopAddress').value
    const shopPhoneNumber = document.querySelector('#shopPhoneNumber').value
    const data = {
        "name": shopName,
        "address": shopAddress,
       " phone_number": shopPhoneNumber
    }
    console.log(data)
    fetch('/shop/add_shop', {
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
