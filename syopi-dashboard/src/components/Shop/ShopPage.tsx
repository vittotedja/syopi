import React from 'react'
import shoppics from '../../assets/logofornow.jpg'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import './Shop.css'
import { useParams } from 'react-router-dom';

function ShopPage(props: any) {
  const [shop, setShop] = useState([]);
  const { shopName } = useParams();

  async function fetchShop() {
    console.log(shopName)
    fetch(`http://127.0.0.1:5000/shop/${shopName}`)
      .then((response) => response.json())
      .then((data) => (setShop(data.data[0])))
  }

  useEffect(() => {
    fetchShop()
  }, []);

  return (
    <>
    <Navbar/>
    <div className='container'>
      <div className='directory'>
        <a href=''>Home</a> {'>'} <a href=''>Shop</a> {'>'} <a href=''>{shop.name}</a>
      </div>
      <div className='row shop-banner'>
          <div className='col-5'>
            <div className='row' style={{margin:'0'}}>
              <div className='col-3'>
              <img src={shoppics} className='shopimg'/>
              </div>
              <div className='col-9 shopdesc'>
                <p className='shopname'>{shop.name}</p>
                <p className='shopaddress'>{shop.address} | {shop.phone_number}</p>
              </div>
            </div>
          </div>
          <div className='col-4'></div>
          <div className='col-3 shopdesc' style={{display:'flex'}} >
            
            <Button>+ Follow</Button>
            <Button>Chat</Button>
            
            
          </div>
      </div>
      <div className='row'>
        <p className='shop-product'>Products</p>
      </div>
      <hr/>
      <div className='container'>
        <div className='row'>
          <div className='col-3'>
              <div className='shop-card'>
                <p className='category'>Category</p>
                <p><input type="checkbox" id="vehicle1" name="vehicle1" value="Electronics"/>
                <label htmlFor="vehicle1" className='labels'>Electronics</label></p> 
                <p><input type="checkbox" id="vehicle1" name="vehicle1" value="Electronics"/>
                <label htmlFor="vehicle1" className='labels'>Woman's Apparel</label></p>
                <p><input type="checkbox" id="vehicle1" name="vehicle1" value="Electronics"/>
                <label htmlFor="vehicle1" className='labels'>Green Vegetables</label></p>
              </div>
            </div>
            <div className='col-9 cards'>
            <div className="shopproduct-row">
  <div className="shopproduct-column">
    <div className="shopproduct-card">
      <img src={shoppics}/>
      <p className='shopproduct-desc shopproduct-title'>Laptop sangat berguna hehe</p>
      <p className='shopproduct-desc shopproduct-price'>$19.99</p>
      <p className='shopproduct-desc shopproduct-rating'>rating</p>
    </div>
  </div>

  <div className="shopproduct-column">
    <div className="shopproduct-card">
    <img src={shoppics}/>
      <p className='shopproduct-desc shopproduct-title'>Sendal jepit ternyaman dan higenis</p>
      <p className='shopproduct-desc shopproduct-price'>$20.01</p>
      <p className='shopproduct-desc shopproduct-rating'>rating</p>
    </div>
  </div>
  
  <div className="shopproduct-column">
    <div className="shopproduct-card">
    <img src={shoppics}/>
      <p className='shopproduct-desc shopproduct-title'>Jepit badai halilintar</p>
      <p className='shopproduct-desc shopproduct-price'>$1.20</p>
      <p className='shopproduct-desc shopproduct-rating'>rating</p>
    </div>
  </div>
  
  <div className="shopproduct-column">
    <div className="shopproduct-card">
    <img src={shoppics}/>
      <p className='shopproduct-desc shopproduct-title'>Handphone bagus dan canggih dan terjangkau loh guys</p>
      <p className='shopproduct-desc shopproduct-price'>$150.34</p>
      <p className='shopproduct-desc shopproduct-rating'>rating</p>
    </div>
  </div>
  <div className="shopproduct-column">
    <div className="shopproduct-card">
    <img src={shoppics}/>
      <p className='shopproduct-desc shopproduct-title'>Handphone bagus dan canggih dan terjangkau loh guys</p>
      <p className='shopproduct-desc shopproduct-price'>$150.34</p>
      <p className='shopproduct-desc shopproduct-rating'>rating</p>
    </div>
  </div>
  <div className="shopproduct-column">
    <div className="shopproduct-card">
    <img src={shoppics}/>
      <p className='shopproduct-desc shopproduct-title'>Handphone bagus dan canggih dan terjangkau loh guys</p>
      <p className='shopproduct-desc shopproduct-price'>$150.34</p>
      <p className='shopproduct-desc shopproduct-rating'>rating</p>
    </div>
  </div>
  <div className="shopproduct-column">
    <div className="shopproduct-card">
    <img src={shoppics}/>
      <p className='shopproduct-desc shopproduct-title'>Handphone bagus dan canggih dan terjangkau loh guys</p>
      <p className='shopproduct-desc shopproduct-price'>$150.34</p>
      <p className='shopproduct-desc shopproduct-rating'>rating</p>
    </div>
  </div>
  <div className="shopproduct-column">
    <div className="shopproduct-card">
    <img src={shoppics}/>
      <p className='shopproduct-desc shopproduct-title'>Handphone bagus dan canggih dan terjangkau loh guys</p>
      <p className='shopproduct-desc shopproduct-price'>$150.34</p>
      <p className='shopproduct-desc shopproduct-rating'>rating</p>
    </div>
  </div>
  <div className="shopproduct-column">
    <div className="shopproduct-card">
    <img src={shoppics}/>
      <p className='shopproduct-desc shopproduct-title'>Handphone bagus dan canggih dan terjangkau loh guys</p>
      <p className='shopproduct-desc shopproduct-price'>$150.34</p>
      <p className='shopproduct-desc shopproduct-rating'>rating</p>
    </div>
  </div>
  <div className="shopproduct-column">
    <div className="shopproduct-card">
    <img src={shoppics}/>
      <p className='shopproduct-desc shopproduct-title'>Handphone bagus dan canggih dan terjangkau loh guys</p>
      <p className='shopproduct-desc shopproduct-price'>$150.34</p>
      <p className='shopproduct-desc shopproduct-rating'>rating</p>
    </div>
  </div>
</div>
            </div>
        </div>
      </div>
    <div>
      <h1>Welcome to {shop.name}</h1>
      <h5>Address: {shop.address}</h5>
      <h5>Phone: {shop.phone_number}</h5>
    </div>
    </div>
    </>
  )
}

export default ShopPage;