import React, {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./Courier.css";
import Card from 'react-bootstrap/Card';


export default function Courier(props: any){
    let navigate = useNavigate();
return (<Card className='order-card-user'>
      <Card.Header className='order-card-user-header'>
        <div className='row' style={{margin:'0'}}>
          <div className='col-10'>
          {props.OrderId} / Date / Shipping Id: {props.shippingData.ShippingId}
          </div>
          <div className='col-2' style={{textAlign:'right'}}>
          ShippingStatus
          </div>
        </div>
        
      </Card.Header>

      <Card.Body>
        <div className='row' style={{margin:'0'}}>
          <div className='col-3'>
            {/* <img src={props.ImageUrl}></img> */}
          </div>
          <div className='col-6' style={{textAlign:'left'}}>
            <p style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate(`/product/${props.ProductId}`)}>Product Name</p>
            <p>Quantity: {props.Quantity}</p>
            <p>Price: S${props.Price}</p>
            <p>Total: S${props.Price*props.Quantity}</p>
          </div>
          <div className='col-3 seller-grid'>
            <p>To: Cina {props.shippingData.UserAddress}</p>
            <p>From: Indo {props.shippingData.ShopAddress}</p>
            <p>Courier Id: {props.shippingData.CourierId}</p>
            <p>Driver Id: {props.shippingData.DriverId}</p>
          </div>
        </div>
        <br/>
        <hr/>
      </Card.Body>
      
      <Card.Footer>
        <div className='row' style={{margin:'0'}}>
          <div className='col-12 seller-grid' style={{padding:'0'}}>
          {props.shippingStatus == 'NULL' ? <button onClick={() => props.acceptShipping(props.OrderId)}> Accept Delivery </button>:
        <button> Accept Delivery </button>}
          </div>
        </div>
      </Card.Footer>
    </Card>)
}