import React, { useState, useEffect } from 'react'
import './App.css'
import LandingPage from './components/Browse/LandingPage'
import ShopPage from './components/Shop/ShopPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ProductPage from './components/Product/ProductPage'
import Review from './components/Review/Review'
import User from './components/User'
import Cart from './components/Cart/Cart'
import SignUp from './components/Auth/SignUp'
import Login from './components/Auth/Login'
import Homepage from './components/Auth/Homepage'
import SearchPage from './SearchPage'



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
          <Route path= '/:productId' element={<ProductPage />} />
          <Route path='/review' element={<Review />} />
          <Route path='/search' element={<SearchPage />} />
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
