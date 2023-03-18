import productpics from '../assets/logofornow.jpg'
import './ProductPage.css'
import { useEffect, useState } from 'react'
import {Container, Col, Row} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Review from './Review'
import Navbar from './Navbar'
import { AiFillStar } from "react-icons/ai";
import StarRating from './ReviewNew'

function ProductPage() {
  let { productId } = useParams()
  const [data, setData] = useState(Object)
  const [quantity, setQuantity] = useState(1)

  function fetchData() {  
    fetch(`http://127.0.0.1:5000/product/${productId}`)
    .then((response) => response.json())
    .then((data) => setData(data))
  }

  function addToCart() {
    const sentData = {
      ProductId: productId,
      Quantity: 2
    }
    fetch(`http://127.0.0.1:5000/tambahcart/${productId}/${quantity}`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sentData)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data)
    })
    .catch((error) => {
      console.error("Error:", error);
    })
  }

  useEffect(() => {
    fetchData();
  },[])

  const percentageFilled = Math.round((data.AvgRating / 5) * 100)
  console.log(percentageFilled)


  return (
    <>
    <Navbar/> 
    <div>
      <div className='container'>
        <div className='directory'>
          <a href='/'>Home</a> &#62; <a href='/shop'>{data.Category}</a> &#62; <a href={`/product/${productId}`}>{data.ProductName}</a>
        </div>
        <div className='row'>
          <div className='col-6 '>
            <img src={productpics}/> 
            {/* Should have been a carousel but idk why it doesnt work */}
            <br/>
            <div className='row'>
              <div className='col-3'>
                <img src={productpics}/>
              </div>
              <div className='col-3'>
                <img src={productpics}/>
              </div>
              <div className='col-3'>
                <img src={productpics}/>
              </div>
              <div className='col-3'>
                <img src={productpics}/>
              </div>
            </div>
          </div>
          <div className='col-6 productDetail'>
            <p className='productName'>{data.ProductName}</p>
            <div className='rating-row'>
              <p>Terjual 50 | <AiFillStar className='star'/> 5 | Review 40+</p>
            </div>
            <p className='productDesc'>{data.Description}</p>
          </div>
        </div>
        <hr/>
        <div className='row'>
          <Review ProductId = {productId}/>
          <StarRating ProductId = {productId}/>
          <button onClick={() => addToCart()}>Add to Cart</button>
        </div>
    </div>
  </div>
  </>
  )
}

export default ProductPage