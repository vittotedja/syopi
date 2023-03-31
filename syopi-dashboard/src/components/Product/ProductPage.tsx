import productpics from '../../assets/logofornow.jpg'
import './ProductPage.css'
import { useEffect, useState } from 'react'
import {Container, Col, Row, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Review from '../Review/Review'
import Navbar from '../Navbar'
import { AiFillStar } from "react-icons/ai";
import StarRating from '../Review/Review'

function ProductPage() {
  let { productId } = useParams()
  const [data, setData] = useState(Object)
  const [quantity, setQuantity] = useState(1)

  function fetchData() {  
    fetch(`http://127.0.0.1:5000/product/${productId}`)
    .then((response) => response.json())
    .then((data) => setData(data[0]))
  }

  function addToCart() {
    const sentData = {
      ProductId: productId,
      Quantity: quantity
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

  function kurangin(){
    if (quantity > 1)
    setQuantity(quantity-1)
  }

  return (
    <>
    <Navbar/> 
    <div>
      <div className='container'>
        <div className='directory'>
          <a href='/'>Home</a> &#62; <a href='/shop'>{data.Category}</a> &#62; <a href={`/product/${productId}`}>{data.ProductName}</a>
        </div>
        <div className='row'>
          <div className='col-6 productimg'>
            <img src={productpics} width='60%' style={{display: 'initial'}}/> 
            {/* Should have been a carousel but idk why it doesnt work */}
            <div className='row'>
              <div className='col-4'>
                <img src={productpics} width='60%' style={{display: 'initial'}}/>
              </div>
              <div className='col-4'>
                <img src={productpics} width='60%' style={{display: 'initial'}}/>
              </div>
              <div className='col-4'>
                <img src={productpics} width='60%' style={{display: 'initial'}}/>
              </div>
              <div className='col-4'>
                <img src={productpics} width='60%' style={{display: 'initial'}}/>
              </div>
            </div>
          </div>
          <div className='col-6 productDetail'>
            <p className='productName'>{data.ProductName}</p>
            <div className='rating-row'>
              <div className='col-3'>
                Sold 50+
              </div>
              <div className='col-2 rating'>
              <AiFillStar style={{color: "gold"}}/> 5 
              </div>
              <div className='col-3'>
              <a href='#review'>Review 40+</a>
              </div>
            </div>
            <div className='row shop'>
              <div className='col-6'>
                Shop name bimzalabim
              </div>
              <div className='col-3 rating'>
                <AiFillStar style={{color: "gold"}}/> 5
              </div>
              <div className='col-3'>
                <Button variant="Primary" className=''>+ Follow</Button>
              </div>
            </div>
            <p className='productDesc'>{data.Description}</p>
            <p className='productPrice'>$ {data.Price}</p>
          </div>
        </div>
        <hr/>
        <div className='row'>
          {/* <Review ProductId = {productId}/> */}
          <StarRating ProductId = {productId}/>
          <div>
          <div className='flex' style={{height: '60px', margin: '5px'}}>
            <button onClick={() => kurangin()}>-</button>
            {quantity}
            <button onClick={() => setQuantity(quantity+1)}>+</button>
          </div>
            <button onClick={() => addToCart()}>Add to Cart</button>
          </div>
        </div>
    </div>
  </div>
  </>
  )
}

export default ProductPage