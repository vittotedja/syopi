import React, {useState, useEffect} from 'react'
import OrderCard from './OrderCard'

export default function SellerOrder(props:any) {
  const data = props.orderData
  // console.log(data)
  return (
    <>
      <div className="order-list" style={{border:'1px solid black'}}>
      {data.map((order:any) => {
        return <OrderCard
          key={`${order.OrderId}${order.ProductId}`}
          OrderId = {order.OrderId}
          ProductId={order.ProductId}
          Quantity={order.Quantity}
          Price={order.Price}
          UserId={order.UserId}
          ShopId={order.ShopId}
          OrderStatus={order.OrderStatus}
        />
      })}
      </div>
    </>
  )
}
