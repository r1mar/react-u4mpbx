import React from "react";
import FormGroup from "./FormGroup";

export default function ComboBox(props) {
  let options, spaceOption, errors;

  try {
    options = props.options.map(option => (
      <option key={option.id} value={option.id}>
        {option.value}
      </option>
    ));
    spaceOption =
      !props.required || !props.value ? <option key="-1" id="" /> : null;
    errors = props.errors;
  } catch (e) {
    errors = [e];
  }

  return (
    <FormGroup
      forId={props.id}
      label={props.label}
      errors={errors}
      inline={props.inline}
    >
      <select
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        value={props.value}
        className={errors.length ? "form-control is-invalid" : "form-control"}
        required={props.required}
      >
        {spaceOption}
        {options}
      </select>
    </FormGroup>
  );
}
