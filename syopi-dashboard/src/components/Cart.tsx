import { useEffect, useState } from 'react'
import CartItem from './CartItem'

function Cart() {
  const [data, setData] = useState(Array)
  const [product, setProduct] = useState(Array)

  function fetchData() {  
    fetch(`http://127.0.0.1:5000/getcartsproduct/1`)
    .then((response) => response.json())
    .then((data) => setData(data))
  }

  useEffect(() => {
    fetchData()
    console.log(data)
  }, [])

  return (
    <div>
      Your Cart
      {data.map((item:any) => { return (
      <CartItem
        key= {item.ProductId}
        productId = {item.ProductId}
        name = {item.ProductName}
        price = {item.Price}
      />)})}
    </div>
  )
}

export default Cart