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


export default function Seller() {
  const navigate = useNavigate()
  const [showProduct, setshowProduct] = useState(true)
  const [orderData, setOrderData] = useState(Array)
  const [productData, setproductData] = useState(Array)
  
  const fetchData = () => {
    fetch('http://127.0.0.1:5000/order/getall_order')
      .then(res => res.json())
      .then(data => setOrderData(data));
      fetch (`http://127.0.0.1:5000/product`)
      .then(response => response.json())
      .then(data => setproductData(data))
    }
 
  useEffect(() => {
    fetchData()
    console.log(orderData)
  }, [])

  

  useEffect(() => {
    fetchData()
    console.log(productData)
  }, [])

  const [showSales, setshowSales] = useState(false)
  const [showSettings, setshowSettings] = useState(false)
  

  return (
    <>
    <Navbar/>
      <div className='seller-container'>
      <div className='row' style={{margin:'0'}}>
        <div className='col-3' style={{margin: '20px'}}>
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
          
          
          <p><Button onClick={()=>{setshowProduct(true); setshowSales(false); setshowSettings(false)}} className='seller-page'>Product</Button></p>
          <p><Button onClick={()=>{setshowProduct(false); setshowSales(true); setshowSettings(false)}} className='seller-page'>Sales</Button></p>
          <p><Button onClick={()=>{setshowProduct(false); setshowSales(false); setshowSettings(true)}} className='seller-page'>Settings</Button></p>
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
                      <Button variant='success' onClick={() => navigate('addproduct')}>Add Product</Button>
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
                  <SellerOrder orderData = {orderData}/>
                  </>
              else (showSettings)
                  return <>
                  <div className='seller-menu'>
                  <div className='row' style={{margin:'0'}}>
                    
                    <div className='col-9'>
                    <p className='seller-page-title'>Settings</p>
                    </div>
                    <div className='col-3 add-product-btn'>
                      <Button variant='success' onClick={() => navigate('addproduct')}>Add Admin</Button>
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
                    No Admin Registered
                  </div>
                  </>
          })()
        }
          
        </div>
      </div>
      </div>
      
    </>
    
  )
}