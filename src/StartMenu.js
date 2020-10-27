import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import service from "./Service";

export default class StartMenu extends React.Component {
  constructor(props) {
    super(props);

    this.download = this.download.bind(this);
  }

  download() {
    service.readAll().then(data => {
      let dataUrl =
          "data:text/json;charset=utf8," +
          encodeURIComponent(JSON.stringify(data)),
        aDownload = document.getElementById("downloadDummy");

      aDownload.setAttribute("href", dataUrl);
      aDownload.setAttribute("download", "data.json");

      aDownload.click();
    });
  }

  render() {
    return (
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/teams">
            Vereine
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={this.download}>
            Speichern
          </a>
          <a id="downloadDummy" style={{ display: "none" }} />
        </li>
      </ul>
    );
  }
}
