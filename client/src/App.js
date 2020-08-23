import React from "react";
import "./App.css";

import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Header from "./components/header";
import Blogs from "./components/Blogs";
import BookDetail from "./components/bookDetail";
import Checkout from "./components/checkout/checkout";
import Footer from "./components/footer";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import NewBook from "./components/books/newBook";
import Appbar from "./components/appBar";
import Cart from "./components/cart/cart";
import Stripe from "./components/stripe/stripe";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateBook from "./components/books/updateBook";
import AdminDashboard from "./components/adminTable/adminDashboard";
import axios from "axios";
import DownloadBook from "./components/download/DownloadBook";
import AdminLogin from "./components/adminTable/adminLogin";
import userService from "./services/UserService";
import AdminMain from "./components/adminTable/adminMain";
import UserFavourites from "./components/userFavourites";

function App() {
  // const [products, setProducts] = React.useState([]);
  // React.useEffect(() => {
  //   axios
  //     .get("/api/products")
  //     .then((res) => setProducts(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="App">
      {/* <ul>
        {products.map((p, index) => (
          <li key={index}>{p}</li>
        ))}
      </ul> */}
      <Router>
        <ToastContainer />
        <Appbar />
        {/* <section
          id="page-title"
          class="text-light"
          data-bg-parallax="polo/images/parallax/6.jpg"
        >
          <div class="container">
            <div class="page-title">
              <h1>Portfolio Grid</h1>
            </div>
            <div class="breadcrumb">
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Portfolio</a>
                </li>
                <li class="active">
                  <a href="#">Three Columns</a>
                </li>
              </ul>
            </div>
          </div>
        </section> */}

        <Switch>
          {userService.isAdmin() && (
            <Route path="/admin-dashboard" component={AdminMain} exact />
          )}
          {userService.isAdmin() && (
            <Route path="/books/update/:id" component={UpdateBook} exact />
          )}
          {userService.getLoggedInUser && (
            <Route path="/favourites" component={UserFavourites} exact />
          )}

          <Route path="/books/download" component={DownloadBook} exact />
          <Route path="/admin/login" component={AdminLogin} exact />
          <Route path="/admin/main" component={AdminMain} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          {userService.isAdmin() && (
            <Route path="/newBook" component={NewBook} exact />
          )}
          <Route path="/cart" component={Cart} exact />
          <Route path="/bookDetail/:id" component={BookDetail} exact />
          <Route path="/" component={Blogs} exact />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
