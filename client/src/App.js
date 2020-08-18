import React from "react";
import "./App.css";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
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

        <Switch>
          <Route path="/admin-dashboard" component={AdminDashboard} exact />
          <Route path="/books/update/:id" component={UpdateBook} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/newBook" component={NewBook} exact />
          <Route path="/checkout" component={Checkout} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/bookDetail/:id" component={BookDetail} exact />
          <Route path="/" component={Blogs} exact />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
