import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import './stripe.css'
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MrgP0BJIMpkY9J2Hn4a7X0G9JqLZm5LqCLriBGyBvOmL2G1V03TY7yX1xOhCn0XZI9VBQr5b91ntGsR3LmbjtPt00eDbaMBqL");

export default function Stripe(props:any) {
  const [clientSecret, setClientSecret] = useState("");
  console.log(JSON.stringify({ items: props.data }));
  // console.log(JSON.stringify({ items: [{ id: "xl-tshirt", qty: 1 }] }))
  // body: JSON.stringify({ items: props.data }),


  // console.log(props.data)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://127.0.0.1:5011/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: props.data }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}