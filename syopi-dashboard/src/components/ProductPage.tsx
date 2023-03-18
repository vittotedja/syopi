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
      <Container>
        <Row>
          <Col>
            <img src={productpics} width={'500px'}/> 
            {/* Should have been a carousel but idk why it doesnt work */}
          </Col>
          <Col>
            <p className='product-title'>{data.ProductName}</p>
            <div className='rating-row'>
              <p className='rating'>{data.AvgRating}</p>
              <div className='star-cover flex'>
                <AiFillStar style = {{color:'gold',}}/>
                <AiFillStar style = {{color:'gold',}}/>
                <AiFillStar style = {{color:'gold',}}/>
                <AiFillStar style = {{color:'gold',}}/>
                <AiFillStar style = {{color:'gold',}}/>
              </div>
                <div className="cover" style={{width: `${100 - percentageFilled}`}}></div>
            </div>
            <p className='short-desc'>{data.Description}</p>
          </Col>
        </Row>
        <Row>
          <Review ProductId = {productId}/>
        </Row>
      </Container>
    </div>
    </>
  )
}

export default ProductPage