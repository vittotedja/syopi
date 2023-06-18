import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { HiShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router";
import Navbar from "../Navbar";

function Cart() {
  let navigate = useNavigate();
  const [cart, setCart] = useState(Array);
  const [chosenProduct, setChosenProduct] = useState(Object);
  const userId = 1;

  function fetchData() {
    fetch(`http://127.0.0.1:5008/view_cart/1`)
      .then((response) => response.json())
      .then((data) => setCart(data.data));
  }

  useEffect(() => {
    console.log(chosenProduct);
  }, [chosenProduct]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-auto w-4/5 h-screen">
        <div className="flex font-bold text-3xl py-5 w-full justify-center align-middle text-center">
          <HiShoppingBag className="mr-2 h-full" />
          Your Cart
        </div>
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
              navigate(`/confirmation?data=${JSON.stringify(chosenProduct)}`);
            }}
          >
            Checkout
          </button>
        </div>
        {JSON.stringify(chosenProduct)}
      </div>
    </>
  );
}

export default Cart;
