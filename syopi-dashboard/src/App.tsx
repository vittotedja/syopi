import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ProductsList from './components/Product/ProductsList'
import Promotions from './components/Promotions'
import ShopList from './components/ShopList'
import 'tailwindcss/tailwind.css'
import ShippingList from './components/Shipping/ShippingList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar/>
      <Promotions/>
      <ProductsList/>
      <ShopList/>
      <ShippingList/>
    </div>
  )
}

export default App
