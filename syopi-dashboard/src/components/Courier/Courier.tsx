import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Courier.css";
import Card from "react-bootstrap/Card";
import CourierCard from "./CourierCard";

export default function Courier(props: any) {
  const [orders, setOrders] = useState(Array);
  const [shippingData, setShippingData] = useState<any>({});
  const [shippingStatus, setShippingStatus] = useState<string>(
    props.ShippingStatus
  );
  const [showNewShipping, setshowNewShipping] = useState(true);
  const [showcurrentShipping, setshowcurrentShipping] = useState(false);
  const [showCompletedShipping, setShowCompletedShipping] = useState(false);
  const [showReportedShipping, setShowReportedShipping] = useState(false);
  const [header, setHeader] = useState("New Shipping");
  let navigate = useNavigate();

  const mockNewOrderData = [
    {
      OrderId: "1",
      Date: new Date(),
      ShippingId: "34",
      ProductName: "Lato-lato terbaru ! MURAH !! PROMO !!! ",
      ProductId: "11421",
      Quantity: "5",
      Price: "1.00",
      Total: "5.00",
      UserAddress: "70 Stamford Road, 279383",
      ShopAddress: "30 Dhoby Ghaut Plaza, 023321",
      CourierId: "12312",
      DriverId: "123144",
      Status: "NEW",
    },
    {
      OrderId: "2",
      Date: new Date(),
      ShippingId: "57",
      ProductName: "Dog collar ! 3 different sizes and 10 colours !",
      ProductId: "525246",
      Quantity: "2",
      Price: "10.00",
      Total: "20.00",
      UserAddress: "7 Toa Pa Yoh Road, 275233",
      ShopAddress: "35 Punggol Street, 959403",
      CourierId: "235264",
      DriverId: "141435",
      Status: "ACCEPTED",
    },
    {
      OrderId: "2",
      Date: new Date(),
      ShippingId: "57",
      ProductName: "Dog collar ! 3 different sizes and 10 colours !",
      ProductId: "525246",
      Quantity: "2",
      Price: "10.00",
      Total: "20.00",
      UserAddress: "7 Toa Pa Yoh Road, 275233",
      ShopAddress: "35 Punggol Street, 959403",
      CourierId: "235264",
      DriverId: "141435",
      Status: "COMPLETED",
    },
  ];

  function fetchData() {
    fetch("http://127.0.0.1:5000/order/");
  }

  function getShippingData() {
    fetch(`http://127.0.0.1:5000/find_by_shippingid/${props.ShippingId}`)
      .then((response) => response.json())
      .then((data) => setShippingData(data[0]));
  }

  useEffect(() => {
    getShippingData();
  }, []);


  const toggleNewShipping = () => {
    setHeader("New Shipping");
    setshowNewShipping(true);
    setshowcurrentShipping(false);
    setShowCompletedShipping(false);
    setShowReportedShipping(false);
  };

  const toggleCurrentShipping = () => {
    setHeader("Current Shipping");
    setshowNewShipping(false);
    setshowcurrentShipping(true);
    setShowCompletedShipping(false);
    setShowReportedShipping(false);
  };

  const toggleCompletedShipping = () => {
    setHeader("Completed Shipping");
    setshowNewShipping(false);
    setshowcurrentShipping(false);
    setShowCompletedShipping(true);
    setShowReportedShipping(false);
  };

  const toggleReportedShipping = () => {
    setHeader("Reported Shipping");
    setshowNewShipping(false);
    setshowcurrentShipping(false);
    setShowCompletedShipping(false);
    setShowReportedShipping(true);
  };

  return (
    <>
      <div className="seller-container">
        <div className="row">
          <div className="col-12">
            <p className="seller-page-title">Courier</p>
          </div>
        </div>
        <div className="row" style={{ margin: "0" }}>
          <div className="col-3">
            <div className="seller-menu">
              <p>
                <button onClick={toggleNewShipping} className="seller-page">
                  New
                </button>
              </p>
              <p>
                <button onClick={toggleCurrentShipping} className="seller-page">
                  Current
                </button>
              </p>
              <p>
                <button
                  onClick={toggleCompletedShipping}
                  className="seller-page"
                >
                  Completed
                </button>
              </p>
              <p>
                <button
                  onClick={toggleReportedShipping}
                  className="seller-page"
                >
                  Reported
                </button>
              </p>
            </div>
          </div>

          <div className="col-9 output">
            {(() => {
              return (
                <>
                  <div className="seller-menu">
                    <div className="row" style={{ margin: "0" }}>
                      <div className="col-12">
                        <p className="seller-page-title">{header}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                  {mockNewOrderData.map((order) => {
                    return (
                      <CourierCard
                        key={order.OrderId + order.ShippingId}
                        OrderId={order.OrderId}
                        DateObj={order.Date}
                        ShippingId={order.ShippingId}
                        ProductName={order.ProductName}
                        ProductId={order.ProductId}
                        Quantity={order.Quantity}
                        Price={order.Price}
                        Total={order.Total}
                        UserAddress={order.UserAddress}
                        ShopAddress={order.ShopAddress}
                        CourierId={order.CourierId}
                        DriverId={order.DriverId}
                        Status={order.Status}
                      />
                    );
                  })}
                  {/* <CourierCard
                     shippingData={shippingData}
                     shippingStatus={shippingStatus}
                   /> */}

                  {/* {orderData.map((order:any) => {
                    console.log(order)
                    return <SellerOrder key={order[0].OrderId} orderData={order}/>
                  })} */}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </>
  );
}
