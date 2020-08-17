var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/products", (req, res) => {
  res.send(["Laptop", "Car", "PC"]);
});

module.exports = router;
