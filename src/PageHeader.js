import React from "react";
import { Link } from "react-router-dom";

export default class PageHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      collapsing: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidmount() {
    const height = this.divElement.clientHeight;
  }

  toggleMenu() {
    this.setState({
      collapsing: true
    });

    setTimeout(() => {
      this.setState((state, props) => ({
        collapsed: !state.collapsed,
        collapsing: false
      }));
    }, 10000);
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          {this.props.title}
        </Link>
        <button
          onClick={this.toggleMenu}
          className={
            this.state.collapsed ? "navbar-toggler collapsed" : "navbar-toggler"
          }
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={this.state.collapsed ? "false" : "true"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={
            this.state.collapsing
              ? "navbar-collapse collapsing"
              : this.state.collapsed
              ? "navbar-collapse collapse"
              : "navbar-collapse collapse show"
          }
          id="navbarSupportedContent"
        >
          <ul
            className="navbar-nav mr-auto"
            ref={divElement => {
              this.divElement = divElement;
            }}
          >
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
