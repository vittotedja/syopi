import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderCard.css";

export default function OrderCard(props: any) {
  const [productData, setProductData] = useState<any>({});
  let navigate = useNavigate();

  function getProductData() {
    fetch(`http://127.0.0.1:5000/product/${props.ProductId}`)
      .then((response) => response.json())
      .then((data) => setProductData(data[0]));
  }

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="order-cart">
      <div className="row header">
        Order Id: <span>{props.OrderId}</span>
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
        <div>{props.OrderStatus}</div>
        <button> Accept Order </button>
      </div>
    </div>
  );
}
