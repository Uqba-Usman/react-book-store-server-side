import React from "react";
import FormField from "../auth/formField";
import Joi from "@hapi/joi";
import { Link } from "react-router-dom";
const ShippingForm = () => {
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });
  const [error, setError] = React.useState();

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
      firstName: Joi.string().required().messages({
        "string.empty": "FirstName is not allowed to be empty",
      }),
      lastName: Joi.string().required().messages({
        "string.empty": "LastName is not allowed to be empty",
      }),
      address: Joi.string().required().messages({
        "string.empty": "Address is not allowed to be empty",
      }),
      city: Joi.string().required().messages({
        "string.empty": "City is not allowed to be empty",
      }),
      state: Joi.string().required().messages({
        "string.empty": "State is not allowed to be empty",
      }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.empty": "Email is not allowed to be empty",
        }),
      phone: Joi.string().required().messages({
        "string.empty": "Phone is not allowed to be empty",
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
  };

  const handleChange = (e) => {
    setError("");

    let old = { ...data };
    old[e.target.name] = e.target.value;
    console.log("Old", old);
    setData(old);
    console.log(data.name);
  };

  return (
    <div className="col-lg-6 no-padding">
      <form onSubmit={handleSubmit} className="form-transparent-grey">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="upper">Billing & Shipping Address</h4>
          </div>

          <div className="col-lg-6 form-group">
            <FormField
              placeholder="First Name"
              onChange={handleChange}
              error={error}
              name="firstName"
              value={data.firstName}
            />
          </div>
          <div className="col-lg-6 form-group">
            <FormField
              placeholder="Last Name"
              onChange={handleChange}
              error={error}
              name="lastName"
              value={data.lastName}
            />
          </div>
          <div className="col-lg-12 form-group">
            <FormField
              placeholder="Address"
              onChange={handleChange}
              error={error}
              name="address"
              value={data.address}
            />
          </div>
          <div className="col-lg-6 form-group">
            <FormField
              placeholder="City"
              onChange={handleChange}
              error={error}
              name="city"
              value={data.city}
            />
          </div>
          <div className="col-lg-6 form-group">
            <FormField
              placeholder="State/Province"
              onChange={handleChange}
              error={error}
              name="state"
              value={data.state}
            />
          </div>
          <div className="col-lg-6 form-group">
            <FormField
              placeholder="Email"
              onChange={handleChange}
              error={error}
              name="email"
              value={data.email}
            />
          </div>
          <div className="col-lg-6 form-group">
            <FormField
              placeholder="Phone"
              onChange={handleChange}
              error={error}
              name="phone"
              value={data.phone}
            />
          </div>
          <div className="col-lg-6">
            <h6>Add to Cart</h6>
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
