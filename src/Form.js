import React from "react";
import Alert from "./Alert";

export default function Form(props) {
  return (
    <form onSubmit={props.onSubmit}>
      {props.children}

      <input type="submit" className="btn btn-primary" />
      <Alert messages={props.errors} />
    </form>
  );
}
