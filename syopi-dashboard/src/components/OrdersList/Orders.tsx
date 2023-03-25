import React, { useEffect, useState } from 'react'
import productpics from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'



function Orders(props: any) {
  let navigate = useNavigate()
  let id = props.id

  return (
    <div className='order-card' onClick={()=> navigate(`/order/${id}`)} style={{cursor: 'pointer'}}>
        <img src = {productpics} alt="products pic"/>
        <div className='order-desc'>

        </div>
        <button>Add To Cart</button>
        
    </div>
  )
}

export default Orders