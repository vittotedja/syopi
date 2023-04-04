import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderCard.css";
import Card from 'react-bootstrap/Card';

export default function OrderCard(props: any) {
  const [productData, setProductData] = useState<any>({});
  const [orderStatus, setOrderStatus] = useState<string>(props.OrderStatus);
  let navigate = useNavigate();

  function getProductData() {
    fetch(`http://127.0.0.1:5002/product/${props.ProductId}`)
      .then((response) => response.json())
      .then((data) => setProductData(data[0]));
  }

  const acceptOrder = (orderId: string) => {
    const data = { OrderId: orderId };
    fetch("http://127.0.0.1:5000/process_order/accept",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
    .then((response) => response.json())
    .then(() => setOrderStatus('Accepted'))
  }

  const requestDelivery = (orderId: string) => {
    const data = { OrderId: orderId };
    fetch("http://127.0.0.1:5000/order/accept",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
    .then((response) => response.json())
    .then(() => setOrderStatus('Accepted'))
  }

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
    <Card className='order-card-user'>
      <Card.Header className='order-card-user-header'>
        <div className='row' style={{margin:'0'}}>
          <div className='col-6'>
          {props.OrderId} / Date / {props.UserId} 
          </div>
          <div className='col-6' style={{textAlign:'right'}}>
          {orderStatus}
          </div>
        </div>
        
      </Card.Header>

      <Card.Body>
        <div className='row' style={{margin:'0'}}>
          <div className='col-3'>
            {/* <img src={props.ImageUrl}></img> */}
          </div>
          <div className='col-6' style={{textAlign:'left'}}>
            <p style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate(`/product/${props.ProductId}`)}>{productData.ProductName}</p>
            <p className='text-muted'>Product variant</p>
            <p>Quantity: {props.Quantity}</p>
            <p>Price: S${props.Price}</p>
            <p>Total: S${props.Price*props.Quantity}</p>
          </div>
          <div className='col-3 seller-grid'>
            <p>User Address</p>
            <p>Shipping ID</p>
            <p>Shipping Status</p>
          </div>
        </div>
        <br/>
        <hr/>
      </Card.Body>
      
      <Card.Footer>
        <div className='row' style={{margin:'0'}}>
          <div className='col-12 seller-grid' style={{padding:'0'}}>
            {orderStatus == 'Paid' ? <button onClick={() => acceptOrder(props.OrderId)}> Accept Order </button>:
        <button onClick={() => requestDelivery(props.OrderId)}> Request Delivery </button>}
          </div>
        </div>
      </Card.Footer>
    </Card>
    
    </>
  );
}
