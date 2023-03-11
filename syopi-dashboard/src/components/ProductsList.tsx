import React from "react";
import Products from "./Products";
import './Products.css'

function ProductsList() {
  return (
    <div>
      Discover Your Reccomended Products!
      <div className="product-list">
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
