import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import stripeService from "../../services/StripeService";
import userService from "../../services/UserService";
import { Redirect } from "react-router";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Stripe = ({ amount, buttonDisabled }) => {
  const [product, setProduct] = React.useState({
    name: "UUTT Book Store",
    price: Number(amount),
    productBy: "UUTT Book Store",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
      email: userService.getLoggedInUser().email,
      books: cookies.get("cart"),
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return stripeService
      .postStripe(body)
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
      <button className="btn" disabled={buttonDisabled}>
        Checkout
      </button>
    </StripeCheckout>
  );
};

export default Stripe;
