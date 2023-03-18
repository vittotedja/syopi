import productpics from '../assets/logofornow.jpg'
import './ProductPage.css'
import React, { useEffect, useState } from 'react'
import {Container, Col, Row, Carousel, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Review from './Review'
import Navbar from './Navbar'
import { AiFillStar } from "react-icons/ai";

function ProductPage() {
  let { productId } = useParams()
  const [data, setData] = useState(Object)

  function fetchData() {  
    fetch(`http://127.0.0.1:5000/product/${productId}`)
    .then((response) => response.json())
    .then((data) => setData(data))
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
          <a href='/'>Home</a> > <a href='/shop'>Electronics</a> > <a href='/shop/1'>Laptop</a> > <a href='/product/1'>Product Name</a>
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
            <p className='productName'>hello apa kabar semuanya ini laptop terbaru{data.ProductName}</p>
            <div className='rating-row'>
              <p>Terjual 50 | <AiFillStar className='star'/> 5 | Review 40+</p>
            </div>
            <p className='productDesc'>apa kabar sodara sekalian marilah kita beridiri dan bergoyang untuk kesenangan hati kita sendiri{data.Description}</p>
          </div>
        </div>
        <div className='row'>
          <Review ProductId = {productId}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductPage