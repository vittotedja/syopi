import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Stripe from "../Payment/Stripe";
import { useNavigate } from "react-router";

function Cart() {
  let navigate = useNavigate();
  const [data, setData] = useState(Array);
  // const [product, setProduct] = useState(Array)
  // const [string, setString] = useState("/confirmation?data=");
  const [chosenProduct, setChosenProduct] = useState(Object);

  function fetchData() {
    fetch(`http://127.0.0.1:5000/getcartsproduct/1`)
      .then((response) => response.json())
      .then((data) => setData(data.data));
  }

  useEffect(() => {
    console.log(chosenProduct)
  }, [chosenProduct]);

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      Your Cart
      {data.map((item: any) => {
        return (
          <CartItem
            key={item.ProductId}
            productId={item.ProductId}
            name={item.ProductName}
            price={item.Price}
            setChosenProduct={setChosenProduct}
            chosenProduct={chosenProduct}
          />
        );
      })}
      <div>
        <button 
          onClick={() => {
            navigate(`/confirmation?data=${JSON.stringify(chosenProduct)}`)
          }}
        >
          Checkout
        </button>
      </div>
      {JSON.stringify(chosenProduct)}
      {/* <Stripe/> */}
    </div>
  );
}

export default Cart;
