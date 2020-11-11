import React from "react";

export default function FormGroup(props) {
  let error = props.error ? (<div className="invalid-feedback">{props.error}</div>) : null;
  
  return (
    <div className="form-group">
      <label htmlFor={props.forId}>{props.label}</label>
      {props.children}
      {error}
    </div>
  );
}
