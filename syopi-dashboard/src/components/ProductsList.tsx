import React, { useEffect } from "react";
import Products from "./Products";
import "./Products.css";

function ProductsList() {
  const [products, setProducts] = React.useState([]);
  async function fetchData() {
    await fetch("http://127.0.0.1:5000/products")
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      setProducts(text)
      console.log(text)
    })};

  useEffect(() => {
    fetchData();
  }, []);

  const test = [{ ProductName: "a" }, { ProductName: "b" }, { ProductName: "c" }];
  return (
    <div>
      Discover Your Reccomended Products!
      {test.map((x) => {return x.ProductName})}
      <div className="product-list">
        {/* {products.map((product) => {
          return <Products name = {product.ProductName}/>;
        })} */}

        <Products />
        <Products />
        <Products />
        <Products />
        <Products />
        <Products />
      </div>
    </div>
  );
}

export default ProductsList;
