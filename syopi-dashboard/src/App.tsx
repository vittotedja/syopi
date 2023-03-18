import { useState, useEffect } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import ShopPage from './components/Shop/ShopPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ProductPage from './components/ProductPage'
import Review from './components/Review'
import User from './components/User'
import Cart from './components/Cart'

export default function App() {
  const [count, setCount] = useState(0)
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
        </Routes>
      </BrowserRouter>
    </>
  )
}
