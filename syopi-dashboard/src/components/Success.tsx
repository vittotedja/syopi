import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Navbar.css'

export default function Success(){
    let navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    // const [stripeData, setStripeData] = useState(Object);
    const searchTerm = searchParams.get("payment_intent") || "";

    async function addOrder(data:Object) {
        fetch('http://127.0.0.1:5001/order/create_order', {
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

    async function clearCart(productIds:any) {
        try {
            const response = await fetch('http://127.0.0.1:5007/cart/clear/1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product_ids: productIds }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                console.log('Selected items removed from cart.');
            } else {
                console.error('Failed to remove items from cart:', data.message);
            }
        } catch (error) {
            console.error('Error removing items from cart:', error);
        }
    }

    

    function getStripeData(searchTerm:any) {
        fetch(`http://127.0.0.1:5011/stripe/retrieve-payment-intent/${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
            const orderedItems = data.metadata
            const productIdsToClear = Object.keys(orderedItems);
            for (let item in orderedItems) {
                const product = async () => {
                    const response = await fetch(`http://127.0.0.1:5002/product/${item}`)
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
            console.log(productIdsToClear)
            clearCart(productIdsToClear);
        })
    }

    useEffect(() => {
        getStripeData(searchTerm)
    }, [])
    
    return(
    <>
    <div className='seller-container'>
        <div className='row success-box'>
            <div className='col-12'>
                <p className='success-word'>Your Payment is Successful</p>
            </div>
        </div>
    </div>
    
    <br/>
    Your Order Id is: {searchTerm}
    <br/>
    <button onClick={() => navigate('/')}>Back to Home</button>
    </>)
}