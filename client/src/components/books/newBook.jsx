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

const NewBook = (props) => {
  const [data, setData] = useState({
    title: "",
    author: "",
    edition: "",
    publisher: "",
    category: "",
    price: "",
    isbn: "",
  });
  const [selectedFile, setselectedFile] = useState(null);
  const [error, setError] = useState();
  const [fileError, setFileError] = useState();

  const formatJoiError = (error) => {
    const errorToReturn = {};
    errorToReturn._original = error._original;
    errorToReturn.details = {};
    error.details.forEach((detail) => {
      errorToReturn.details[detail.path] = detail.message;
    });
    console.log(errorToReturn);

    return errorToReturn;
  };

  const validateData = (data) => {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        "string.empty": "Title is not allowed to be empty",
      }),
      author: Joi.string().required().messages({
        "string.empty": "author is not allowed to be empty",
      }),
      author: Joi.string().required().messages({
        "string.empty": "Author is not allowed to be empty",
      }),
      category: Joi.string().required().messages({
        "string.empty": "category is not allowed to be empty",
      }),
      price: Joi.string().required().messages({
        "string.empty": "Price is not allowed to be empty",
      }),
      isbn: Joi.string().required().messages({
        "string.empty": "ISBN is not allowed to be empty",
      }),
      edition: Joi.string().required().messages({
        "string.empty": "Edition is not allowed to be empty",
      }),
      publisher: Joi.string().required().messages({
        "string.empty": "Publisher is not allowed to be empty",
      }),
    }).options({ abortEarly: false });

    return schema.validate(data);
  };

  const handleChange = async (e) => {
    setError("");

    let old = { ...data };
    old[e.target.name] = e.target.value;
    console.log("Old", old);
    await setData(old);
  };

  const fileChangeHandler = (e) => {
    setFileError("");
    setselectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let { error } = validateData(data);
    console.log("Result", error);
    if (error) {
      let errorData = formatJoiError(error);
      console.log(errorData);
      setError({ errorData: errorData || null });
      console.log(error);
      return;
    }

    if (!selectedFile) {
      console.log("No selected file");
      setFileError("File is required");
      return;
    }
    const form = new FormData();
    form.append("file", selectedFile);
    form.append("title", data.title);
    form.append("author", data.author);
    form.append("category", data.category);
    form.append("price", data.price);
    form.append("isbn", data.isbn);
    form.append("edition", data.edition);
    form.append("publisher", data.publisher);

    console.log("FORM: ", form);

    bookService
      .addBook(form)
      .then((res) => {
        console.log("Data Submitted", res);
        props.history.push("/");
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
            <form
              onSubmit={handleSubmit}
              enctype="multipart/form-data"
              className="form-transparent-grey"
            >
              <div className="row">
                <div className="col-lg-12">
                  <h3>Add New Book</h3>
                  <br />
                </div>
                <Input
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  error={error}
                  label="Title"
                />
                <Input
                  name="author"
                  value={data.author}
                  onChange={handleChange}
                  error={error}
                  label="Author"
                />
                <Input
                  name="edition"
                  value={data.edition}
                  onChange={handleChange}
                  error={error}
                  label="Edition"
                />
                <Input
                  name="publisher"
                  value={data.publisher}
                  onChange={handleChange}
                  error={error}
                  label="Publisher"
                />
                <Input
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                  error={error}
                  label="Category"
                />
                <Input
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  error={error}
                  label="Price"
                />
                <Input
                  name="isbn"
                  value={data.isbn}
                  onChange={handleChange}
                  error={error}
                  label="ISBN"
                />
                <UploadFile
                  onChange={fileChangeHandler}
                  error={fileError}
                  name={selectedFile}
                />
              </div>
              <div className="row">
                <div className="col-lg-12 form-group">
                  <button type="submit" className="btn">
                    Register New Account
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

export default NewBook;
