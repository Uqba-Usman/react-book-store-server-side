import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const CartProductCopy = ({ book }) => {
  const [quantity, setQuantity] = React.useState(book.quantity);

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
  return (
    <tr>
      <td className="cart-product-remove">
        <Link href="#">
          <i className="fa fa-times"></i>
        </Link>
      </td>
      <td className="cart-product-thumbnail">
        <Link href="#">
          <img src="polo/images/shop/products/1.jpg" alt={book.title}></img>
        </Link>
        <div className="cart-product-thumbnail-name">{book.title}</div>
      </td>
      <td className="cart-product-description">
        <p>
          <span>{book.description}</span>
        </p>
      </td>
      <td className="cart-product-price">
        <span className="amount">{book.price}</span>
      </td>
      <td className="cart-product-quantity">
        <div className="quantity">
          <input
            type="button"
            className="minus"
            value="-"
            onClick={handleDecrement}
          ></input>
          <input
            type="text"
            className="qty"
            name="quantity"
            value={quantity}
          ></input>
          <input
            type="button"
            className="plus"
            value="+"
            onClick={handleIncrement}
          ></input>
        </div>
      </td>
      <td className="cart-product-subtotal">
        <span className="amount">{book.price}</span>
      </td>
    </tr>
  );
};

export default CartProductCopy;
