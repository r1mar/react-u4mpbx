import React from "react";
import FieldError from "./FieldError";

export default function Alert(props) {
  let messages = props.messages
    .filter(message => !(message instanceof FieldError))
    .map(message => {
      <div className="alert alert-danger">{message.message}</div>;
    });

  return <div>{messages} {props.messages.length ? props.messages[0].message : JSON.stringify(props.messages)}</div>;
}
