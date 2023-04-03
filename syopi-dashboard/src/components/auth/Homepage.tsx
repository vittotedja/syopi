import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Context.jsx'
import UserOrder from './UserOrder.js'
import { supabase } from "./Client";

const Homepage = () => {
  let navigate = useNavigate()
  const { login, user, logout } = useAuth()

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
        <p className='user-see-order'>Orders</p>
        <UserOrder/>
        <UserOrder/>
        <UserOrder/>
      </div>

    </div>
    </>
  )
}

export default Homepage