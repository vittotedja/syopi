import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Success(){
    let navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [stripeData, setStripeData] = useState(Object);
    const searchTerm = searchParams.get("payment_intent") || "";

    const fetchProductDetails = (productId:string) => {
        fetch(`http://localhost:5000/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
            // fetch(`http://localhost:5000/shop/${data.ShopId}`)
            // .then((response) => response.json())
            // .then((shopData) => {
            //     return {...data, shopName: shopData.name}
            // })
            return data
        })
    }

    function addOrder(data:Object) {
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
                    addOrder({OrderId: searchTerm,
                            ProductId: item,
                            ShopId: productData.ShopId,
                            Quantity: orderedItems[item],
                            Price: (productData.price * orderedItems[item]).toFixed(2),
                            UserId: "1"})
                }
                product()
            }
        })
    }

    useEffect(() => {
        getStripeData()
    }, [])

    // useEffect(() => {
    //     console.log(stripeData)
    //     const orderedItems = stripeData.metadata    
    //     for (let item in orderedItems) {
    //         const product = fetchProductDetails(item)
    //         addOrder({OrderId: searchTerm,
    //                 ProductId: item,
    //                 ShopId: product.ShopId,
    //                 Quantity: orderedItems[item],
    //                 Price: (product.price * orderedItems[item]).toFixed(2),
    //                 UserId: "1"})
    //     }
    // }, [stripeData])
    
    return(
    <>
    Your Payment is Successful
    Recommended Products for You
    {searchTerm}

    <button onClick={() => navigate('/')}>Back to Home</button>
    </>)
}