import React from "react";
import TextField from "@material-ui/core/TextField";

const Input = (props) => {
  const { error, name, value, onChange, label, type } = props;
  return (
    <div className="col-lg-8 form-group">
      <TextField
        error={error && error.errorData.details[name] ? true : false}
        type={type ? type : "text"}
        id="outlined-error-helper-text"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        helperText={error && error.errorData.details[name]}
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default Input;
