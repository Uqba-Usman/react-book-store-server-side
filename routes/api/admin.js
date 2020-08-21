const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

const newConn = require("../../connection/db");

router.post("/login", (req, res) => {
  let sql = "SELECT * FROM admin where email = ?";
  const database = newConn();
  database.query(sql, req.body.email, (err, result) => {
    if (err) return console.log("DATA GETTING ERROR", err);
    console.log(result);
    if (result.length != 0) {
      console.log(result[0].password);
      let same = result[0].password === req.body.password;
      if (same) {
        console.log("Password Match");
        let token = jwt.sign(
          {
            email: result[0].email,
            name: `${result[0].fName} ${result[0].lName}`,
            role: "admin",
          },
          config.get("jwtPrivateKey")
        );
        return res.status(200).send(token);
      } else {
        console.log("Password Not Match");
        return res.status(400).send("Password Not Match");
      }
    }

    if (result.length === 0) {
      console.log("EMAIL NOT REGISTERED");
      return res.status(400).send("EMAIL NOT REGISTERED");
    }
  });
});

module.exports = router;
