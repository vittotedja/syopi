import React, {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./Courier.css";
import Card from 'react-bootstrap/Card';
import CourierCard from './CourierCard'

export default function Courier(props: any) {
    const [orders, setOrders] = useState(Array)
    const [shippingData, setShippingData] = useState<any>({});
    const [shippingStatus, setShippingStatus] = useState<string>(props.ShippingStatus);
    const [showNewShipping, setshowNewShipping] = useState(true)
    const [showcurrentShipping, setshowcurrentShipping] = useState(false)
    let navigate = useNavigate();

    function fetchData(){
        fetch("http://127.0.0.1:5000/order/")
    }

 
    function getShippingData() {
      fetch(`http://127.0.0.1:5000/find_by_shippingid/${props.ShippingId}`)
        .then((response) => response.json())
        .then((data) => setShippingData(data[0]));
    }

    useEffect(() => {
      getShippingData();
    }, []);
    

    const acceptShipping = (shippingId: string) => {
      const data = { ShippingId: shippingId };
      fetch("http://127.0.0.1:5000/process_shipping/accept",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
      .then((response) => response.json())
      .then(() => setShippingStatus('Accepted'))
    }

    


  return (
    <>
    <div className='seller-container'>
      <div className='row'>
        <div className='col-12'>
          <p className='seller-page-title'>Courier</p>
        </div>
      </div>
    <div className='row' style={{margin:'0'}}>
        <div className='col-3'>
          <div className='seller-menu'>
          
          
          <p><button onClick={()=>{setshowNewShipping(true), setshowcurrentShipping(false)}} className='seller-page'>New Shipping Order</button></p>
          <p><button onClick={()=>{setshowcurrentShipping(true),setshowNewShipping(false)}} className='seller-page'>Current Shipping Order</button></p>
          </div>
        </div>
        
          
          
        <div className='col-9 output'>
        {
          (() => {
              if (showNewShipping)
                  return <>
                  <div className='seller-menu'>
                  <div className='row' style={{margin:'0'}}>
                    
                    <div className='col-12'>
                    <p className='seller-page-title'>New Shipping Order</p>
                    </div>
                  </div>
                  
                  <hr/>
                  </div>
                  <CourierCard shippingData = {shippingData} shippingStatus = {shippingStatus}/>
                </>
              else (showcurrentShipping)
                  return <>
                  <div className='seller-menu'>
                  <div className='row' style={{margin:'0'}}>
                    
                    <div className='col-12'>
                    <p className='seller-page-title'>Current Shipping Order</p>
                    </div>
                  </div>
                  <hr/>
                  </div>
                  <CourierCard shippingData = {shippingData} shippingStatus = {shippingStatus}/>
                  {/* {orderData.map((order:any) => {
                    console.log(order)
                    return <SellerOrder key={order[0].OrderId} orderData={order}/>
                  })} */}
                  </>
              
          })()
        }
        </div></div>
    </div>
    </>

  )
}
 