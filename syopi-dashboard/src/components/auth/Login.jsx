import React, { useState, useRef } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { supabase } from './client';
import './Login.css'
import logo from '../../assets/logo.png'

import { useAuth } from './Context.jsx'

const Login = ({setToken}) => {
  const emailRef = useRef()
  const passwordRef = useRef()
  let navigate = useNavigate()
  const { login, user } = useAuth()

  const [formData,setFormData] = useState({
        email:'',password:''
  })

  console.log(formData)

  // function handleChange(event){
  //   setFormData((prevFormData)=>{
  //     return{
  //       ...prevFormData,
  //       [event.target.name]:event.target.value
  //     }

  //   })

  // }

  async function handleSubmit(e){
    e.preventDefault()
    //console.log(data)
    await login
    await login(emailRef.current.value, passwordRef.current.value)
    //setUser(user)
    console.log(user)
    navigate("/homepage")

  }




  return (
    <>
    
    
    <div>
      <img src={logo}/>
    <form onSubmit={handleSubmit} className='login-container login-page'>
      <div className='row login-title'>
      <p>Login</p>
      </div>
      <div className='row'>
        <div className='col-4'>
          <p>Email</p>
        </div>
        <div className='col-8'>
        <input
          ref={emailRef} 
          placeholder='Email'
          name='email'
          //onChange={handleChange}
        />
        </div>
      </div>
      <div className='row'>
        <div className='col-4'>
          <p>Password</p>
        </div>
        <div className='col-8'>
        <input 
          placeholder='Password'
          ref = {passwordRef}
          name='password'
          type="password"
          //onChange={handleChange}
        />
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
        <button type='submit'>
          Submit
        </button>

        </div>
      </div>
      </form>
    </div>
  
      
        

        

      
      Don't have an account? <Link to='/signup'>Sign Up</Link> 
    
    </>
  )
}

export default Login