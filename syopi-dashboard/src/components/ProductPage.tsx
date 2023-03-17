import productpics from '../assets/logofornow.jpg'
import './ProductPage.css'
import React, { useEffect, useState } from 'react'
import {Container, Col, Row, Carousel, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Review from './Review'

function ProductPage() {
  let { productId } = useParams()
  const [data, setData] = useState({})

  function fetchData() {  
    fetch(`http://127.0.0.1:5000/product/${productId}`)
    .then((response) => response.json())
    .then((data) => setData(data))
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <img src={productpics}/> 
            {/* Should have been a carousel but idk why it doesnt work */}
          </Col>
          <Col>
            <p className='product-title'>{data.ProductName}</p>
            <p className='short-desc'>{data.Description}</p>
          </Col>
        </Row>
        <Row>
          <Review ProductId = {productId}/>
        </Row>
      </Container>
    </div>
      
  )
}

export default ProductPage