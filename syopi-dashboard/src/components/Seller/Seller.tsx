import React from 'react'
import Navbar from '../Navbar'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import productpics from '../../assets/logofornow.jpg'
import './Seller.css'
import AddProduct from './AddProduct'
import { useNavigate } from 'react-router-dom'
import SellerOrder from './SellerOrder'
import SellerProduct from './SellerProduct'
import AddAdmin from './AddAdmin'


export default function Seller() {
  const navigate = useNavigate()
  const [showProduct, setshowProduct] = useState(true)
  const [orderData, setOrderData] = useState(Array)
  const shopId = '9413c28a-3b0b-4955-9ac9-5171a3f8631d'
  const [productData, setproductData] = useState(Array)
  const [showAddProduct, setshowAddProduct] = useState(false)
  const [showAddAdmin, setshowAddAdmin] = useState(false)
  
  const fetchData = () => {
    fetch('http://127.0.0.1:5000/order/get_all_order/' + shopId)
      .then(res => res.json())
      .then(data => setOrderData(data));
      fetch (`http://127.0.0.1:5002/product`)
      .then(response => response.json())
      .then(data => setproductData(data))
    }
 
  useEffect(() => {
    // fetchData()
  }, [])

  

  useEffect(() => {
    fetchData()
    console.log(productData)
  }, [])

  const [showSales, setshowSales] = useState(false)
  const [showSettings, setshowSettings] = useState(false)
  
  function acceptOrder (orderId: string) {
    const data = {OrderId: orderId}
    fetch("http://127.0.0.1:5000/process_order/accept" , {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
  }

  function requestShipping (orderId: string, shippingId: string, shopAddress: string, customerAddress: string, courierId: string) {
    const data = {
      OrderId: orderId,
      ShippingId: shippingId,
      ShopAddress: shopAddress,
      CustomerAddress: customerAddress,
      CourierId: courierId
    }
    fetch("http://127.0.0.1:5000/process_order/request_shipping" , {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
  }
  return (
    <>
    <Navbar/>
      <div className='seller-container'>
      <div className='row' style={{margin:'0'}}>
        <div className='col-3'>
          <div className='seller-menu'>
          <div className='row'>
          <div className='col-3'>
          <img src={productpics} className='seller-img' style={{display:'initial'}}/>
          </div>
          <div className='col-9 seller-info'>
            <p className='seller-name'>Name of your Shop</p>
            <p>address</p>
            <p>no telp</p>
          </div>
          </div>
          
          
          <p><button onClick={()=>{setshowProduct(true); setshowSales(false); setshowSettings(false)}} className='seller-page'>Product</button></p>
          <p><button onClick={()=>{setshowProduct(false); setshowSales(true); setshowSettings(false)}} className='seller-page'>Sales</button></p>
          <p><button onClick={()=>{setshowProduct(false); setshowSales(false); setshowSettings(true)}} className='seller-page'>Settings</button></p>
          </div>
        </div>
        
          
          
        <div className='col-9 output'>
        {
          (() => {
              if (showProduct)
                  return <>
                  <div className='seller-menu'>
                  <div className='row' style={{margin:'0'}}>
                    
                    <div className='col-9'>
                    <p className='seller-page-title'>Product</p>
                    </div>
                    <div className='col-3 add-product-btn'>
                      <button onClick={() => setshowAddProduct(true)}>Add Product</button>
                      <AddProduct show = {showAddProduct} onHide={() => setshowAddProduct(false)}/>
                    </div>
                  </div>
                  <div className='row' style={{marginBottom:'10px'}}>
                    <div className='col-6'>Product</div>
                    <div className='col-2'>Price</div>
                    <div className='col-2'>Stock</div>
                    <div className='col-2'></div>
                  </div>
                  <hr/>
                  </div>
                  <SellerProduct productData = {productData}/>
                </>
              if (showSales)
                  return <>
                  <div className='seller-menu'>
                  <div className='row' style={{margin:'0'}}>
                    
                    <div className='col-12'>
                    <p className='seller-page-title'>Sales</p>
                    </div>
                  </div>
                  <hr/>
                  </div>
                  {orderData.map((order:any) => {
                    return <SellerOrder key={order[0].OrderId} orderData={order}/>
                  })}
                  </>
              else (showSettings)
                  return <>
                  <div className='seller-menu'>
                  <div className='row' style={{margin:'0'}}>
                    
                    <div className='col-9'>
                    <p className='seller-page-title'>Settings</p>
                    </div>
                    <div className='col-3 add-product-btn'>
                      <button onClick={() => setshowAddAdmin(true)}>Add Admin</button>
                      <AddAdmin show = {showAddAdmin} onHide={() => setshowAddAdmin(false)}/>
                    </div>
                  </div>
                  <div className='row' style={{marginBottom:'10px'}}>
                    <div className='col-4'>Name</div>
                    <div className='col-4'>Email</div>
                    <div className='col-2'>Status</div>
                    <div className='col-2'></div>
                  </div>
                  <hr/>
                  </div>
                  <div className='row'>
                    <div className='col-12'>
                    No Admin Registered
                    </div>
                  </div>
                  </>
          })()
        }
        </div></div></div></>)}