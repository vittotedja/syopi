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
  const [mainImage, setMainImage] = useState<string>('')

  function fetchData() {  
    fetch(`http://127.0.0.1:5000/product/${productId}`)
    .then((response) => response.json())
    .then((data) => {setData(data[0]); setMainImage(data[0].ImageUrls[0].ImageUrl)})
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
            <img src={mainImage} width='60%' style={{display: 'initial'}}/> 
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
                Sold {data.AmountSold}
              </div>
              <div className='col-2 rating'>
              <AiFillStar style={{color: "gold"}}/> {data.AvgRating} 
              </div>
              <div className='col-3'>
              <a href='#review'>Review 40+</a>
              </div>
            </div>
            <div className='row productPrice'>
            <p style={{backgroundColor:'#F2EDE4'}}>$ {data.Price}</p>
            </div>
            
            <div className='row'>
            <p style={{fontWeight:'bold'}}>Colour</p>
            </div>
            <div className='row'>
              <div className='col-3'>
                <Button variant='Primary'>Black</Button>
              </div>
              <div className='col-3'>
                <Button variant='Primary'>Black</Button>
              </div>
              <div className='col-3'>
                <Button variant='Primary'>Black</Button>
              </div>
              <div className='col-3'>
                <Button variant='Primary'>Black</Button>
              </div>
            </div>
            <div className='row'></div>
            <div className='row shop'>
              <div className='col-5'>
              <Button variant="Primary" className='shopbutton'  style={{display:'flex'}}>
                <div className='col-2'>
                  <img src={productpics} width='30px' className='shopimg'/>
                  </div>
                  <div className='col-10'>Shop namemu</div>
                  </Button>
              </div>
              <div className='col-4 rating'>
                <AiFillStar style={{color: "gold"}}/> 5 (19 reviews)
              </div>
              <div className='col-3'>
                <Button variant="Primary" className=''>+ Follow</Button>
              </div>
            </div>
            
          </div>
          </div>
          
        <br/>
        <hr/>
        <div className='row'>
        <p className='productDesc'>{data.Description}</p>
        </div>
        <div className='row'>
          {/* <Review ProductId = {productId}/> */}
          <StarRating ProductId = {productId}/>
          
        </div>
    </div>
    <div className='row addtocart'>
      <div className='container'>
        <div className='row' style={{margin:'0'}}>
          <div className='col-1 productcart'>
            <img src={mainImage} width='50px' className='imgcart'/>
          </div>
          <div className='col-5 productcart'>
            <p className='namecart'>{data.ProductName}</p>
          </div>
          <div className='col-2 productcart' style={{display:'flex'}}>
            <Button onClick={() => kurangin()}>-</Button>
            <p className='quantity'>{quantity}</p>
            <Button onClick={() => setQuantity(quantity+1)}>+</Button>
          </div>
          <div className='col-2 productcart'>
            <p className='totalprice'>Total Price:</p>
            <p className='totalprice'>${data.Price*quantity}</p>
          </div>
          <div className='col-2 productcart'>
            <Button onClick={() => addToCart()}>Add To Cart</Button>
          </div>
        </div>
        </div>
        
            
          
            
    </div>
  </div>
  </>
  )
}

export default ProductPage