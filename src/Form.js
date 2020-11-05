import React from "react";
import Alert from "./Alert";

export default function Form(props) {
  return (
    <form onSubmit={props.submit}>
      {props.children}

      <input type="submit" className="btn btn-primary" />
      <Alert message={props.message} />
    </form>
  )
}