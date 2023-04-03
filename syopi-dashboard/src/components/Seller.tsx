import React from 'react'

function Seller() {
  let orderId = 'pi_3MsOekBJIMpkY9J21bazpUrQ'
  function updateProduct(orderId: string) {  
    fetch("http://127.0.0.1:5000/order/update/" + orderId)
    .then((response) => response.json())
    .then((data) => console.log(data))
  }

  return (
    <div>
      <div>Seller</div>
      <button
        onClick={() => {updateProduct(orderId)}}
      >
        Update Product
      </button>
    </div>
  )
}

export default Seller