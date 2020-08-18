var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b96e10c55848d3",
  password: "a4ce1d56",
  database: "heroku_4d2072f812ae958",
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Connected to Mysql...");
});

module.exports = connection;
