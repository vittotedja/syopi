import React from 'react'
import logo from '../assets/logofornow.jpg'

function Navbar() {
    // let logo = require('../assets/logofornow.jpg')
  return (
    <div>
        <img src={logo} alt="Logo" width={"80px"}/>
        Search Bar
        Notifications
        Cart
        Profile
    </div>
  )
}

export default Navbar