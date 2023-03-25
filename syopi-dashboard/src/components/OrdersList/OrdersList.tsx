import React, { useEffect, useState } from "react";
import Orders from "./Orders";
import "./Orders.css";

function OrdersList() {
  const [orders, setOrders] = useState(Array())
  const [OrderId, setOrderId] = useState('aaaa')
  const [ShopId, setShopId] = useState(0)
  const [ProductId, setProductId] = useState(0)

  function fetchData() {  
    fetch("http://127.0.0.1:5000/recommender")
    .then((response) => response.json())
    .then((data) => setOrders(data))
  }

  function addOrder() {
    const data = {
        OrderId: OrderId,
        ShopId: ShopId,
        ProductId: ProductId,
        Price: 1.25
    }
    fetch('http://127.0.0.1:5000/order/create_order', {
        method:'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data)
      setOrders((orders) => [...orders, data[0]])
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      Discover Your Recomended Orders!
      <br/>
      <button onClick={() => addOrder()}>add order</button>
      <div className="order-list">
        {orders.map((order) => {return <Orders key={order.OrderId} OrderName={order.OrderName} stock = {order.Stock} AvgRating = {order.AvgRating} Price = {order.Price} id = {order.OrderId}/>})}
      </div>
    </div>
  );
}

export default OrdersList;
