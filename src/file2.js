import React from "react";

export default function ComboBox(props) {
  let options = props.options.map(option => 
    <option id={option.id} key={option.id}>{option.value}</option>);

  return (
    <div className="input-group">
      <label htmlFor={props.id}text={props.label} />
      <select id={props.id} onChange={props.onChangr} value={props.value} className="form-control">
        {options}
      </select>
    </div>
  );
}