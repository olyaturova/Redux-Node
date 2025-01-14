import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { getTotalPrice} from "../redux/cartSlice";
import { useSelector} from "react-redux";


export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = useSelector(getTotalPrice);
  const amount = totalPrice * 100;
  const [messageSuccess, setMessageSucces] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8000/stripe/charge",
          {
            amount: amount,
            id: id,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
          setMessageSucces(true)
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="card">
      {!messageSuccess ?
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement />
      <button>Pay</button>
    </form>
:
    <div>
      <h2>Yuor payment was successful!</h2>
      <p>Enjoy your purchase!</p>
    </div>
}
    </div>
      
  );
};