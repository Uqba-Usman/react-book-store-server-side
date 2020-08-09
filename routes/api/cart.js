var express = require("express");
var router = express.Router();
var Cookies = require("universal-cookie");

router.post("/:id", (req, res) => {
  const isbn = req.params.id;
  console.log(isbn);
  const qty = req.body.quantity;
  console.log(qty);
  let sql = `SELECT * FROM booksinfo WHERE isbn = ${isbn} `;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      return res.send("No book with such id");
    }
    console.log(result[0].title);
    let cart = [];
    if (req.cookies.cart) cart = req.cookies.cart;
    console.log("REQCookiesCart", req.cookies.cart);
    let newCart = { ...result[0], qty };

    if (cart.some((exist) => exist.isbn === newCart.isbn)) {
      var index = cart.findIndex((c) => c.isbn == newCart.isbn);
      console.log("Book already exist in cart at index", index);
      if (cart[index].qty == newCart.qty) {
        console.log("Quantity is Same");
        return res.send(cart);
      } else if (cart[index].qty != newCart.qty) {
        console.log("Quantity is not Same");
        cart[index] = newCart;
        res.cookie("cart", cart);
        console.log(cart);
        return res.send(cart);
      }
    }

    cart.push(newCart);
    console.log(cart);
    res.cookie("cart", cart);
    res.send(cart);
  });
});

// router.get("/remove/:id", (req, res, next) => {
//   let cart = [];
//   if (req.cookies.cart) cart = req.cookies.cart;
//   cart.splice(
//     cart.findIndex((c) => c.isbn == req.params.id),
//     1
//   );
//   res.cookie("cart", cart);
//   res.send(cart);
// });

router.get("/", (req, res, next) => {
  const cookies = new Cookies(req.headers.cookie);
  const cart = cookies.get("cart");
  console.log("Cart", cart);
  res.send(cart);
});
module.exports = router;
