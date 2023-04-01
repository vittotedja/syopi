function show_all(data){
    let text = ''
    for(shipping of data){
        let ShippingId = shipping.ShippingId
        let ShippingStatus = shipping.ShippingStatus
        let Current = shipping.Current
        text += ShippingId + ' ' + ShippingStatus + ' ' + Current + '<br/>'
    }
    return text
}

fetch('http://127.0.0.1:5000/shipping')
      .then(function (response) {
          return response.json();
      }).then(function (data) {
          console.log('GET response:');
          console.log(data); 
          document.querySelector('#embed').innerHTML = show_all(data);
      }); 

function addShipping() {
    console.log('addProduct()')
    const ShippingId = document.querySelector('#ShippingId').value
    const ShippingStatus = document.querySelector('#ShippingStatus').value
    const ShopAddress = document.querySelector('#ShopAddress').value
    const Current = document.querySelector('#Current').value
    const UserAddress = document.querySelector('#UserAddress').value
    const CourierId = document.querySelector('#CourierId').value
    const DriverId = document.querySelector('#DriverId').value
    const data = {
        ShippingId: ShippingId,
        ShippingStatus: ShippingStatus,
        ShopAddress: ShopAddress,
        Current: Current,
        UserAddress: UserAddress,
        CourierId: CourierId,
        DriverId: DriverId
    }
    console.log(data)
    fetch('http://127.0.0.1:5000/shipping', {
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data)
    //   setProducts((products) => [...products, data[0]])
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}