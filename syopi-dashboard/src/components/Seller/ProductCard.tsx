import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderCard.css";
import Button from 'react-bootstrap/Button';
import productpics from '../../assets/logo.png'

export default function ProductCard(props: any) {
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
    <div className='row'>
    <div className='col-6 seller-productinfo'>
        <img src={productpics} className='seller-productimg'/>
        <p className='seller-grid seller-productname'>{props.ProductName}</p>
    </div>
    <div className='col-2 seller-grid'>
        <p>${props.Price}</p>
    </div>
    <div className='col-2 seller-grid'>
        <p>{props.Stock}</p>
    </div>
    <div className='col-2 seller-grid'>
        <Button>Edit</Button>
    </div>
    </div>
    // <div className="order-cart">
    //   <div className="row header" style={{margin:'0px'}}>
    //     <p className='ordercard-orderid'>Product ID:</p>
    //     <p>{props.ProductId}</p>
    //   </div>
    //   <div className="row content">
    //     <div>
    //       <div
    //         style={{ cursor: "pointer", color: "blue" }}
    //         onClick={() => navigate(`/product/${props.ProductId}`)}
    //       >
    //         {productData.ProductName}
    //       </div>
    //       <div>Stock: {props.Stock}</div>
    //       <div>Price : S$ {props.Price}</div>
    //     </div>
    //   </div>
    //   <div className="row footer">
    //     <button> Edit Product </button>
    //   </div>
    // </div>
  );
}
