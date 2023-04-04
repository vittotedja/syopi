import React, { useState } from "react";
import Review from "../Review/Review";
import productpics from "../../assets/logofornow.jpg";


export default function RatingPrompt(props: any) {
//   const [isClicked, setIsClicked] = useState(0);
  const [isHovering, setIsHovering] = useState(0);
  const [specificProduct, setSpecificProduct] = useState({});
  const [show, setShow] = useState(true);
  const [description, setDescription] = useState("");

  function getAvgRating(ProductId: any) {
    fetch(`http://127.0.0.1:5009/rating/${ProductId}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function getSpecificProduct(ProductId: any) {
    fetch(`http://127.0.0.1:5002/product/${ProductId}`)
      .then((response: any) => response.json())
      .then((data: any) => {
        console.log(data);
        setSpecificProduct(data);
      });
  }

  function giveRating() {
    const data = {
      OrderId: props.OrderId,
      ProductId: props.ProductId,
      Description: description,
      Rating: props.isClicked,
      UserId: "1",
    };
    fetch(`http://127.0.0.1:5003/review/giverating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        setShow(false);
        getSpecificProduct(props.ProductId);
      })
      .then((data) => {
        const avgRating: any = getAvgRating("1");
        console.log("Success:", data);
        setSpecificProduct({
          ...specificProduct,
          AvgRating: avgRating,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      {show ? (
        <>
        <div className='row' style={{margin:'0'}}>
          <div className='col-3 seller-grid'>
            <img src={props.Image} style={{borderRadius: '50%'}}/>
          </div>
          <div className='col-7 seller-grid'>
            <p>{props.ProductName}</p>
            <p>${props.Price / props.Quantity} x {props.Quantity}</p>
          </div>
          <div className='col-2 seller-grid'>
          <button
              className="review-button"
              disabled={props.isClicked < 1}
              onClick={() => {
                giveRating();
                setShow(false)
              }}
            >
              Add Review
            </button>
          </div>
          <div className='row'>
          <Review
              isClicked={props.isClicked}
              setIsClicked={props.setIsClicked}
            />
          </div>
          <div className='row'>
            <textarea placeholder="Share your thoughts on the product" onChange = {(e:any) => setDescription(e.target.value)}/>
          </div>
        </div>
        
          <hr />
          <br/>
          
        </>
      ) : (
        <></>
      )}
      
    </>
  );
}
