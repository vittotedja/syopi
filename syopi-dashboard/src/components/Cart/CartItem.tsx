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


//   const handleCheckbox = () => {
//     if (props.productId in props.chosenProduct){
//       let id = props.productId
//       // delete props.chosenProduct[props.productId]
//       // props.setChosenProduct(props.chosenProduct)
//       props.setChosenProduct(current => {
//         const {id, ...rest} = current
//         return rest
//       })
//     }
//     else{
//       props.setChosenProduct({...props.chosenProduct, [props.productId] : qty})
//   }
// }

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
