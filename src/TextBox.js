import React from "react";

export default function TextBox(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} name={props.id} type="text" className="form-control" onChange={props.onChange}
      value={props.value} required={props.required} />
    </div>
  );
}