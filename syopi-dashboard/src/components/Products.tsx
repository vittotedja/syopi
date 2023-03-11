import React from 'react'
import productpics from '../assets/logofornow.jpg'
import './Products.css'

function Products() {
  return (
    <div className='product-card'>
        <img src = {productpics} alt="products pic" width={"80px"}/>
        <p>Product Title</p>
        <p>Price</p>
        <p></p>
        
    </div>
  )
}

export default Products