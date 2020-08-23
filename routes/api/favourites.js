var express = require("express");
var router = express.Router();
const {
  downloadPromise,
} = require("./googleDriveAuthentication/downloadPromise");
const newConn = require("../../connection/db");
const { result } = require("lodash");

router.post("/", (req, res) => {
  console.log("FRQ", req.body);

  let sql = "INSERT INTO favourites SET ?";
  const data = {
    book_isbn: req.body.isbn,
    user_email: req.body.email,
  };
  const database = newConn();
  database.query(sql, data, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send("SUCCESS");
  });
});

module.exports = router;
