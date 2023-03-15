import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import Products from "./Products";
import "./Products.css";

function ProductsList() {
  const [products, setProducts] = useState(Array())
  const [ProductName, setProductName] = useState('Vitto Jelek')
  const [ShopId, setShopId] = useState(0)
  const [Stock, setStock] = useState(0)

  function fetchData() {  
    fetch("http://127.0.0.1:5000/products")
    .then((response) => response.json())
    .then((data) => setProducts(data))
  }

  function getAvgRating(ProductId: any){
    fetch(`http://127.0.0.1:5003/rating/${ProductId}`)
    .then((response)  => response.json())
    .then((data) => console.log(data))
  }

  function addProduct() {
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

  function giveRating() {
    const ProductId = "20ec035f-f87d-49e0-a7b0-ab604bf92508"
    const Rating = rating

    const data = {
        product_id: ProductId,
        review_description: "ESD SUSAH YAK GAES",
        review_rating: Rating,
        user_id: 2
    }
    fetch(`http://127.0.0.1:5003/giverating/${ProductId}`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => {
    getAvgRating(ProductId)
    // setProducts((products) => [...products, data[0]])
    console.log("Success:", data)
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
      <input type="text" placeholder="Give Rating" onChange= {(e) => setRating(e.target.value)}/>
      <button onClick={() => giveRating()}>Add Review</button>
      <div className="product-list">
        {products.map((product) => {return <Products key={product.ProductId} ProductName={product.ProductName} stock = {product.Stock} AvgRating = {product.AvgRating}/>})}
      </div>
    </div>
  );
}

export default ProductsList;
