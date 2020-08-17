import React from "react";

const FormField = ({
  name,
  error,
  placeholder,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <React.Fragment>
      <label className="sr-only" htmlFor={name} />
      {error && console.log("FormFieldEror", name, error.errorData)}
      <input
        className={
          error
            ? error.errorData.details[name]
              ? "form-control is-invalid"
              : "form-control is-valid"
            : "form-control"
        }
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={error ? error.errorData._original[name] : value}
        onChange={onChange}
      />
      {error && error.errorData.details[name] && (
        <div className="is-invalid" id={name + "-error"}>
          {" "}
          {error.errorData.details[name]}
        </div>
      )}
    </React.Fragment>
  );
};

export default FormField;
