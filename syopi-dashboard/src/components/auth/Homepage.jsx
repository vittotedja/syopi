import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Context.jsx'

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
  async function handleLogout(e){
    e.preventDefault()
    //console.log(data)
    await logout
    localStorage.clear()
    console.log('BYE')
    navigate("/login")
    
  }

  return (
    <div>
      <h3>Welcome back, {user.user_metadata.full_name}</h3>
      <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Homepage