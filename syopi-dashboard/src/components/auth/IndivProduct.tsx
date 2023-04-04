import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Review from "../Review/Review";
import "./UserOrder.css";
import RatingPrompt from "./RatingPrompt";
import Card from 'react-bootstrap/Card';
import productpics from "../../assets/logofornow.jpg";


export default function IndivProduct(props:any) {
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState(productpics);

  const fetchProductData = () => {
    fetch(`http://127.0.0.1:5002/product/${props.ProductId}`)
    .then((response) => response.json())
    .then((data) => {
      setProductName(data[0].ProductName)
      setImage(data[0].ImageUrls[0].ImageUrl)
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [])




    return(
        <Card.Body>
        <div className='row' style={{margin:'0'}}>
          <div className='col-3'>
          <img src={image} width="100px" style={{borderRadius: '50%'}} />  
          </div>
          <div className='col-6' style={{textAlign:'left'}}>
            <p>{productName}</p>
            {/* <p className='text-muted'>Product variant</p> */}
            <p>Quantity: {props.Quantity}</p>
            <p>Price: S${props.Price / props.Quantity}</p>
          </div>
          <div className='col-3 seller-grid'>
            <p>Total:</p>
            <p>S$ {props.Price}</p>
          </div>
        </div>
        <br/>
        <hr/>
      </Card.Body>
    )
}