import React from 'react'
import shoppics from '../../assets/logofornow.jpg'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function ShopPage(props: any) {
  const [shop, setShop] = useState([]);
  const { shopName } = useParams();

  async function fetchShop() {
    console.log(shopName)
    fetch(`http://127.0.0.1:5001/shop/${shopName}`)
      .then((response) => response.json())
      .then((data) => (setShop(data.data[0])))
  }

  useEffect(() => {
    fetchShop()
  }, []);

  return (

    <div>
      <h1>Welcome to {props.name}</h1>
      <h5>Address: {props.address}</h5>
      <h5>Phone: {props.phone_number}</h5>
    </div>
  )
}

export default ShopPage;