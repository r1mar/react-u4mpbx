import React from "react";
import { Link } from "react-router-dom";
import style from "./style.css";
import service from "./Service";
import Alert from "./Alert";
import Table from "./Table";

export default class MatchesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.deleteMatches = this.deleteMatches.bind(this);
    this.showMatch = this.showMatch.bind(this);
    this.getName = this.getName.bind(this);
    this.createMatch = this.createMatch.bind(this);
  }

  componentDidMount() {
    service
      .readMatches()
      .then(matches => {
        this.setState({
          matches: matches
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  deleteMatches(toDeleteIds, toDeleteMatches) {
    let result = service.deleteMatches(toDeleteIds);
    
    result.then(() => {
      this.setState({
        matches: this.state.matches.filter(match => toDeleteMatches.indexOf(match) === -1)
      })
    }).catch(error => {
      this.setState({
          error: error.message
        });
    });

    return result;
  }

  getName(match) {
    return match.team1.name + " : " + match.team2.name;
  }

  showMatch(match) {
    this.props.history.push("/match/" + match.id);
  }

  createMatch() {
    this.props.history.push("/match");
  }

  render() {
    return (
      <div>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Zurück
            </Link>
          </li>
        </ul>
          <Table
          rows={this.state.matches}
          columns={[
            {
              id: 1,
              label: "#",
              name: "id"
            },
            {
              id: 2,
              label: "SpielTage",
              name: "gameDay",
            }, {
              id: 3,
              label: "Spiel",
              name: this.getName,
              navigation: this.showMatch
            }
          ]} delete={this.deleteMatches} create={this.createMatch}
        />
        <Alert message={this.state.error} />
      </div>
    );
  }
}
