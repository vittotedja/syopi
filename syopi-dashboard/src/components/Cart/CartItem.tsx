import React, { useEffect, useState } from "react";
import productpics from "../../assets/logofornow.jpg";

function CartItem(props: any) {
  const [qty, setQty] = useState(props.quantity);

  function updateQuantity(newQty:number) {
    const data = {
      ProductId: props.productId,
      Quantity: newQty
    }

    fetch('http://127.0.0.1:5007/cart/updatequantity', {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
  })
  .then((response) => response.json())
  }
  
  const updateChosenQtyProduct = (newQty:number) => {
    if (props.productId in props.chosenProduct){
      props.setChosenProduct({...props.chosenProduct, [props.productId] : newQty})
    }
  }

  const handleCheckboxChange = (event:any) => {
    const checked = event.target.checked
    if (checked){
      props.setChosenProduct((prevState:Object) => ({ ...prevState, [props.productId]: qty}))
    } else{
      const { [props.productId]: _, ...rest } = props.chosenProduct
      props.setChosenProduct(rest)

    }
  }

  return (
    <div className="flex">
      <img src={productpics} width={"60px"} />
      <p>{props.name}</p>
      <p>$ {props.price}</p>
      <div className="flex">
        <button onClick={()=>{
          qty > 1 ? setQty(qty - 1) : setQty(1);
          qty > 1 ? updateQuantity(qty-1): null;
          qty > 1 ? updateChosenQtyProduct(qty-1): null;
        }}>-</button>
        <p>{qty}</p>
        <button onClick={()=>{
          setQty(qty + 1)
          updateQuantity(qty+1)
          updateChosenQtyProduct(qty+1)
        }}>+</button>
      </div>
      <div>
        <input
          type="checkbox"
          onChange = {handleCheckboxChange}
          // onClick={() => {handleCheckboxChange}}
        />
      </div>
      <div>
        TOTAL: $ {(props.price * qty).toFixed(2)}
      </div>
    </div>
  );
}

export default CartItem;
