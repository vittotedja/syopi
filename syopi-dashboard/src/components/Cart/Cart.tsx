import { useEffect, useState } from 'react'
import CartItem from './CartItem'
import Stripe from '../Payment/Stripe'

function Cart() {
  const [data, setData] = useState(Array)
  const [product, setProduct] = useState(Array)
  const [chosenProduct, setChosenProduct] = useState(Array)

  function fetchData() {  
    fetch(`http://127.0.0.1:5000/getcartsproduct/1`)
    .then((response) => response.json())
    .then((data) => setData(data.data))
  }


  useEffect(() => {
    fetchData()
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
        setChosenProduct = {setChosenProduct}
        chosenProduct = {chosenProduct}
      />)})}

      <div>
        <button>Checkout</button>
      </div>
      <Stripe/>
    </div>
  )
}

export default Cart