import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

const SingleBook = ({ book }) => {
  return (
    <Grid item xs={3}>
      <div className="grid-item">
        <div className="product">
          <div className="product-image">
            <Link to={`/bookDetail/${book.isbn}`}>
              <img src="polo/images/shop/products/1.jpg"></img>
            </Link>
            <Link to={`/bookDetail/${book.isbn}`}>
              <img src="polo/images/shop/products/10.jpg"></img>
            </Link>
            {/* <span className="product-new">NEW</span> */}
            <span className="product-wishlist">
              <Link to="#">
                <i className="fa fa-heart"></i>
              </Link>
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
              <ins>{`Rs. ${book.price}`}</ins>
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
    </Grid>
  );
};

export default SingleBook;
