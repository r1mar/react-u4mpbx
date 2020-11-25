import React from "react";

export default function FormGroup(props) {
  let errors;

  try {
    errors = props.errors ? (
      <div className="invalid-feedback">
        {props.errors.map(error => error.message)}
      </div>
    ) : null;
    alert(JSON.stringify(props.errors));
  } catch (e) {
    errors = <div className="invalid-feedback">{e.message}</div>;
  }

  return (
    <div className={props.inline ? "form-group col" : "form-group"}>
      <label htmlFor={props.forId}>{props.label}</label>
      {props.children}
      {errors}
    </div>
  );
}
