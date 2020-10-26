import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default class StartMenu extends React.Component {
  constructor(props) {
    super(props);

    this.download = this.download.bind(this);
  }

  download() {

  }

  render() {
  return (
    <ul className="nav flex-column">
      <li>
        <Link className="nav-link" to="/teams">Vereine</Link>
        <button className="nav-link" onClick={this.download}>Speichern</button>
      </li>
    </ul>
  );
  }
}
