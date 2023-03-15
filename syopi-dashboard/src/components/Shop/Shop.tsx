import React from 'react'
import shoppics from '../../assets/logofornow.jpg'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Shop(props: any) {
  const navigate = useNavigate()
  const [shop, setShop] = useState([]);

  async function fetchShop() {
    navigate(`/shop/${props.shop.name}`)
    // try {
    //   const response = await fetch(`http://127.0.0.1:5000/shop/${props.shop.name}`);
    //   const data = await response.json();
    //   setShop(data);
    //   console.log(shop)
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (

    <div className='shop-card mx-3'>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={shoppics} />
        <Card.Body>
          <Card.Title>{props.shop.name}</Card.Title>
          <Card.Text>
            <p>{props.shop.address}</p>
            <p>{props.shop.phone_number}</p>
          </Card.Text>
          <Button variant="primary" onClick={fetchShop}>Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Shop