import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderCard.css";

export default function OrderCard(props: any) {
  const [productData, setProductData] = useState<any>({});
  const [orderStatus, setOrderStatus] = useState<string>(props.OrderStatus);
  let navigate = useNavigate();

  function getProductData() {
    fetch(`http://127.0.0.1:5000/product/${props.ProductId}`)
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
    <div className="order-cart">
      <div className="row header" style={{margin:'0px'}}>
        <p className='ordercard-orderid'>Order Id:</p>
        <p>{props.OrderId}</p>
      </div>
      <div className="row content">
        <div>
          <div
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate(`/product/${props.ProductId}`)}
          >
            {productData.ProductName}
          </div>
          <div>Quantity: {props.Quantity}</div>
          <div>Total : S$ {props.Price}</div>
        </div>
        <div>
          {props.UserId}
          <br />
          User Address
          <br />
          Shipping Id?
        </div>
      </div>
      <div className="row footer">
        <div>{orderStatus}</div>
        {orderStatus == 'Paid' ? <button onClick={() => acceptOrder(props.OrderId)}> Accept Order </button>:
        <button> Request Delivery </button>}
      </div>
    </div>
    </>
  );
}
