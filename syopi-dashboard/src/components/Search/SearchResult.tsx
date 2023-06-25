import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Products from "../Browse/Products";

export default function SearchResult(props: any) {
  const [keyword, setKeyword] = useState(props.keyword)
  const [page, setPage] = useState(props.page)
  const [products, setProducts] = useState(Array())

  useEffect(() => {
    setKeyword(props.keyword)
    setPage(props.page)
  }, [props.keyword, props.page])

  useEffect(() => {
    fetch("http://127.0.0.1:5002/product/search?keyword=" + keyword + "&page=" + page)
    .then((response) => response.json())
    .then((data) => {console.log(data.count), setProducts(data.data), props.setCount(data.count)})
  }, [keyword, page])
  
  return (
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
  )
}
