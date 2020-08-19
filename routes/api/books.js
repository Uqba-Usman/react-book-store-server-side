var express = require("express");
const { Books } = require("../../models/books");
var router = express.Router();
const formidable = require("formidable");

const db = require("../../connection/db");

const {
  uploadDrive,
  uploadFilePromise,
} = require("./googleDriveAuthentication/uploadDrive");
const { query } = require("express");
const { result } = require("lodash");
const newConn = require("../../connection/db");

//Get All books
// router.get("/", async (req, res) => {
//   let books = await Books.find();
//   res.send(books);
// });

router.get("/", async (req, res) => {
  let sql = "SELECT * FROM book";
  const databse = newConn();
  databse.query(sql, (err, books) => {
    if (err) console.log(error);
    console.log("BOOKS", books);
    res.send(books);
  });
});

// // Get single book
// router.get("/:id", async (req, res) => {
//   try {
//     let book = await Books.findById(req.params.id);
//     if (!book) {
//       return res.status(400).send("Book with given id is not present");
//     }
//     console.log(book.price);
//     return res.send(book);
//   } catch (err) {
//     return res.status(400).send("Invalid ID");
//   }
// });
router.get("/:id", async (req, res) => {
  let sql = "SELECT * FROM book WHERE ISBN = ?";
  const databse = newConn();
  databse.query(sql, req.params.id, (err, book) => {
    if (err) console.log(error);
    console.log("BOOK", book[0]);
    res.send(book[0]);
  });
});

// //Insert new Book
// router.post("/", async (req, res) => {
//   var form = new formidable.IncomingForm();
//   form.uploadDir = __dirname + "/googleDriveAuthentication/upload/";
//   to_uploadDir = form.uploadDir;
//   form.parse(req, async function (err, fields, files) {
//     console.log("FIELD: ", fields);
//     let file;
//     try {
//       file = await uploadFilePromise(files, to_uploadDir);
//     } catch (err) {
//       console.log(err);
//     }
//     try {
//       let book = new Books();
//       book.title = fields.title;
//       book.description = fields.description;
//       book.price = fields.price;
//       book.author = fields.author;
//       book.isbn = fields.isbn;
//       book.category = fields.category;
//       book.file = file;
//       await book.save();
//       console.log("Book", book);
//       res.status(200).send(book);
//     } catch (error) {
//       console.log(err);
//     }
//   });
// });

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
      console.log("Uploading Failed", err);
    }
    try {
      let sql_book = "INSERT INTO book SET ?";
      let data = {
        isbn: fields.isbn,
        title: fields.title,
        author: fields.author,
        edition: fields.edition,
        category: fields.category,
        publisher: fields.publisher,
        price: fields.price,
      };
      const databse = newConn();
      databse.query(sql_book, data, (err, result_book) => {
        if (err) console.log(err);
        console.log("BOOK RESULT", result_book);
        console.log("FILE", file);
        try {
          let sql_book_file = "INSERT INTO bookdata set ?";
          let data_book_file = {
            fileID: file.fileId,
            fileMimeType: file.fileMimeType,
            fileName: file.fileName,
            bookData_isbn: fields.isbn,
          };
          const databse = newConn();
          databse.query(
            sql_book_file,
            data_book_file,
            (err, result_book_file) => {
              if (err) console.log(err);
              console.log("BOOK DATA RESULT", result_book_file);
              res.status(200).send("SUCCESS");
            }
          );
        } catch (error) {
          console.log("ERROR in file data Posting", error);
        }
      });
    } catch (error) {
      console.log("ERROR in book Posting", error);
    }
  });
});

// //Update book
// router.put("/:id", async (req, res) => {
//   let book = await Books.findById(req.params.id);
//   book.title = req.body.title;
//   book.description = req.body.description;
//   book.price = req.body.price;
//   book.author = req.body.author;
//   book.isbn = req.body.isbn;
//   book.category = req.body.category;
//   await book.save();
//   return res.send(book);
// });

router.put("/:id", (req, res) => {
  let data = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    edition: req.body.edition,
    category: req.body.category,
    publisher: req.body.publisher,
    price: req.body.price,
  };
  let sql = `UPDATE book SET ? WHERE isbn = ${req.params.id}`;
  const databse = newConn();
  databse.query(sql, data, (err, result) => {
    if (err) console.log(err);
    console.log("UPDATED RESULT", result);
    res.status(200).send(result);
  });
});

// //Delete a book
// router.delete("/:id", async (req, res) => {
//   let book = await Books.findByIdAndDelete(req.params.id);
//   res.send(book);
// });

router.delete("/:id", (req, res) => {
  let sql = `DELETE FROM book where isbn = ${req.params.id}`;
  const databse = newConn();
  databse.query(sql, (err, result) => {
    if (err) console.log("DELETION ERROR", err);
    console.log("RESULT", result);
    res.send(result);
  });
});

module.exports = router;
