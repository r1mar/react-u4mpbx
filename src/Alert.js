import React from "react";
import FieldError from "./FieldError";

export default function Alert(props) {
  let messages;

  try {
    messages = props.messages
      .filter(message => !(message instanceof FieldError))
      .map(message => (
        <div className="alert alert-danger">{message.message}</div>
      ));
  } catch (e) {
    messages = <div className="alert alert-danger">{e.message}</div>;
  }
  return <div>{messages}</div>;
}
