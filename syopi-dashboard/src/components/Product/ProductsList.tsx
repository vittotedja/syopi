import React, { useEffect } from "react";
import Products from "./Products";
import "./Products.css";

function ProductsList() {
  const [products, setProducts] = React.useState(Array())

  function fetchData() {  
    fetch("http://127.0.0.1:5000/")
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
    fetch('http://127.0.0.1:5000/', {
        method:'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data)
      setProducts((products) => [...products, data[0]])
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
      Discover Your Recomended Products!
      <br/>
      <button onClick={() => addProduct()}>add product</button>
      <div className="product-list">
        {products.map((product) => {return <Products key={product.ProductId} ProductName={product.ProductName}/>})}
      </div>
    </div>
  );
}

export default ProductsList;
