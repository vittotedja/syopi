function show_all(data){
    let text = ''
    for(shipping of data){
        let id = shipping.id
        let from_port = shipping.from_port
        let to_port = shipping.to_port
        text += id + ' ' + from_port + ' ' + to_port + '<br/>'
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
    const id = document.querySelector('#id').value
    const from_port = document.querySelector('#from_port').value
    const to_port = document.querySelector('#to_port').value
    const status = document.querySelector('#status').value
    const courier = document.querySelector('#courier').value
    const order_id = document.querySelector('#order_id').value
    const current_port = document.querySelector('#current_port').value
    const data = {
        id: id,
        from_port: from_port,
        to_port: to_port,
        status: status,
        courier: courier,
        order_id: order_id,
        current_port: current_port
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