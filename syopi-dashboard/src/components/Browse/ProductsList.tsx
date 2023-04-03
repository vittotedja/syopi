import React, { useEffect, useState } from "react";
import Products from "./Products";
import "./Products.css";

export default function ProductsList() {
  const [products, setProducts] = useState(Array())
  const [ProductName, setProductName] = useState('Vitto Jelek')
  const [ShopId, setShopId] = useState(0)
  const [Stock, setStock] = useState(0)

  function fetchData() {  
    fetch("http://127.0.0.1:5000/recommender")
    .then((response) => response.json())
    .then((data) => setProducts(data))
  }

  function addProduct() {
    const data = {
        ProductName: ProductName,
        ShopId: ShopId,
        Stock: Stock,
        Price: 1
    }
    fetch('http://127.0.0.1:5000/product', {
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
      {/* <button onClick={() => addProduct()}>add product</button> */}
      <div className="product-list">
        {products.map((product) => {
          return <Products 
            key={product.ProductId} 
            ProductName={product.ProductName} 
            stock={product.Stock} 
            AvgRating={product.AvgRating} 
            Price={product.Price} 
            id={product.ProductId}
            imageUrl={product.ImageUrls[0].ImageUrl}
          />
        })}
      </div>
    </div>
  );
}

