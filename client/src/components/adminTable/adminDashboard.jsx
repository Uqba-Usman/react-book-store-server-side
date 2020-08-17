import React from "react";
import { Link } from "react-router-dom";
import bookService from "../../services/BookService";

const AdminDashboard = (props) => {
  const [books, setBooks] = React.useState([]);

  // const getData = async () => {
  //   try {
  //     const result = await bookService.getBooks();
  //     setBooks(result);
  //   } catch (error) {
  //     console.log("BOOKS GETTING ERROR", error);
  //   }
  // };
  React.useEffect(() => {
    bookService
      .getBooks()
      .then((res) => setBooks(res))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (book) => {
    console.log("BID", book);
    const newBooks = books.filter((b) => b.isbn !== book.isbn);
    setBooks(newBooks);
    try {
      const result = await bookService.deleteBook(book.isbn);
    } catch (error) {
      console.log(error);
    }
    console.log("NB", newBooks);
  };

  const handleEdit = (book) => {
    console.log("Edit");
    props.history.push("/books/update/" + book.isbn);
  };

  return (
    <section id="page-content" className="no-sidebar">
      <div className="container">
        <div className="row mb-3">
          <div className="col-lg-6 ">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => props.history.push("/newBook")}
            >
              <i className="icon-plus"></i> Add Book
            </button>

            <div id="export_buttons" className="mt-2"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <table
              id="datatable"
              className="table table-bordered table-hover"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th className="noExport">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={index}>
                    <td>{book.isbn}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.price}</td>
                    <td>{book.category}</td>
                    <td>
                      <span className="badge badge-pill badge-primary">
                        Active
                      </span>
                    </td>
                    <td>
                      {" "}
                      <Link
                        className="ml-2"
                        data-toggle="tooltip"
                        data-original-title="Edit"
                        onClick={() => handleEdit(book)}
                      >
                        <i className="icon-edit"></i>
                      </Link>
                      <Link
                        className="ml-2"
                        data-toggle="tooltip"
                        data-original-title="Delete"
                        onClick={() => handleDelete(book)}
                      >
                        <i className="icon-trash-2"></i>
                      </Link>
                      {/* <Link
                        className="ml-2"
                        data-toggle="tooltip"
                        data-original-title="Settings"
                      >
                        <i className="icon-settings"></i>
                      </Link> */}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
