import React from "react";

export default function Alert(props) {
  let messages = props.messages.map(message => (
    <div className="alert alert-danger">{message}</div>
  ));

  return <div>{messages}</div>;
}
