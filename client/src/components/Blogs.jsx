import React from "react";
import SingleBook from "./books/singleBook";
import { Grid } from "@material-ui/core";
import axios from "axios";
import bookService from "../services/BookService";

const Blogs = () => {
  // const books = [
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "1" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "2" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "3" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "4" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "5" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "6" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "7" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "8" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "9" },
  // ];
  const [books, setBooks] = React.useState([]);

  // const getData = async () => {
  //   try {
  //     const result = await bookService.getBooks();
  //     setBooks(result);
  //   } catch (error) {
  //     console.log("BOOKS GETTING ERROR", error);
  //   }
  // };
  // React.useEffect(() => getData(), []);
  React.useEffect(() => {
    bookService
      .getBooks()
      .then((res) => setBooks(res))
      .catch((err) => console.log(err));
    // axios
    //   .get("http://localhost:4500/api/books")
    //   .then((res) => setBooks(res))
    //   .catch((err) => console.log("Error", err));
  }, []);

  return (
    <section>
      <div className="container">
        <div className="shop">
          {books.length === 0 ? (
            <p>There is no book available</p>
          ) : (
            <Grid container spacing={3}>
              {books.map((book, index) => (
                <SingleBook key={index} book={book} />
              ))}
            </Grid>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
