import React from "react";
import FormGroup from "./FormGroup";

export default function ComboBox(props) {
  let options = props.options.map(option => (
    <option key={option.id} value={option.id}>
      {option.value}
    </option>
  ));

  return (
    <FormGroup forId={props.id} label={props.label} errors={props.errors}>
      <select
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        value={props.value}
        className={
          props.errors.length ? "form-control is-invalid" : "form-control"
        }
        required={props.required}
      >
        <option key="-1" id="" />
        {options}
      </select>
    </FormGroup>
  );
}
