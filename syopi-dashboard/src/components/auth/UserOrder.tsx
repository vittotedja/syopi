import { useState } from "react";
import { Modal } from "react-bootstrap";
import Review from "../Review/Review";
import "./UserOrder.css";
import RatingPrompt from "./RatingPrompt";

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
      <div className="order-cart">
        <div className="row header d-flex">
          <span>Tanggal</span>
          <div>Order Status</div>
          <span>OrderId</span>
        </div>
        <div className="row ">shopName</div>
        <div className="row content">
          <div>
            <div
              style={{ cursor: "pointer", color: "blue" }}
            >
              ProductName
            </div>
            <div>Quantity:</div>
            <div>Price per Item</div>
          </div>
          <div>
            <div>Total Purchase : S$</div>
            <div>ShippingId</div>
          </div>
        </div>
        <div className="row footer">
          <div>Total Paid</div>
          <button onClick={handleShow}>Review</button>
        </div>
      </div>


      <Modal show={show} onHide={handleClose} centered>
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
