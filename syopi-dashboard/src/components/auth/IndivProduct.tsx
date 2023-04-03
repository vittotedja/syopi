import { useState } from "react";
import { Modal } from "react-bootstrap";
import Review from "../Review/Review";
import "./UserOrder.css";
import RatingPrompt from "./RatingPrompt";
import Card from 'react-bootstrap/Card';

export default function IndivProduct(props:any) {
    return(
        <Card.Body>
        <div className='row' style={{margin:'0'}}>
          <div className='col-3'>
            Image
          </div>
          <div className='col-6' style={{textAlign:'left'}}>
            <p>Product Name</p>
            <p className='text-muted'>Product variant</p>
            <p>Quantity: 1</p>
            <p>Price: S$123.00</p>
          </div>
          <div className='col-3 seller-grid'>
            <p>Total:</p>
            <p className='total-product-price-user'>S$123.00</p>
          </div>
        </div>
        <br/>
        <hr/>
      </Card.Body>
    )
}