import React from "react";

export default function FormGroup(props) {
  let errors = props.errors ? (
    <div className="invalid-feedback">
      {props.errors.map(error => error.message)}
    </div>
  ) : null;

  return (
    <div className={props.inline ? "form-group col" : "form-group"}>
      <label htmlFor={props.forId}>{props.label}</label>
      {props.children}
      {errors}
    </div>
  );
}
