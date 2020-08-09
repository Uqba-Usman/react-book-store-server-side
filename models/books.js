const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  title: String(),
  description: String(),
  author: String(),
  price: String(),
  isbn: String(),
  category: String(),
  file: {
    fileId: String(),
    fileName: String(),
    fileMimeType: String(),
  },
});

const Books = mongoose.model("Books", booksSchema);

module.exports.Books = Books;
