  import React, { useEffect, useState } from "react";
  import Products from "./Products";
  import "./Products.css";

  export default function ProductsList() {
    const [products, setProducts] = useState(Array())


    function fetchData() {  
      fetch("http://127.0.0.1:5010/recommender")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error)=>{
        console.log(error)
      })
    }

    // function addProduct() {
    //   const data = {
    //       ProductName: ProductName,
    //       ShopId: ShopId,
    //       Stock: Stock,
    //       Price: 1
    //   }
    //   fetch('http://127.0.0.1:5002/product', {
    //       method:'POST',
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(data),
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data)
    //     setProducts((products) => [...products, data[0]])
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  // }
    useEffect(() => {
      fetchData();
    }, []);

    return (
      <div>
        <h2>Discover Your Recomended Products!</h2>
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

