import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Review() {
  const [rating, setRating] = useState(0);
  const [ProductId, setProductId] = useState("");
  const [specificProduct, setSpecificProduct] = useState({});

  let navigate = useNavigate()

  function getAvgRating(ProductId: any){
    fetch(`http://127.0.0.1:5000/rating/${ProductId}`)
    .then((response)  => response.json())
    .then((data) => console.log(data))
  }

  function getSpecificProduct(ProductId: any){
    fetch(`http://127.0.0.1:5000/product/${ProductId}`)
    .then((response:any)  =>response.json())
    .then((data:any) => {
      console.log(data)
      setSpecificProduct(data)
    })
  }

  
  function giveRating() {
    const data = {
        product_id: ProductId,
        review_description: "BANGSAT",
        review_rating: rating,
        user_id: 2
    }
    fetch(`http://127.0.0.1:5000/giverating/${ProductId}`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then((response) => {
    response.json()
    getSpecificProduct(ProductId)
  })
  .then((data) => {
    const avgRating:any = getAvgRating(ProductId)
    console.log("Success:", data)
    setSpecificProduct({
      ...specificProduct,
      AvgRating: avgRating
    })
})
.then(() =>
{navigate('/')
})
  .catch((error) => {
    console.error("Error:", error);
  });
}

  return (
    <div>
      Put your review Here
      <br/>
      <input
        type="text"
        placeholder="Input Product ID"
        onChange={(e: any) => setProductId(e.target.value)}
      />
      <br/>
      <input
        type="text"
        placeholder="Give Rating"
        onChange={(e: any) => setRating(e.target.value)}
      />
      <br/>
      <button onClick={() => giveRating()}>Add Review</button>
    </div>
  );
}

export default Review;
