import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./auth/Context.jsx";

export default function Success() {
    const { user } = useAuth();
    let navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [orderedItemsInfo, setOrderedItemsInfo] = useState([]);
    const [orderTotal, setOrderTotal] = useState()
    const userEmail = user.email;
    const userName = user.user_metadata.full_name;
    const searchTerm = searchParams.get("payment_intent") || "";

    async function addOrder(itemInfo) {
        try {
            const response = await fetch("http://127.0.0.1:5001/order/create_order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemInfo),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function clearCart(productIds) {
        try {
            const response = await fetch("http://127.0.0.1:5007/cart/clear/1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ product_ids: productIds }),
            });
            const data = await response.json();
            if (data.status === "success") {
                console.log("Selected items removed from cart.");
            } else {
                console.error("Failed to remove items from cart:", data.message);
            }
        } catch (error) {
            console.error("Error removing items from cart:", error);
        }
    }

    async function sendOrderInfo(orderedItemsInfo) {
        try {
            const orderInfo = {
                order: orderedItemsInfo,
                email: userEmail,
                username: userName,
                orderTotal: orderTotal,
                code: searchTerm ? 200 : 400,
            };
            const response = await fetch("http://127.0.0.1:5001/order/send_email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderInfo),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error sending order info:", error);
        }
    }

    async function getStripeData(searchTerm: any) {
        try {
            const response = await fetch(
                `http://127.0.0.1:5011/stripe/retrieve-payment-intent/${searchTerm}`
            );

            const data = await response.json();
            const orderedItems = data.metadata;
            const productIdsToClear = Object.keys(orderedItems);
            let total = 0;

            const orderedItemsInfo: any[] = [];
            for (const item in orderedItems) {
                const productResponse = await fetch(
                    `http://127.0.0.1:5002/product/${item}`
                );
                const productData = await productResponse.json();
                const usedData = productData[0];
                const shopId = usedData.ShopId;
                const price = usedData.Price;
                const productName = usedData.ProductName
                const itemTotal = price * orderedItems[item];
                total += itemTotal;

                const itemInfo = {
                    OrderId: searchTerm,
                    ProductId: item,
                    ShopId: shopId,
                    Quantity: orderedItems[item],
                    Price: (price * orderedItems[item]).toFixed(2),
                    UserId: "1",
                };
                orderedItemsInfo.push(itemInfo);
                addOrder(itemInfo);
            }

            setOrderTotal(total.toFixed(2));
            setOrderedItemsInfo(orderedItemsInfo);

            const orderInfo = {
                order: orderedItemsInfo,
                email: userEmail,
                username: userName,
                orderTotal: orderTotal,
                code: searchTerm ? 200 : 400,
            };
            await fetch("http://127.0.0.1:5001/order/send_email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderInfo),
            });

            clearCart(productIdsToClear);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getStripeData(searchTerm)
    }, [])

    return (
        <>
            <div className='seller-container'>
                <div className='row success-box'>
                    <div className='col-12'>
                        <p className='success-word'>Your Payment is Successful</p>
                    </div>
                </div>
            </div>

            <br />
            Your Order Id is: {searchTerm}
            <br />
            <button onClick={() => navigate('/')}>Back to Home</button>
        </>)
}