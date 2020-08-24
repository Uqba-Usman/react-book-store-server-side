import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import stripeService from "../../services/StripeService";
import userService from "../../services/UserService";
import { Redirect } from "react-router";
import Cookies from "universal-cookie";
import downloadService from "../../services/DownloadService";
import fileDownload from "js-file-download";
const cookies = new Cookies();

const Stripe = ({ amount, buttonDisabled }) => {
  const [product, setProduct] = React.useState({
    name: "UUTT Book Store",
    price: Number(amount),
    productBy: "UUTT Book Store",
  });
  const [booksData, setBookData] = React.useState(
    cookies.get("cart") ? cookies.get("cart") : []
  );

  React.useEffect(() => {}, []);

  const makePayment = (token) => {
    const body = {
      token,
      product,
      email: userService.getLoggedInUser().email,
      books: booksData,
    };
    console.log("BODY", booksData);
    const headers = {
      "Content-Type": "application/json",
    };

    return stripeService
      .postStripe(body)
      .then((res) => {
        console.log("Res", res);
        const { status } = res;
        console.log("Status", status);
        console.log("InsideBODY", booksData);
        booksData.map(async (b, index) => {
          try {
            console.log("BDB", body.books[0]);
            let data = {
              isbn: b.isbn,
            };
            console.log("BDB", data);
            const bookRes = await downloadService.downloadBook(data);
            console.log("Book Download", bookRes);
            fileDownload(res, "Book.pdf");
            window.location.href = "/";
          } catch (error) {
            console.log("Download Error", error);
          }
        });
        // window.location.href = "/books/download";
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
