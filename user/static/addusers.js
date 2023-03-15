console.log("COBA COBA")
fetch('http://127.0.0.1:5000/getall')
.then(function (response) {
    return response.json();
}).then(function (data) {
    console.log('GET response');
    console.log(data);
    document.querySelector('#test').innerText = data;
})
function adduser() {
    const Email = document.querySelector('#Email').value
    const Username = document.querySelector('#Username').value
    const ShopId = document.querySelector('#ShopId').value
    const data = {
        "Email": Email,
        "Username": Username,
       " ShopId": ShopId
    }
    console.log(data)
    fetch('http://127.0.0.1:5000/signup', {
        method: "POST",
        origin: "http://127.0.0.1:5000/signup",
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
