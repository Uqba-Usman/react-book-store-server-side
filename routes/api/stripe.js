// const uuid = require("uuid/v4");

var express = require("express");
const { stripePromise } = require("../stripe/stripePromise");
const newConn = require("../../connection/db");

var router = express.Router();

router.post("/", async (req, res) => {
  const { product, token, email, books } = req.body;
  console.log("Product", product);
  console.log("Price", product.price);
  console.log("Token", token);
  console.log("EMAIL", email);
  console.log("BOOKS", books);
  // const { email, books } = req.body;

  try {
    const promiseResult = await stripePromise(product, token);
    console.log(promiseResult);
    const database = newConn();
    try {
      const sql = "INSERT INTO payment SET ?";
      const data = {
        email: token.email,
        cardType: token.card.brand,
        totalPayment: product.price,
      };
      database.query(sql, data, (err, paymentResult) => {
        if (err) {
          console.log("ERROR", err);
          res.status(400).send("DB ERROR");
        }
        console.log("PAYMENT RESULT", paymentResult);
        try {
          const addressSQL = "INSERT INTO address SET ?";
          const addressData = {
            country: token.card.address_country,
            city: token.card.address_city,
            postalCode: token.card.address_zip,
            email: token.email,
          };
          database.query(addressSQL, addressData, (err, addressResult) => {
            if (err) {
              console.log("ERROR", err);
              res.status(400).send("DB ERROR");
            }
            console.log("Address RESULT", addressResult);
            books.forEach((b) => {
              console.log("INSIDE");
              try {
                const userGallerySql = "INSERT INTO usergallery SET ?";
                const galleryData = {
                  user_email: email,
                  book_isbn: b.isbn,
                };
                database.query(
                  userGallerySql,
                  galleryData,
                  (err, galleryResult) => {
                    if (err) {
                      console.log("ERROR", err);
                      res.status(400).send("DB ERROR");
                    }
                    console.log("GALLERY RESULT", galleryResult);
                  }
                );
              } catch (error) {
                console.log("ERROR", err);
                res.status(400).send("DB ERROR");
              }
              console.log("OUTSIDE");
            });
            console.log("Success");
            res.send("SUCCESS");
          });
        } catch (error) {
          console.log("ERROR", err);
        }
      });
    } catch (error) {
      console.log("ERROR", err);
      res.status(400).send("DB ERROR");
    }
  } catch (error) {
    console.log("ERROR", err);
    res.status(400).send("STRIPE ERROR");
  }
});

module.exports = router;
