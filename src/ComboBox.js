import React from "react";
import FormGroup from "./FormGroup";

export default function ComboBox(props) {
  let options = props.options.map(option => (
    <option key={option.id}>
      {option.value}
    </option>
  ));

  return (
    <FormGroup forId={props.id} label={props.label}>
      <select
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        value={props.value}
        className="form-control"
      >
        <option key="-1" id="-1" />
        {options}
      </select>
    </FormGroup>
  );
}
