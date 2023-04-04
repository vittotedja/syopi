import React, { useState, useRef } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { supabase } from './client';
import './Login.css'

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
    <form onSubmit={handleSubmit}>
    <div className="login-container">
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
      
    </div>
  
      
        

        <input
          ref={emailRef} 
          placeholder='Email'
          name='email'
          //onChange={handleChange}
        />

        <input 
          placeholder='Password'
          ref = {passwordRef}
          name='password'
          type="password"
          //onChange={handleChange}
        />

        <button type='submit'>
          Submit
        </button>


      </form>
      Don't have an account? <Link to='/signup'>Sign Up</Link> 
    
    </>
  )
}

export default Login