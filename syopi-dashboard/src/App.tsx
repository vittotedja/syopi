import React, { useState, useEffect } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import ShopPage from './components/Shop/ShopPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ProductPage from './components/ProductPage'
import Review from './components/Review'
import User from './components/User'
import Cart from './components/Cart'
import SignUp from './components/auth/SignUp.jsx'
import Login from './components/auth/Login.jsx'
import Homepage from './components/auth/Homepage.jsx'



export default function App() {
  const [token, setToken] = useState(false)
  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/shop/:shopName' element={<ShopPage />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/product/:productId' element={<ProductPage />} />
          <Route path='/review' element={<Review />} />
          <Route path='/user' element={<User/>} />
          <Route path='/cart' element={<Cart/>} />

          <Route path={'/signup'} element={ <SignUp />} />
          <Route path={'/login'} element={ <Login setToken={setToken}/>} />
          {token?<Route path={'/homepage'} element={ <Homepage token={token} />} />:""}
        </Routes>
      </BrowserRouter>
    </>
  )
}
