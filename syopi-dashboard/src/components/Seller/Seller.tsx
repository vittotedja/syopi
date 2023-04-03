import React from 'react'
import Navbar from '../Navbar'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import productpics from '../../assets/logofornow.jpg'
import './Seller.css'
// import AddProduct from './AddProduct'
import { useNavigate } from 'react-router-dom'
import SellerOrder from './SellerOrder'


export default function Seller() {
  const navigate = useNavigate()
  const [showProduct, setshowProduct] = useState(true)
  const [orderData, setOrderData] = useState(Array)
  const shopId = '9413c28a-3b0b-4955-9ac9-5171a3f8631d'
  
  const fetchData = () => {
    fetch('http://127.0.0.1:5000/order/get_all_order/' + shopId)
      .then(res => res.json())
      .then(data => setOrderData(data))
    }
 
  useEffect(() => {
    fetchData()
  }, [])
  
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
      <div className='row seller-info'>
        <div className='col-3'>
          <img src={productpics} className='seller-img' style={{display:'initial'}}/>
        </div>
        <div className='col-5 seller-grid'>
          <p className='seller-name'>Nama Tokomu</p>
        </div>
        <div className='col-4 seller-grid'>
          <p className='seller-desc'>119 Potong Pasir Avenue 1, Singapore, 357119 <br/> +65 123456789</p>
          {/* <p className='seller-desc'>+65 123456789</p> */}
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          <p><Button onClick={()=>setshowProduct(true)} className='seller-page'>Product</Button></p>
          <p><Button onClick={()=>setshowProduct(false)} className='seller-page'>Sales</Button></p>
        </div>
        <div className='col-10 output'>
          {showProduct ?
          <>
            <div className='row' style={{margin:'0'}}>
              <div className='col-8'>
              <p className='seller-page-title'>Product</p>
              </div>
              <div className='col-4 add-product-btn'>
                <Button variant='success' onClick={() => navigate('addproduct')}>Add Product</Button>
              </div>
            </div>
            <div className='row'>
              <div className='col-6 seller-productinfo'>
                <img src={productpics} className='seller-productimg'/>
                <p className='seller-grid seller-productname'>Nama Produk yang sangat berguna dah bermanfaat</p>
              </div>
              <div className='col-6'>
                <button onClick={() => acceptOrder('pi_3MsQHqBJIMpkY9J21DXYT7Bn')}> Accept Order </button>
                <button onClick={() => requestShipping(
                  'pi_3MsQHqBJIMpkY9J21DXYT7Bn', 
                  'ea70ad92-09f5-4e2d-bdde-4f3c658d85f7', 
                  'ShopAdress', 
                  'CustomerAddress',
                  'CourierId'
                )}> 
                  Request Shipping 
                </button>
              </div>
            </div>

          </>
          :
          // {orderData.map((order:any) => {})}
          // <SellerOrder orderData = {orderData}/>
          <>
            <div>
                See All Orders
            </div>
            {orderData.map((order:any) => {
              return <SellerOrder key={order[0].OrderId} orderData={order}/>
            })}
          </>
        }
        </div>
      </div>
      </div>
    </>
    
  )
}