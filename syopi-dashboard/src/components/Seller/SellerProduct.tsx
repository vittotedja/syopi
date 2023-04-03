import React, {useState, useEffect} from 'react'
import ProductCard from './ProductCard'

export default function SellerProduct(props:any) {
  const data = props.productData

  return (
    <>
        
        <div className="order-list">
        {data.map((product:any) => {
          return <ProductCard
            key={`${product.ProductId}`}
            ProductId={product.ProductId}
            ProductName={product.ProductName}
            Stock={product.Stock}
            Price={product.Price}
            ShopId={product.ShopId}
          />
        })}
      </div>
    </>

  )
}
