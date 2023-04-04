import productpics from "../../assets/logofornow.jpg";
import "./ProductPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { AiFillStar } from "react-icons/ai";

function ProductPage() {
  let { productId } = useParams();
  const [data, setData] = useState(Object);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string>("");
  const [shopName, setShopName] = useState<string>("Your Shop Name");

  function fetchData() {
    fetch(`http://127.0.0.1:5002/product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data[0]);
        setMainImage(data[0].ImageUrls[0].ImageUrl);
        fetch(`http://127.0.0.1:5005/shop/getshopbyid/${data[0].ShopId}`)
          .then((response) => response.json())
          .then((data) => setShopName(data.data[0].ShopName));
      })
    }

  function addToCart() {
    const sentData = {
      ProductId: productId,
      Quantity: quantity,
    };
    fetch(`http://127.0.0.1:5007/cart/tambahcart/${productId}/${quantity}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function kurangin() {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="container">
          <div className="directory">
            <a href="/">Home</a> &#62; <a href="/shop">{data.Category}</a> &#62;{" "}
            <a href={`/product/${productId}`}>{data.ProductName}</a>
          </div>
          <div className="row">
            <div className="col-6 productimg">
              <img src={mainImage} width="60%" style={{ display: "initial" }} />
              {/* Should have been a carousel but idk why it doesnt work */}
            </div>
            <div className="col-6 productDetail">
              <p className="productName">{data.ProductName}</p>
              <div className="rating-row">
                <div className="col-3">Sold {data.AmountSold}</div>
                <div className="col-2 rating">
                  <AiFillStar style={{ color: "gold" }} /> {data.AvgRating}
                </div>
                <div className="col-3">
                  <a href="#review">Review 40+</a>
                </div>
              </div>
              <div className="row productPrice">
                <p style={{ backgroundColor: "#F2EDE4" }} className="text-red-600">$ {data.Price}</p>
              </div>

              {/* <div className='row'>
            <p style={{fontWeight:'bold'}}>Colour</p>
            </div>
            <div className='row'>
              <div className='col-3'>
                <button>Black</button>
              </div>
              <div className='col-3'>
                <button>Black</button>
              </div>
              <div className='col-3'>
                <button>Black</button>
              </div>
              <div className='col-3'>
                <button>Black</button>
                <button>Black</button>
              </div>
            </div> */}
              <div className="row"></div>
              <div className="row"></div>
              <div className="row"></div>
              <div className="row shop flex align-middle">
                <div className="col-8">
                  <div className="shopbutton" style={{ display: "flex", cursor: 'pointer', alignItems:'center'}}>
                    <div className="col-2">
                      <img src={productpics} width="30px" className="shopimg" />
                    </div>
                    {/* <div className="col-10 text-red-600">Buy your things here</div> */}
                    <div className="col-10">
                      {shopName}
                    </div>
                  </div>
                </div>
                {/* <div className="col-4 rating">
                  <AiFillStar style={{ color: "gold" }} /> 5 (19 reviews)
                </div> */}
                {/* <div className="col-3">
                  <button className="">+ Follow</button>
                </div> */}
              </div>
            </div>
          </div>

          <br />
          <hr />
          <div className="row">
            <p className="productDesc">{data.Description}</p>
          </div>
        </div>
        <div className="row addtocart">
          <div className="container">
            <div className="row" style={{ margin: "0" }}>
              <div className="col-1 productcart">
                <img src={mainImage} width="50px" className="imgcart" />
              </div>
              <div className="col-5 productcart">
                <p className="namecart">{data.ProductName}</p>
              </div>
              <div className="col-2 productcart" style={{ display: "flex" }}>
                <button onClick={() => kurangin()}>-</button>
                <p className="quantity">{quantity}</p>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <div className="col-2 productcart">
                <p className="totalprice">Total Price:</p>
                <p className="totalprice">${data.Price * quantity}</p>
              </div>
              <div className="col-2 productcart">
                <button onClick={() => addToCart()}>Add To Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
