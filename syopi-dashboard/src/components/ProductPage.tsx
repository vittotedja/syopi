import React from 'react'
import productpics from '../assets/logofornow.jpg'
import './ProductPage.css'
import {Container, Col, Row, Carousel, Button} from 'react-bootstrap'

function ProductPage() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <img src={productpics}/> 
            {/* Should have been a carousel but idk why it doesnt work */}
          </Col>
          <Col>
            <p className='product-title'>Product Name</p>
          </Col>
        </Row>
      </Container>
    </div>
      
  )
}

export default ProductPage