import React from "react";
import { Link } from "react-router-dom";
import CheckoutProduct from "./checkoutProduct";
import Cookies from "universal-cookie";
import ShippingForm from "./shippingForm";

const cookies = new Cookies();

const Checkout = () => {
  const [data, setData] = React.useState(cookies.get("cart"));

  const calculateTotal = () => {
    var total = 0;
    data.map((b) => {
      total += Number(b.price) * Number(b.quantity);
    });
    return total;
  };

  return (
    <div>
      <section id="shop-checkout">
        <div className="container">
          <div className="shop-cart">
            <div className="row">
              <ShippingForm />

              <div className="col-lg-6">
                <div className="col-lg-12">
                  <h4 className="upper">Payment Method</h4>
                  <div className="list-group">
                    <input
                      type="radio"
                      name="RadioInputName"
                      value="Value1"
                      id="Radio1"
                    />
                    <label className="list-group-item" for="Radio1">
                      Direct Bank Transfer
                    </label>
                    <input
                      type="radio"
                      name="RadioInputName"
                      value="Value2"
                      id="Radio2"
                    />
                    <label className="list-group-item" for="Radio2">
                      Cheque Payment
                    </label>
                    <input
                      type="radio"
                      name="RadioInputName"
                      value="Value3"
                      id="Radio3"
                    />
                    <label className="list-group-item" for="Radio3">
                      <img
                        width="90"
                        src="polo/images/shop/paypal-logo.png"
                      ></img>
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <Link className="btn icon-left float-right mt-3" to="#">
                    <span>Proceed to PayPal</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="seperator">
              <i className="fa fa-credit-card"></i>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <h4 className="upper">Your Order</h4>
                <div className="table table-sm table-striped table-responsive table table-bordered table-responsive">
                  <table className="table m-b-0">
                    <thead>
                      <tr>
                        <th className="cart-product-thumbnail">Product</th>
                        <th className="cart-product-name">Description</th>
                        <th className="cart-product-thumbnail">Quantity</th>
                        <th className="cart-product-subtotal">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((book, index) => (
                        <CheckoutProduct key={index} book={book} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <h4>Order Total</h4>
                      <table className="table">
                        <tbody>
                          <tr>
                            <td className="cart-product-name">
                              <strong>Order Subtotal</strong>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
