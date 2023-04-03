import React, { useState } from "react";
import Review from "../Review/Review";

export default function RatingPrompt(props: any) {
//   const [isClicked, setIsClicked] = useState(0);
  const [isHovering, setIsHovering] = useState(0);
  const [specificProduct, setSpecificProduct] = useState({});
  const [show, setShow] = useState(true);

  function getAvgRating(ProductId: any) {
    fetch(`http://127.0.0.1:5000/rating/${ProductId}`)
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
      OrderId: "pi_3MsQHqBJIMpkY9J21DXYT7Bn",
      ProductId: "10607759-99a3-45fa-8141-58465e1d5f97",
      Description: "product ini bagoes",
      Rating: props.isClicked,
      UserId: "1",
    };
    fetch(`http://127.0.0.1:5000/review/giverating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        setShow(false);
        // getSpecificProduct();
      })
      // .then((data) => {
      //   const avgRating: any = getAvgRating("1");
      //   console.log("Success:", data);
      //   setSpecificProduct({
      //     ...specificProduct,
      //     AvgRating: avgRating,
      //   });
      // })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      {show ? (
        <>
          <div className="flex justify-between">
            <div>
              <img />
              <div>Product Name</div>
              <div>Price x Quantity</div>
            </div>
            <button
              className="review-button"
              disabled={props.isClicked < 1}
              onClick={() => {
                // giveRating();
                setShow(false)
              }}
            >
              Add Review
            </button>
          </div>
          <div>
            <Review
              isClicked={props.isClicked}
              setIsClicked={props.setIsClicked}
            />
          </div>
          <div>
            <textarea placeholder="Share your thoughts on the product"/>
          </div>
          <hr />
          <br />
        </>
      ) : (
        <></>
      )}
      {/* 
      <div className="flex justify-between">
        <div>
          <img />
          <div>Product Name</div>
          <div>Price x Quantity</div>
        </div>
        <button className="review-button" disabled = {props.isClicked < 1} onClick={() => {giveRating()}}>Add Review</button>
      </div>
      <div>
        <Review isClicked={props.isClicked} setIsClicked={props.setIsClicked} />
      </div>
      <div>
        <textarea placeholder="Share your thoughts on the product" />
      </div>
      <hr/>
      <br/> */}
    </>
  );
}
