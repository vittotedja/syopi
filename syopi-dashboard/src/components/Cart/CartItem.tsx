import React, { useEffect, useState } from "react";
import productpics from "../../assets/logofornow.jpg";

function CartItem(props: any) {
  const [data, setData] = useState(Object);

  function fetchData() {
    fetch(`http://127.0.0.1:5000/getcart/1/${props.productId}`)
      .then((response) => response.json())
      .then((res) => {
        setData(res[0]);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      <img src={productpics} width={"60px"} />
      <p>{props.name}</p>
      <p>$ {props.price}</p>
      <div className="flex">
        <button>-</button>
        <p>{data.Quantity}</p>
        <button>+</button>
      </div>
      <div>
        <input
          type="checkbox"
          onClick={() => {
            props.setChosenProduct([...props.chosenProduct, props.productId]);
          }}
        />
      </div>
      <div>
        TOTAL: $ {props.price * data.Quantity}
      </div>
    </div>
  );
}

export default CartItem;
