import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default class StartMenu extends React.Component {
  constructor(props) {
    super(props);

    this.download = this.download.bind(this);
  }

  download() {
    let data = "data:text/json;charset=utf8," + encodeURIComponent(JSON.stringify({test: "test"})),
       aDownload = document.getElementById("downloadDummy");

    aDownload.setAttribute("href", data);
    aDownload.setAttribute("download", "data.json");

    aDownload.click();

  }

  render() {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link className="nav-link" to="/teams">Vereine</Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={this.download}>Speichern</a>
        <a id="downloadDummy" style={{display: "none" }} />
      </li>
    </ul>
  );
  }
}
