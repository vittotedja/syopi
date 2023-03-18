import React, { useEffect, useState } from 'react'
import productpics from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'



function Products(props: any) {
  let navigate = useNavigate()
  let id = props.id

  return (
    <div className='product-card' onClick={()=> navigate(`/product/${id}`)} style={{cursor: 'pointer'}}>
        <img src = {productpics} alt="products pic"/>
        <div className='product-desc'>
          <p className='product-title'>{props.ProductName.substring(0,20)}...</p>
          <p className='short-desc'>Stock Left: {props.stock}</p>
          <p className='product-price'>$ {props.Price}</p>
          <p className='rating'>{Math.round(props.AvgRating *100)/100} STAR</p>
        </div>
        <button>Add To Cart</button>
        
    </div>
  )
}

export default Products