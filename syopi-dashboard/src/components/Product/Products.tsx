import React from 'react'
import productpics from '../../assets/logofornow.jpg'


function Products(props: any) {
  return (
    <div className='product-card'>
        <img src = {productpics} alt="products pic"/>
        <div className='product-desc'>
          <p className='product-title'>{props.ProductName}</p>
          <p className='short-desc'>Stock Left: {props.stock}</p>
          <p className='product-price'>$ 420.69</p>
          <p className='rating'>{Math.round(props.AvgRating *100)/100} STAR</p>
        </div>
        <button>Add To Cart</button>
        
    </div>
  )
}

export default Products