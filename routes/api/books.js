var express = require("express");
const { Books } = require("../../models/books");
var router = express.Router();
const fs = require("fs");
const formidable = require("formidable");
const {
  uploadDrive,
  uploadFilePromise,
} = require("./googleDriveAuthentication/uploadDrive");
const newConn = require("../../connection/db");

//Get all books
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM book";
  const database = newConn();

  database.query(sql, (err, books) => {
    if (err) console.log(error);
    console.log("BOOKS", books);
    res.send(books);
  });
});

//Get single book using isbn
router.get("/:id", async (req, res) => {
  let sql = "SELECT * FROM book WHERE ISBN = ?";

  const database = newConn();
  database.query(sql, req.params.id, (err, book) => {
    if (err) console.log(error);
    console.log("BOOK", book[0]);
    res.send(book[0]);
  });
});

//Insert book
router.post("/", async (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = __dirname + "/googleDriveAuthentication/upload/";
  to_uploadDir = form.uploadDir;
  form.parse(req, async function (err, fields, files) {
    console.log("FILENAME", files.file.name);
    console.log("FIELD: ", fields);
    let file;
    try {
      file = await uploadFilePromise(files, to_uploadDir);
      fs.unlink(
        __dirname + "/googleDriveAuthentication/upload/" + file.fileName,
        (err) => {
          if (err) throw err;
          console.log("File was deleted");
        }
      );
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
        const database = newConn();
        database.query(sql_book, data, (err, result_book) => {
          if (err) return console.log(err);
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

            const database = newConn();
            database.query(
              sql_book_file,
              data_book_file,
              (err, result_book_file) => {
                if (err) return console.log(err);
                console.log("BOOK DATA RESULT", result_book_file);
                return res.status(200).send("SUCCESS");
              }
            );
          } catch (error) {
            console.log("ERROR in file data Posting", error);
            return res.status(400).send("ERROR in file data inserting");
          }
        });
      } catch (error) {
        console.log("ERROR in book Posting", error);
      }
    } catch (err) {
      return console.log("Uploading Failed", err);
    }
  });
});

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
  const database = newConn();
  database.query(sql, data, (err, result) => {
    if (err) console.log(err);
    console.log("UPDATED RESULT", result);
    res.status(200).send(result);
  });
});

router.delete("/:id", (req, res) => {
  let sql = `DELETE FROM book where isbn = ${req.params.id}`;
  const database = newConn();
  database.query(sql, (err, result) => {
    if (err) console.log("DELETION ERROR", err);
    console.log("RESULT", result);
    res.send(result);
  });
});

module.exports = router;

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

// //Delete a book
// router.delete("/:id", async (req, res) => {
//   let book = await Books.findByIdAndDelete(req.params.id);
//   res.send(book);
// });
