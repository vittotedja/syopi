import React from 'react'
import productpics from '../../assets/logofornow.jpg'


function Products(props: any) {
  return (
    <div className='product-card'>
        <img src = {productpics} alt="products pic" width={"80px"}/>
        <p className='product-title'>{props.ProductName}</p>
        <p className='short-desc'>Lorem Ipsum</p>
        <p className='price'>Price</p>
        <p className='rating'>4.5 STAR</p>
        <button>Add To Cart</button>
        
    </div>
  )
}

export default Products