import React, { useEffect } from "react";
import Products from "./Products";
import "./Products.css";

function ProductsList() {
  const [products, setProducts] = React.useState([]);
  function fetchData() {
    fetch("http://127.0.0.1:5000")
    .then((response) => response.json())
    .then((data) => setProducts(data))
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      Discover Your Reccomended Products!
      <div className="product-list">
        {products.map((product) => {return <Products key={product.ProductId}/>})}
      </div>
    </div>
  );
}

export default ProductsList;
