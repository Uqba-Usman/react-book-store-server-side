import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Stripe = ({ amount }) => {
  const [product, setProduct] = React.useState({
    name: "UUTT Book Store",
    price: Number(amount),
    productBy: "UUTT Book Store",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return axios
      .post("http://localhost:4500/api/stripe", body)
      .then((res) => {
        console.log("Res", res);
        const { status } = res;
        console.log("Status", status);
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };
  return (
    <StripeCheckout
      //   stripeKey={process.env.REACT_APP_KEY}
      stripeKey="pk_test_7O7L2gvc9YEZ3Mdta6v0QtoO00yBNxrDXu"
      token={makePayment}
      amount={product.price * 100}
      shippingAddress
      billingAddress
      name="UUTT Book Store"
    >
      <button className="btn">Download</button>
    </StripeCheckout>
  );
};

export default Stripe;
