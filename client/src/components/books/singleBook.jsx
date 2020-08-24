import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import userService from "../../services/UserService";
import favouritesService from "../../services/FavouritesService";

const SingleBook = ({ book }) => {
  const handleFavourites = (isbn) => {
    const email = userService.getLoggedInUser().email;
    console.log("FAVOURITES", isbn, email);
    const data = {
      email: email,
      isbn: isbn,
    };
    favouritesService
      .addFavourites(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="grid-item">
        <div className="product">
          <div className="product-image">
            <Link to={`/bookDetail/${book.isbn}`}>
              <img src="polo/images/1.jpg"></img>
            </Link>
            <Link to={`/bookDetail/${book.isbn}`}>
              <img src="polo/images/2.jpg"></img>
            </Link>
            {/* <span className="product-new">NEW</span> */}
            <span className="product-wishlist">
              {userService.getLoggedInUser() && (
                <Link onClick={() => handleFavourites(book.isbn)} to="#">
                  <i className="fa fa-heart"></i>
                </Link>
              )}
            </span>
            <div className="product-overlay">
              <Link to={`/bookDetail/${book.isbn}`}>Quick View</Link>
            </div>
          </div>
          <div className="product-description">
            <div className="product-category">{book.category}</div>
            <div className="product-title">
              <h3>
                <Link to={`/bookDetail/${book.isbn}`}>{book.title}</Link>
              </h3>
            </div>
            <div className="product-price">
              <ins>{`${book.price}$`}</ins>
            </div>
            <div className="product-rate">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
            </div>
            <div className="product-reviews">
              <Link
                to={`/bookDetail/${book.isbn}`}
                className="btn btn-coloured"
              >
                Buy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
