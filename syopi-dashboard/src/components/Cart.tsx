import React, { useState } from 'react'
import Cart from './User'
import './User'

function CartList() {
  const [cart, setCart] = useState(Array())

  function fetchData() {
    fetch("http://127.0.0.1:5300s/")
    .then((response) => response.json())
    .then((data) => setCart(data))
  }
  
  return (
    <>
    <div>Cart disini</div>
    <div className='cart'>
        <Cart/>
        <Cart/>
        <Cart/>
    </div>
    </>
  )
}

export default CartList