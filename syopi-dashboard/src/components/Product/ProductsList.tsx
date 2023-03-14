import React, { useEffect } from "react";
import Products from "./Products";
import "./Products.css";

function ProductsList() {
  const [products, setProducts] = React.useState([]);
  const [productName, setProductName] = React.useState("BEBEK");
  const [shopId, setShopId] = React.useState("100");
  const [stock, setStock] = React.useState("1");


  function fetchData() {  
    fetch("http://127.0.0.1:5000/products")
    .then((response) => response.json())
    .then((data) => setProducts(data))
  }

  function addProduct() {
    const ProductName = 'vitto'
    const ShopId = 1
    const Stock = 1
    const data = {
        ProductName: ProductName,
        ShopId: ShopId,
        Stock: Stock
    }
    fetch('http://127.0.0.1:5000/products', {
        method:'POST',
        headers: {
          "Content-Type": "application/json"
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
      <br/>
      <button onClick={() => addProduct()}>add product</button>
      <div className="product-list">
        {products.map((product) => {return <Products key={product.ProductId} name = {product.ProductName}/>})}
      </div>
    </div>
  );
}

export default ProductsList;
