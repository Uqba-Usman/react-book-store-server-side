import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CartProduct from "./cartProduct";
import Cookies from "universal-cookie";
import Stripe from "../stripe/stripe";
import userService from "../../services/UserService";
import StripeCheckout from "react-stripe-checkout";

const cookies = new Cookies();

const Cart = () => {
  const [data, setData] = React.useState(
    cookies.get("cart") ? cookies.get("cart") : []
  );
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  // const [cookies, setCookie] = useCookies(["cart"]);

  React.useEffect(() => {
    userService.isLoggedIn() || data.length === 0
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  }, []);

  const handleButton = () => {
    console.log("Button");
    console.log("Cookies", data);
  };
  const calculateTotal = () => {
    var total = 0;
    data.map((b) => {
      total += Number(b.price) * Number(b.quantity);
    });
    return total;
  };
  const handleCheckout = () => {
    // userService.isLoggedIn() ? (
    // <Stripe amount={calculateTotal()} />;
    // ) : (
    //   <Redirect to="/login" />
    // );
  };

  return (
    <section id="shop-cart">
      <div className="container">
        <div className="shop-cart">
          <div className="table table-sm table-striped table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th className="cart-product-remove"></th>
                  <th className="cart-product-thumbnail">Product</th>
                  <th className="cart-product-name">Author</th>
                  <th className="cart-product-price">Unit Price</th>
                  <th className="cart-product-subtotal">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <p> No book in your cart</p>
                ) : (
                  data.map((book, index) => (
                    <CartProduct key={index} book={book} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-lg-6"></div>
            <div className="col-lg-6 p-r-10 ">
              <div className="table-responsive">
                <h4>Cart Subtotal</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <td className="cart-product-name">
                        <strong>Cart Subtotal</strong>
                      </td>
                      <td className="cart-product-name text-right">
                        <span className="amount">{`${calculateTotal()}$`}</span>
                      </td>
                    </tr>

                    <tr>
                      <td className="cart-product-name">
                        <strong>Total</strong>
                      </td>
                      <td className="cart-product-name text-right">
                        <span className="amount color lead">
                          <strong>{`${calculateTotal()}$`}</strong>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Stripe
                amount={calculateTotal()}
                buttonDisabled={buttonDisabled}
              />
              {!userService.isLoggedIn() && (
                <div class="col-sm-12 pb-3">
                  <div class="row">
                    <div class="col-lg-12">
                      <h4 class="upper">
                        <a
                          class="collapsed"
                          href="#collapseFour"
                          data-toggle="collapse"
                          aria-expanded="false"
                          style={{ fontSize: 16 }}
                        >
                          Kindly Login First to Enable Checkout
                          <i class="icon-arrow-down-circle"></i>
                        </a>
                      </h4>
                    </div>
                    <div class="col-lg-12">
                      <div
                        class="panel-collapse collapse"
                        id="collapseFour"
                        aria-expanded="false"
                      >
                        <Link to="/login" className="btn icon-left float-left">
                          <span>Login</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
