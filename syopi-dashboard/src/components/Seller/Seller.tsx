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
  
  const fetchData = () => {
    fetch('http://127.0.0.1:5000/order/getall_order')
      .then(res => res.json())
      .then(data => setOrderData(data))
    }
 
  useEffect(() => {
    fetchData()
    console.log(orderData)
  }, [])
  
  function acceptOrder(orderId: string) {
    const data = {OrderId: orderId}
    fetch("http://127.0.0.1:5000/process_order/accept" , {
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
                {/* <button
                  onClick={() => acceptOrder('pi_3MsQHqBJIMpkY9J21DXYT7Bn')}
                >
                  Accept Order
                </button> */}
              </div>
            </div>

          </>
          :
          <SellerOrder orderData = {orderData}/>}
        </div>
      </div>
      </div>
    </>
    
  )
}