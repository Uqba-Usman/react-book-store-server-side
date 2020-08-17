import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartProduct from "./cartProduct";
import Cookies from "universal-cookie";
import Stripe from "../stripe/stripe";

const cookies = new Cookies();

const Cart = () => {
  const [data, setData] = React.useState(
    cookies.get("cart") ? cookies.get("cart") : []
  );
  // const [cookies, setCookie] = useCookies(["cart"]);

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
                        <span className="amount">{`Rs. ${calculateTotal()}`}</span>
                      </td>
                    </tr>

                    <tr>
                      <td className="cart-product-name">
                        <strong>Total</strong>
                      </td>
                      <td className="cart-product-name text-right">
                        <span className="amount color lead">
                          <strong>{`Rs. ${calculateTotal()}`}</strong>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <Link to="/checkout" className="btn icon-left float-right">
                <span>Proceed to Checkout</span>
              </Link> */}
              <Stripe amount={calculateTotal()} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
