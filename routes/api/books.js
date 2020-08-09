var express = require("express");
const { Books } = require("../../models/books");
var router = express.Router();
const formidable = require("formidable");
const {
  uploadDrive,
  uploadFilePromise,
} = require("./googleDriveAuthentication/uploadDrive");

//Get All books
router.get("/", async (req, res) => {
  let books = await Books.find();
  res.send(books);
});

// Get single book
router.get("/:id", async (req, res) => {
  try {
    let book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(400).send("Book with given id is not present");
    }
    console.log(book.price);
    return res.send(book);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

//Insert new Book
router.post("/", async (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = __dirname + "/googleDriveAuthentication/upload/";
  to_uploadDir = form.uploadDir;
  form.parse(req, async function (err, fields, files) {
    console.log("FIELD: ", fields);
    let file;
    try {
      file = await uploadFilePromise(files, to_uploadDir);
    } catch (err) {
      console.log(err);
    }
    try {
      let book = new Books();
      book.title = fields.title;
      book.description = fields.description;
      book.price = fields.price;
      book.author = fields.author;
      book.isbn = fields.isbn;
      book.category = fields.category;
      book.file = file;
      await book.save();
      console.log("Book", book);
      res.status(200).send(book);
    } catch (error) {
      console.log(err);
    }
  });
});

//Update book
router.put("/:id", async (req, res) => {
  let book = await Books.findById(req.params.id);
  book.title = req.body.title;
  book.description = req.body.description;
  book.price = req.body.price;
  book.author = req.body.author;
  book.isbn = req.body.isbn;
  book.category = req.body.category;
  await book.save();
  return res.send(book);
});

//Delete a book
router.delete("/:id", async (req, res) => {
  let book = await Books.findByIdAndDelete(req.params.id);
  res.send(book);
});

module.exports = router;
