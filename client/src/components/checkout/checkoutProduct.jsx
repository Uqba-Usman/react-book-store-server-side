import React from "react";

const CheckoutProduct = ({ book }) => {
  return (
    <tr>
      <td className="cart-product-thumbnail">
        <div className="cart-product-thumbnail-name">{book.title}</div>
      </td>
      <td className="cart-product-description">
        <p>{book.description}</p>
      </td>
      <td className="cart-product-description">
        <p>{book.quantity}</p>
      </td>
      <td className="cart-product-subtotal">
        <span className="amount">
          {Number(book.price) * Number(book.quantity)}
        </span>
      </td>
    </tr>
  );
};

export default CheckoutProduct;
