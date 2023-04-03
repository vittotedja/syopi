import { useState } from "react";
import { Modal } from "react-bootstrap";
import Review from "../Review/Review";
import "./UserOrder.css";
import RatingPrompt from "./RatingPrompt";
import Card from 'react-bootstrap/Card';
import IndivProduct from "./IndivProduct";

export default function UserOrder(props:any) {
  const [show, setShow] = useState(false);
  const [isClicked, setIsClicked] = useState(0);
  const [isHovering, setIsHovering] = useState(0);
  const [specificProduct, setSpecificProduct] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleRating = (rate:number) => setIsClicked(rate);

  return (
    <>
    <Card className='order-card-user'>
      <Card.Header className='order-card-user-header'>
        <div className='row' style={{margin:'0'}}>
          <div className='col-6'>
          OrderId / Date / ShopName 
          </div>
          <div className='col-6' style={{textAlign:'right'}}>
            OrderStatus
          </div>
        </div>
        
      </Card.Header>

      <IndivProduct/>
      
      <Card.Footer>
        <div className='row' style={{margin:'0'}}>
          <div className='col-11 seller-grid' style={{textAlign:'right'}}>
            <p>Total Price:</p>
            <p className='total-price-user'>S$123.00</p>
          </div>
          <div className='col-1 seller-grid' style={{padding:'0'}}>
            <button onClick={handleShow}>Review</button>
          </div>
        </div>
      </Card.Footer>
    </Card>
      


      <Modal show={show} onHide={handleClose}  size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Review OrderID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RatingPrompt isClicked = {isClicked} setIsClicked = {setIsClicked}/>
          <RatingPrompt/>
          <RatingPrompt/>
          {/* <div className="flex justify-between">
          <div>
            <img />
            <div>Product Name</div>
            <div>Price x Quantity</div>
          </div>
          <button className="review-button" disabled = {isClicked < 1} onClick={() => giveRating()}>Add Review</button>
          </div>
          <div>
            <Review 
              isClicked={isClicked}
              setIsClicked = {setIsClicked}
            />
          </div>
          <div>
            <textarea placeholder="Share your thoughts on the product" />
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Done</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
