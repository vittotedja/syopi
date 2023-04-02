import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Success(){
    let navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    // const [stripeData, setStripeData] = useState(Object);
    const searchTerm = searchParams.get("payment_intent") || "";

    async function addOrder(data:Object) {
        fetch('http://127.0.0.1:5000/order/create_order', {
            method:'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {console.log(data)})
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    function getStripeData() {
        fetch(`http://localhost:5000/retrieve-payment-intent/${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
            const orderedItems = data.metadata
            for (let item in orderedItems) {
                const product = async () => {
                    const response = await fetch(`http://localhost:5000/product/${item}`)
                    const productData = await response.json()
                    const usedData = productData[0]
                    const shopId = usedData.ShopId
                    const price = usedData.Price
                    addOrder({OrderId: searchTerm,
                            ProductId: item,
                            ShopId: shopId,
                            Quantity: orderedItems[item],
                            Price: (price * orderedItems[item]).toFixed(2),
                            UserId: "1"})
                }
                product()
            }
        })
    }

    useEffect(() => {
        getStripeData()
    }, [])
    
    return(
    <>
    Your Payment is Successful
    <br/>
    Your Order Id is: {searchTerm}
    <br/>
    <button onClick={() => navigate('/')}>Back to Home</button>
    </>)
}