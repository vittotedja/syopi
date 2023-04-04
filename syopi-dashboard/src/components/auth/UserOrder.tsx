import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Review from "../Review/Review";
import "./UserOrder.css";
import RatingPrompt from "./RatingPrompt";
import Card from 'react-bootstrap/Card';
import IndivProduct from "./IndivProduct";

export default function UserOrder(props:any) {
  const [show, setShow] = useState(false);
  const [isClicked, setIsClicked] = useState(0);
  const [image, setImage] = useState("")
  const [isHovering, setIsHovering] = useState(0);
  const [productName, setProductName] = useState('');
  const [shopData, setShopData] = useState(Object);
  const [productInOrder, setProductInOrder] = useState([]);
  const [review, setReview] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleRating = (rate:number) => setIsClicked(rate);

  const fetchShopData = () => {
    fetch(`http://127.0.0.1:5005/shop/getshopbyid/${props.ShopId}`)
    .then((response) => response.json())
    .then((data) => {
      setShopData(data.data[0])
    })
  }

  const fetchProductData = () => {
    fetch(`http://127.0.0.1:5002/product/${props.ProductId}`)
    .then((response) => response.json())
    .then((data) => {
      setProductName(data[0].ProductName)
      setImage(data[0].ImageUrls[0].ImageUrl)
    })
  }

  const fetchOrderByOrderId = () => {
    fetch(`http://127.0.0.1:5001/order/find_by_orderid/${props.OrderId}`)
    .then((response) => response.json())
    .then((data) => {
      setProductInOrder(data)
    })
  }

  const fetchReview = () => {
    fetch(`http://127.0.0.1:5003/review/getreview/${props.ProductId}/${props.OrderId}`)
    .then((response) => response.json())
    .then((data) => {
      setReview(data)
      console.log(data)
    })
  }



  useEffect(() => {
    fetchShopData()
    fetchProductData()
    fetchOrderByOrderId()
    fetchReview()
  }, [])

  return (
    <>
    <Card className='order-card-user'>
      <Card.Header className='order-card-user-header'>
        <div className='row' style={{margin:'0'}}>
          <div className='col-6'>
          {props.OrderId} / {props.DateTime.slice(0,10)}, {props.DateTime.slice(12,16)} / {shopData.ShopName} 
          </div>
          <div className='col-6' style={{textAlign:'right'}}>
            {props.OrderStatus}
          </div>
        </div>
        
      </Card.Header>
      {productInOrder? productInOrder.map((product:any) => {
        return (
          <IndivProduct
          key = {product.ProductId}
          ProductId={product.ProductId}
          Quantity = {product.Quantity}
          Price = {product.Price}
          Image = {image}
        />
        )
      }):null}

      
      <Card.Footer>
        <div className='row' style={{margin:'0'}}>
          <div className='col-11 seller-grid' style={{textAlign:'right'}}>
            <p>Total Price:</p>
            <p className='total-price-user'>S$ {props.Price}</p>
          </div>
          <div className='col-1 seller-grid' style={{padding:'0'}}>
            {!review[0] ?<button onClick={handleShow}>Review</button>:<p className="text-red-600">{review[0].Rating} Star</p>}
          </div>
        </div>
      </Card.Footer>
    </Card>
      


      <Modal show={show} onHide={handleClose}  size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Review OrderID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productInOrder? productInOrder.map((product:any) => {
            return(
              <RatingPrompt
              isClicked = {isClicked}
              setIsClicked = {setIsClicked}
              ProductName = {productName}
              ProductId = {props.ProductId}
              OrderId = {props.OrderId}
              Quantity = {props.Quantity}
              Price = {props.Price}
              Image = {image}
              key = {`${props.ProductId}-${props.OrderId}`}/>
            )
          }):null}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Done</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
