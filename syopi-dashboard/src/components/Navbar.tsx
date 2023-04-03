import React from 'react'
import { useEffect } from 'react';
import logo from '../assets/logo.png'
import { HiSearch, HiBell, HiShoppingCart, HiUser } from "react-icons/hi";
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

function Navbar() {
  let navigate = useNavigate()
  
  return (
    <div className='navbar flex'>
        <img src={logo} alt="Logo" width={"60px"} onClick={() => navigate('/')} style={{cursor: 'pointer'}}/>
          {/* <HiSearch className = "icon"/> */}
          <SearchBar components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}/>
          <HiBell className="icon notif"/>
          <div onClick={() => navigate('/cart')}>
            <HiShoppingCart className="icon cart"/>
          </div>
          <HiUser className="icon user" onClick={() => navigate('/user')}/>
    </div>
  )
}

export default Navbar