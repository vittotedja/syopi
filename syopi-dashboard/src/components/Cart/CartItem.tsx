import React, { useEffect, useState } from "react";
import productpics from "../../assets/logofornow.jpg";

function CartItem(props: any) {
  const [qty, setQty] = useState(props.quantity);

  function updateQuantity(newQty: number) {
    const data = {
      ProductId: props.productId,
      Quantity: newQty,
    };

    fetch("http://127.0.0.1:5007/cart/updatequantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }

  const updateChosenQtyProduct = (newQty: number) => {
    if (props.productId in props.chosenProduct) {
      props.setChosenProduct({
        ...props.chosenProduct,
        [props.productId]: newQty,
      });
    }
  };

  const handleCheckboxChange = (event: any) => {
    const checked = event.target.checked;
    if (checked) {
      props.setChosenProduct((prevState: Object) => ({
        ...prevState,
        [props.productId]: qty,
      }));
    } else {
      const { [props.productId]: _, ...rest } = props.chosenProduct;
      props.setChosenProduct(rest);
    }
  };

  return (
    <div className="flex justify-around my-3 mx-4 py-5 items-center bg-slate-100">
      <img src={productpics} width={"80px"} className="rounded-lg" />
      <div className="text-start">
        <p className="pb-3">{props.name || "A very long Product Name"}</p>
        <p className="text-red-600 font-bold">$ {props.price || 4}</p>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => {
            qty > 1 ? setQty(qty - 1) : setQty(1);
            qty > 1 ? updateQuantity(qty - 1) : null;
            qty > 1 ? updateChosenQtyProduct(qty - 1) : null;
          }}
          className="rounded border border-neutral-500 mx-2"
        >
          -
        </button>
        <p className="font-bold">{qty}</p>
        <button
          onClick={() => {
            setQty(qty + 1);
            updateQuantity(qty + 1);
            updateChosenQtyProduct(qty + 1);
          }}
          className="rounded border border-neutral-500 mx-2"
        >
          +
        </button>
      </div>
      <div>
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          className="form-checkbox h-5 w-5 text-neutral-600"
        />
      </div>
      <div>TOTAL: $ {(props.price || 3.52 * qty).toFixed(2)}</div>
    </div>
  );
}

export default CartItem;
