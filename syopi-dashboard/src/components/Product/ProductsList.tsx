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

  function addProduct() {
    const productName = 'ayam'
    const shopId = 1
    const stock = 1
    const data = {
        productName: productName,
        shopId: shopId,
        stock: stock
    }
    console.log(data)
    fetch('http://127.0.0.1:5000/', {
        method:'POST',
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      Discover Your Reccomended Products!
      <p onClick={() => addProduct()}>add product</p>
      <div className="product-list">
        {products.map((product) => {return <Products key={product.ProductId}/>})}
      </div>
    </div>
  );
}

export default ProductsList;
