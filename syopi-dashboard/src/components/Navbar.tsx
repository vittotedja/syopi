import React from 'react'
import { useEffect } from 'react';
import logo from '../assets/logo.png'
import { HiSearch, HiBell, HiShoppingCart, HiUser } from "react-icons/hi";
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  let navigate = useNavigate()

  function search() {
    const data = {
        ProductName: 1,
        ShopId: 1,
        Stock: 1,
        Price: 1
    }
    fetch('http://127.0.0.1:5000/search', {
        method:'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  useEffect(() => {
    search();
  }, []);

  return (
    <div className='navbar flex'>
        <img src={logo} alt="Logo" width={"60px"} onClick={() => navigate('/')} style={{cursor: 'pointer'}}/>
          <HiSearch className = "icon"/>
          <input type="text" placeholder="Search" style = {{backgroundColor: '#FFD3B6'}}/>
          <HiBell className="icon notif"/>
          <div onClick={() => navigate('/cart')}>
            <HiShoppingCart className="icon cart"/>
          </div>
          <HiUser className="icon user" onClick={() => navigate('/user')}/>
    </div>
  )
}

export default Navbar