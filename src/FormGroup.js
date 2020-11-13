import React from "react";

export default function FormGroup(props) {
  let errors = props.errors ? (
    <div className="invalid-feedback">
      {props.errors.map(error => JSON.stringify(error))}
    </div>
  ) : null;

  return (
    <div className="form-group">
      <label htmlFor={props.forId}>{props.label}</label>
      {props.children}
      {errors}
    </div>
  );
}
