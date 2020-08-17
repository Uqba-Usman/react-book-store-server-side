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

const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState();

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

    console.log("Submitted", data);
    console.log("PROPS: ", props);
    console.log("LS", localStorage.getItem("token"));
    userService
      .login(data.email, data.password)
      .then((res) => {
        console.log("Login", res);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log("ERROR", err);
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const handleChange = async (e) => {
    setError("");

    let old = { ...data };
    old[e.target.name] = e.target.value;

    await setData(old);
  };

  return (
    <section>
      <div id="main-area container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 center no-padding">
              <form onSubmit={handleSubmit} className="form-transparent-grey">
                <div className="row">
                  <div className="col-lg-12">
                    <h3>Login</h3>
                    <br />
                  </div>

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
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
