import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Context.jsx'
import UserOrder from './UserOrder.js'

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
    //console.log(data)
    await logout
    localStorage.clear()
    console.log('BYE')
    navigate("/login")
    
  }

  return (
    <div>
      <div className='top flex'>
        <h3>Welcome back, {user.user_metadata.full_name}</h3>
        {/* <h3>Welcome back, {user.id}</h3> */}
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className='main'>
        Look at your past transactions
        <UserOrder/>
        <UserOrder/>
        <UserOrder/>
      </div>

    </div>
  )
}

export default Homepage