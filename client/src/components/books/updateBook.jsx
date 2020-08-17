import React, { useState } from "react";
import FormField from "../auth/formField";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import userService from "./../../services/UserService";
import axios from "axios";
import Joi from "@hapi/joi";
import TextField from "@material-ui/core/TextField";
import Input from "./../auth/input";
import UploadFile from "./uploadFile";
import bookService from "../../services/BookService";

const UpdateBook = (props) => {
  const [data, setData] = useState({
    title: "",
    edition: "",
    publisher: "",
    author: "",
    category: "",
    price: "",
    isbn: "",
  });
  console.log(props);
  const id = props.match.params.id;
  console.log("ID", id);
  const getBook = async () => {
    try {
      const result = await bookService.getSingleBook(id);
      console.log("RESULT", result);
      setData(result);
      console.log("DATA", data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getBook();
  }, []);

  const handleChange = async (e) => {
    let old = { ...data };
    old[e.target.name] = e.target.value;
    console.log("Old", old);
    await setData(old);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("SUBMITED DATA: ", data);
    bookService
      .updateBook(id, data)
      .then((res) => {
        console.log("Data Submitted", res);
        props.history.push("/admin-dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 center no-padding">
            <form onSubmit={handleSubmit} className="form-transparent-grey">
              <div className="row">
                <div className="col-lg-12">
                  <h3>Update Book</h3>
                  <br />
                </div>
                <Input
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  label="Title"
                />
                <Input
                  name="edition"
                  value={data.edition}
                  onChange={handleChange}
                  label="edition"
                />
                <Input
                  name="publisher"
                  value={data.publisher}
                  onChange={handleChange}
                  label="publisher"
                />
                <Input
                  name="author"
                  value={data.author}
                  onChange={handleChange}
                  label="Author"
                />
                <Input
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                  label="Category"
                />
                <Input
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  label="Price"
                />
                <Input
                  name="isbn"
                  value={data.isbn}
                  onChange={handleChange}
                  label="ISBN"
                />
              </div>
              <div className="row">
                <div className="col-lg-12 form-group">
                  <button type="submit" className="btn">
                    Update
                  </button>
                  <Link to="/" className="btn btn-danger m-l-10">
                    Cancel
                  </Link>
                  <br />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateBook;
