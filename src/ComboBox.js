import React from "react";
import FormGroup from "./FormGroup";

export default function ComboBox(props) {
  let options = props.options.map(option => (
      <option key={option.id} value={option.id}>
        {option.value}
      </option>
    )),
    spaceOption =
      !props.required || !props.value ? <option key="-1" id="" /> : null;

  return (
    <FormGroup
      forId={props.id}
      label={props.label}
      errors={props.errors}
      inline={props.inline}
    >
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
        {spaceOption}
        {options}
      </select>
    </FormGroup>
  );
}
