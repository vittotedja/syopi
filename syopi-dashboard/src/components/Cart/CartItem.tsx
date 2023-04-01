import React, { useEffect, useState } from "react";
import productpics from "../../assets/logofornow.jpg";

function CartItem(props: any) {
  const [data, setData] = useState(Object);
  const [qty, setQty] = useState(0);

  function fetchData() {
    fetch(`http://127.0.0.1:5000/getcart/1/${props.productId}`)
      .then((response) => response.json())
      .then((res) => {
        setData(res[0]);
        setQty(res[0].Quantity)
      });
  }


  function updateQuantity(newQty:number) {
    const data = {
      ProductId: props.productId,
      Quantity: newQty
    }

    fetch('http://127.0.0.1:5000/updatequantity', {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
  })
  .then((response) => response.json())
  }
  
  const updateChosenQtyProduct = (newQty:number) => {
    let el = props.chosenProduct.map((item:any)=> {if(item.ProductId == props.ProductId){item.Quantity = newQty} return {ProductId: item.ProductId, Quantity: newQty}
    })
    props.setChosenProduct(el)
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
          onClick={() => {props.setChosenProduct(
            props.chosenProduct.find((item: any) => item.ProductId === props.productId) ?
            (props.chosenProduct.filter((item: any) => item.ProductId !== props.productId)) :
          [...props.chosenProduct, { ProductId: props.productId, Quantity: qty }]
          );
          }}
        />
      </div>
      <div>
        TOTAL: $ {(props.price * qty).toFixed(2)}
      </div>
    </div>
  );
}

export default CartItem;
