import React from 'react'
import productpics from '../../assets/logofornow.jpg'


function Shipping(props: any) {
  return (
    <div className='product-card'>
        <img src = {productpics} alt="products pic"/>
        <div className='product-desc'>
          <p className='product-title'>{props.id}</p>
          <p className='short-desc'>From: {props.from_port}</p>
          <p className='short-desc'>Currently: {props.current_port}</p>
          <p className='short-desc'>To: {props.to_port}</p>
          <p className='product-price'>{props.status}</p>
          <p className='rating'>Courier: {props.courier}</p>
        </div>
        <button>Add To Cart</button>
        
    </div>
  )
}

export default Shipping