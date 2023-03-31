import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Context.jsx'

const Homepage = () => {
  let navigate = useNavigate()
  const { login, user } = useAuth()

  useEffect(()=>{
    console.log = user
  }, [])
  
  // function handleLogout(){
  //   sessionStorage.removeItem('token')
  //   navigate('/')
  // }

  return (
    <div>
      <h3>Welcome back,</h3>
      <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Homepage