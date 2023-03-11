import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ProductsList from './components/ProductsList'
import Promotions from './components/Promotions'
import ShopList from './components/ShopList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar/>
      <Promotions/>
      <ProductsList/>
      <ShopList/>
    </div>
  )
}

export default App
