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
    console.log("Success");
    res.send("Done");
  } catch (error) {
    console.log("ERROR", err);
    res.status(400).send("STRIPE ERROR");
  }
});

module.exports = router;
