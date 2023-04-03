import React, {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./Courier.css";

export default function Courier(props: any) {
    const [orders, setOrders] = useState(Array)
    const [shippingData, setShippingData] = useState<any>({});
    const [shippingStatus, setShippingStatus] = useState<string>(props.ShippingStatus);
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
        <div>Courier</div>
        <div>
            See All Available Orders
        </div>
        
        <div className="couriers">
      <div className="row header">
        Courier
      </div>
      <div className="row content">
        <div>
          <div
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate(`/product/${props.ProductId}`)}
          >
          Kucing
          
          </div>
          <div>Quantity: 2 {props.Quantity}</div>
          <div>Total : S$ 5 {props.Price}</div>
        </div>
        <div>
          
         
          To: Cina {shippingData.UserAddress}
          <br />
          From: Indo {shippingData.ShopAddress}
          <br />
          Shipping Id: {shippingData.ShippingId}
          <br />
          Courier Id: {shippingData.CourierId}
          <br />
          Driver Id: {shippingData.DriverId}
        </div>
      </div>
      <div className="row footer">
        <div></div>
        {shippingStatus == 'NULL' ? <button onClick={() => acceptShipping(props.OrderId)}> Accept Delivery </button>:
        <button> Accept Delivery </button>}
      </div>
    </div>
    </>

  )
}
 