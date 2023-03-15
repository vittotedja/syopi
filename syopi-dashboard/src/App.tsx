import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ProductsList from './components/Product/ProductsList'
import Promotions from './components/Promotions'
import ShopList from './components/Shop/ShopList'
import ShippingList from './components/Shipping/ShippingList'
import LandingPage from './components/LandingPage'
import ShopPage from './components/shop/ShopPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/shop/:shopName' element={<ShopPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
