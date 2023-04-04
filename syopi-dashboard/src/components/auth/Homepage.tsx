import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Context.jsx'
import UserOrder from './UserOrder.js'
import { supabase } from "./client";
import Navbar from '../Navbar.js';

export default function Homepage() {
  let navigate = useNavigate()
  const { login, user, logout } = useAuth()
  const [orders, setOrders] = useState(Array)

  useEffect(()=>{
    console.log(user)
  }, [])
  
  // function handleLogout(){
  //   sessionStorage.removeItem('token')
  //   navigate('/')
  // }
  async function handleLogout(e:any){
    e.preventDefault()
    await supabase
        .from("TempUser")
        .delete().eq('id', user.id);
    await logout
    localStorage.clear()
    console.log('BYE')
    navigate("/login")
    
  }

  async function fetchOrders() {
    fetch("http://127.0.0.1:5001/order/find_by_userid/1")
    .then((res) => res.json())
    .then((data) => {
      setOrders(data)
    })}

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <>
    <Navbar/>
    <div className='homepage-container'>
      <div className='row welcome-banner'>
        <div className='col-10 seller-grid welcome'>
        <p>Welcome back, {user.user_metadata.full_name}</p>
        </div>
        <div className='col-2 seller-grid logout'>
        <button onClick={handleLogout} className='logout-btn'>Logout</button>
        </div>
      </div>
      
      <div className='main'>
        <div className='user-see-order'>
          Orders
          {orders.map((order:any) => {
          return <UserOrder 
            key={`${order.ProductId}-${order.OrderId}`} 
            ProductId={order.ProductId} 
            OrderId={order.OrderId}
            ShopId={order.ShopId} 
            Price={order.Price} 
            Quantity={order.Quantity} 
            DateTime={order.DateTime}
            ShippingId={order.ShippingId}
            OrderStatus = {order.OrderStatus}
            // imageUrl={order.ImageUrls[0].ImageUrl}
            /> })}
          </div>
      </div>
    </div>
    </>
  )
}
