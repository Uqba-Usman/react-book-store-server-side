var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var multer = require("multer");
var usersRouter = require("./routes/api/users");
var booksRouter = require("./routes/api/books");
var cartRouter = require("./routes/api/cart");
var stripeRouter = require("./routes/api/stripe");
var indexRouter = require("./routes/index");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
// const uuid = require("uuid/v4");
var app = express();

app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/stripe", stripeRouter);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.send("Uqba Usman");
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// mongoose
//   .connect(config.get("db"), {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to Mongo...."))
//   .catch((error) => console.log(error.message));
module.exports = app;