import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Stripe from "../Payment/Stripe";
import { useNavigate } from "react-router";
import Navbar from "../Navbar";

function Cart() {
  let navigate = useNavigate();
  const [cart, setCart] = useState(Array);
  // const [product, setProduct] = useState(Array)
  // const [string, setString] = useState("/confirmation?data=");
  const [chosenProduct, setChosenProduct] = useState(Object);
  const userId = 1

  function fetchData() {
    fetch(`http://127.0.0.1:5008/view_cart/1`)
      .then((response) => response.json())
      .then((data) => setCart(data.data));
  }

  useEffect(() => {
    console.log(chosenProduct)
  }, [chosenProduct]);

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
    <Navbar/>
    <div>
      Your Cart
      {cart.map((item: any) => {
        return (
          <CartItem
            key={item.ProductId}
            productId={item.ProductId}
            name={item.ProductName}
            price={item.Price}
            quantity={item.Quantity}
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
    </>
  );
}

export default Cart;
