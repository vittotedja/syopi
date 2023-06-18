import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Courier.css";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

interface CourierCardProps {
  OrderId: string;
  DateObj: Date;
  ShippingId: string;
  ProductName: string;
  ProductId: String;
  Quantity: string;
  Price: string;
  Total: string;
  UserAddress: string;
  ShopAddress: string;
  CourierId: string;
  DriverId: string;
  Status: string;
}

export default function CourierCard({
  OrderId,
  DateObj,
  ShippingId,
  ProductName,
  ProductId,
  Quantity,
  Price,
  Total,
  UserAddress,
  ShopAddress,
  CourierId,
  DriverId,
  Status,
}: CourierCardProps) {
  let navigate = useNavigate();
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = DateObj.toLocaleString("en-GB", dateOptions);
  const [shippingStatus, setShippingStatus] = useState(Status);
  const [isHovered, setIsHovered] = useState(false);
  const acceptShipping = (shippingId: string) => {
    const data = { ShippingId: shippingId };
    fetch("http://127.0.0.1:5000/process_shipping/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => setShippingStatus("Accepted"));
  };
  const cancelShipping = (OrderId) => {
    console.log(OrderId, "has been canceled");
  };
  let buttonDisplay;
  if (Status === "NEW") {
    buttonDisplay = (
      <button
        className="w-full h-full "
        onClick={() => acceptShipping(OrderId)}
      >
        Accept Delivery
      </button>
    );
  } else if (Status === "ACCEPTED") {
    buttonDisplay = (
      <button
        className={`w-full h-full ${isHovered ? "cancel-button" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => (isHovered ? cancelShipping(OrderId) : null)}
      >
        {isHovered ? "Cancel" : "Accepted"}
      </button>
    );
  } else if (Status === "COMPLETED"){
    
  }
  return (
    <Card className="order-card-user">
      <Card.Header className="order-card-user-header">
        <div className="row" style={{ margin: "0" }}>
          <div className="col-10">
            {formattedDate}
            <p>Order ID: {OrderId}</p>
            <p>Shipping Id: {ShippingId}</p>
          </div>
          <div className="col-2" style={{ textAlign: "right" }}>
            <h1>{Status}</h1>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        <div className="row" style={{ margin: "0" }}>
          <div className="col-2">{/* <img src={props.ImageUrl}></img> */}</div>
          <div className="col-5" style={{ textAlign: "left" }}>
            <p
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => navigate(`/product/${ProductId}`)}
            >
              {ProductName}
            </p>
            <p>Quantity: {Quantity}</p>
            <p>Price: S${Price}</p>
            <p>Total: S${(Number(Price) * Number(Quantity)).toFixed(2)}</p>
          </div>
          <div className="col-5 seller-grid text-left">
            <p>
              <span className="font-bold mr-1">To: </span> {UserAddress}
            </p>
            <p>
              <span className="font-bold mr-1">From: </span> {ShopAddress}
            </p>
            <p>
              <span className="font-bold mr-1">Courier Id: </span> {CourierId}
            </p>
            <p>
              <span className="font-bold mr-1">Driver Id:</span> {DriverId}
            </p>
          </div>
        </div>
        <br />
        <hr />
      </Card.Body>

      <Card.Footer className="p-0">
        <div className="row" style={{ margin: "0" }}>
          <div className="col-12 seller-grid p-0">{buttonDisplay}</div>
        </div>
      </Card.Footer>
    </Card>
  );
}
