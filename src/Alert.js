import React from "react";

export default function Alert(props) {
  if (props.message) {
    return <div className="alert alert-danger">{props.message}</div>;
  } else {
    return null;
  }
}
