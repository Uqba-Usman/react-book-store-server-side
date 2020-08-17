import React, { useState } from "react";
import FormField from "./formField";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import userService from "./../../services/UserService";
import Example from "./example";
import axios from "axios";
import Joi from "@hapi/joi";
import Input from "./input";

const Register = (props) => {
  const [data, setData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  console.log("Rendering...");

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
      fName: Joi.string().required().messages({
        "string.empty": "FirstName is not allowed to be empty",
      }),
      lName: Joi.string().required().messages({
        "string.empty": "LastName is not allowed to be empty",
      }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.empty": "Email is not allowed to be empty",
        }),
      password: Joi.string().min(3).required().messages({
        "string.empty": "Password is not allowed to be empty",
        "string.min": "Pasword must be atleast 3 characters long",
      }),
    }).options({ abortEarly: false });

    return schema.validate(data);
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

    // axios
    //   .post("http://localhost:4500/api/users/register", data)
    //   .then((res) => {
    //     props.history.push("/login");
    //     console.log("Data Submitted", res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error(err.response.data, {
    //       position: toast.POSITION.TOP_LEFT,
    //     });
    //   });
    console.log("Submitted");
    userService
      .register(data.fName, data.lName, data.email, data.password)
      .then((res) => {
        props.history.push("/login");
        console.log("Data Submitted", res);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_LEFT,
        });
      });

    console.log("Submitted");
  };

  const handleChange = async (e) => {
    setError("");

    let old = { ...data };
    old[e.target.name] = e.target.value;
    console.log("Old", old);
    await setData(old);
    console.log(data.name);
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 center no-padding">
            <form onSubmit={handleSubmit} className="form-transparent-grey">
              <div className="row">
                <div className="col-lg-12">
                  <h3>Register New Account</h3>
                  <br />
                </div>

                <Input
                  name="fName"
                  value={data.fName}
                  onChange={handleChange}
                  error={error}
                  label="First Name"
                />
                <Input
                  name="lName"
                  value={data.lName}
                  onChange={handleChange}
                  error={error}
                  label="Last Name"
                />
                <Input
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={error}
                  label="Email"
                />
                <Input
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  error={error}
                  label="Password"
                  type="password"
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
