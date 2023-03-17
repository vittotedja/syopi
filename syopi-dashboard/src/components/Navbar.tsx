import React from 'react'
import logo from '../assets/logofornow.jpg'
import { HiSearch, HiBell, HiShoppingCart, HiUser } from "react-icons/hi";
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar flex'>
        <img src={logo} alt="Logo" width={"50px"}/>
          <HiSearch className = "icon"/>
          <input type="text" placeholder="Search" style = {{backgroundColor: '#efa551', color: 'white'}}/>
          <HiBell className="icon notif"/>
          <HiShoppingCart className="icon cart"/>
          <HiUser className="icon user"/>
    </div>
  )
}

export default Navbar