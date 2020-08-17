import React from "react";
import { Link, Redirect } from "react-router-dom";
// import Cookies from "js-cookie";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const BookDetail = (props) => {
  // const books = [
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "1" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "2" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "3" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "4" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "5" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "6" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "7" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "8" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "9" },
  // ];

  const [book, setBook] = React.useState([]);
  // const [cart, setCart] = React.useState([]);

  const getData = () => {
    axios
      .get("http://localhost:4500/api/books/" + props.match.params.id)
      .then((res) => {
        setBook(res.data);
        console.log(book);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(getData, []);
  const [quantity, setQuantity] = React.useState(1);
  const handleIncrement = () => {
    const inc = quantity + 1;
    setQuantity(inc);
  };
  const handleDecrement = () => {
    if (Number(quantity) === 1) return;
    const dec = quantity - 1;

    setQuantity(dec);
    console.log(quantity);
  };

  const handleCart = () => {
    var cart = [];
    if (cookies.get("cart")) cart = cookies.get("cart");
    const newCart = { ...book, quantity };

    if (cart.some((exist) => exist.isbn === newCart.isbn)) {
      var index = cart.findIndex((c) => c.isbn == newCart.isbn);
      console.log("Book already exist in cart at index", index);
      if (cart[index].quantity == newCart.quantity) {
        console.log("Quantity is Same", props);
        return props.history.push("/cart");
      } else if (cart[index].quantity != newCart.quantity) {
        console.log("Quantity is not Same");
        cart[index] = newCart;
        cookies.set("cart", cart, { path: "/" });
        return props.history.push("/cart");
      }
    }

    cart.push(newCart);
    cookies.set("cart", cart, { path: "/" });

    const saveCookieData = cookies.get("cart");
    console.log("saveCookieData", saveCookieData);
    return props.history.push("/cart");
  };
  return (
    <section className="sidebar-right" id="page-content">
      <div className="container">
        <div className="row">
          <div className="content col-lg-9">
            <div className="product">
              <div className="row m-b-40">
                <div className="col-lg-5">
                  <div className="product-image">
                    {/* /polo/images/shop/products/product-large */}
                    <Link
                      to="#"
                      data-lightbox="image"
                      title="Shop product image!"
                    >
                      <img src="/polo/images/shop/products/1.jpg" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="product-description">
                    <div className="product-category">{book.category}</div>
                    <div className="product-title">
                      <h3>
                        <a to="#">{book.title}</a>
                      </h3>
                    </div>
                    <div className="product-price">
                      <ins>{`Rs.${book.price}`}</ins>
                    </div>
                    <div className="product-rate">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star-half-o"></i>
                    </div>
                    <div className="product-reviews">
                      <a to="#">3 customer reviews</a>
                    </div>
                    <div className="seperator m-b-10"></div>
                    <p>{book.description}</p>
                    <div className="product-meta">
                      <p>{book.author}</p>
                    </div>
                    <div className="seperator m-t-20 m-b-10"></div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8"></div>
                    <div className="col-lg-4">
                      <h6>Add to Cart</h6>
                      <Link className="btn" to="/cart" onClick={handleCart}>
                        Add to cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar col-lg-3">
            <div className="widget clearfix widget-archive">
              <h4 className="widget-title">Product categories</h4>
              <ul className="list list-lines">
                <li>
                  <a to="#">Bags</a>
                  <span className="count">(6)</span>
                </li>
                <li>
                  <a to="#">Jeans</a>
                  <span className="count">(8)</span>
                </li>
                <li>
                  <a to="#">Shoes</a>
                  <span className="count">(7)</span>
                </li>
                <li>
                  <a to="#">Sweaters</a>
                  <span className="count">(7)</span>
                </li>
                <li>
                  <a to="#">T-Shirts</a>
                  <span className="count">(9)</span>
                </li>
                <li>
                  <a to="#">Tops</a>
                  <span className="count">(10)</span>
                </li>
                <li>
                  <a to="#">Women</a>
                  <span className="count">(25)</span>
                </li>
              </ul>
            </div>
            <div className="widget clearfix widget-shop">
              <h4 className="widget-title">Latest Products</h4>
              <div className="product">
                <div className="product-image">
                  <a to="#">
                    <img src="/polo/images/shop/products/10.jpg" />
                  </a>
                </div>
                <div className="product-description">
                  <div className="product-category">Women</div>
                  <div className="product-title">
                    <h3>
                      <a to="#">Bolt Sweatshirt</a>
                    </h3>
                  </div>
                  <div className="product-price">
                    <del>$30.00</del>
                    <ins>$15.00</ins>
                  </div>
                  <div className="product-rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div>
                </div>
              </div>
              <div className="product">
                <div className="product-image">
                  <a to="#">
                    <img src="/polo/images/shop/products/6.jpg" />
                  </a>
                </div>
                <div className="product-description">
                  <div className="product-category">Women</div>
                  <div className="product-title">
                    <h3>
                      <a to="#">Consume Tshirt</a>
                    </h3>
                  </div>
                  <div className="product-price">
                    <ins>$39.00</ins>
                  </div>
                  <div className="product-rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div>
                </div>
              </div>
              <div className="product">
                <div className="product-image">
                  <a to="#">
                    <img src="/polo/images/shop/products/7.jpg" />
                  </a>
                </div>
                <div className="product-description">
                  <div className="product-category">Man</div>
                  <div className="product-title">
                    <h3>
                      <a to="#">Logo Tshirt</a>
                    </h3>
                  </div>
                  <div className="product-price">
                    <ins>$39.00</ins>
                  </div>
                  <div className="product-rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="widget clearfix widget-newsletter">
              <form className="form-inline" method="get" action="#">
                <h4 className="widget-title">Subscribe for Latest Offers</h4>
                <small>
                  Subscribe to our Newsletter to get Sales Offers &amp; Coupon
                  Codes etc.
                </small>
                <div className="input-group">
                  <input
                    className="form-control required email"
                    type="email"
                    placeholder="Enter your Email"
                    name="widget-subscribe-form-email"
                    aria-required="true"
                  />
                  <span className="input-group-btn">
                    <button className="btn" type="submit">
                      <i className="fa fa-paper-plane"></i>
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetail;
