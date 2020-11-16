import React from "react";
import { Link } from "react-router-dom";
import globe from "bootstrap-icons/icons/globe.svg";

export default class PageHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img src={globe} with="32" height="32" />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/teams">
                Vereine
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/matches">
                Spiele
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={this.download}>
                Speichern
              </a>
              <a id="downloadDummy" style={{ display: "none" }} />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
