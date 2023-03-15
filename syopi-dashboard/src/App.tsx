import { useState, useEffect } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import ShopPage from './components/shop/ShopPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

export default function App() {
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
