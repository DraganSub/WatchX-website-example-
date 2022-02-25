import React from "react";
import "./styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="form-row">
      {label && <label>{label}</label>}

      <input
        className="formInput"
        onChange={handleChange}
        autoComplete="off"
        {...otherProps}
        required
      />
    </div>
  );
};

export default FormInput;
