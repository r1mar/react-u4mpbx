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

    this.delete = this.delete.bind(this);
    this.onChange = this.onChange.bind(this);
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

  delete() {
    let toDeleteIds = [],
      toDeleteMatches = [];

    this.state.matches.forEach(match => {
      if (match.selected) {
        toDeleteIds.push(match.id);
        toDeleteMatches.push(match);
      }
    });

    service.deleteMatches(toDeleteIds).catch(error => {
      this.setState(
        Object.assign({}, this.state, {
          error: error.message
        })
      );
    });

    this.setState({
      matches: this.state.matches.filter(
        match => toDeleteMatches.indexOf(match) === -1
      )
    });
  }

  onChange(event) {
    let match = this.state.matches.filter(match => match.id == event.target.id);

    match = Object.assign({}, match);
    match.selected = event.target.checked;
    this.setState({
      matches: this.state.matches.map(match => {
        if (match.id == event.target.id) {
          match.selected = event.target.checked;
        }

        return match;
      })
    });
  }

  getName(id) {
    let match = this.state.matches.find(team => team.id == id);

    return match.team1.name + " : " + match.team2.name;
  }

  render() {
    let matchesSnippet =
      this.state.matches &&
      this.state.matches.map(match => (
        <li key={match.id}>
          <input
            type="checkbox"
            id={match.id.toString()}
            value={match.selected}
            onChange={this.onChange}
          />
          <label htmlFor={match.id.toString()}>
            <Link className="nav-link" to={"/match/" + match.id}>
              {match.gameDay}. {match.team1.name} : {match.team2.name}
            </Link>
          </label>
        </li>
      ));


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
              label: "#",
              name: "id"
            },
            {
              label: "SpielTage",
              name: "gameDay",
            }, {
              label: "Spiel",
              calcValue: this.getName,
              navigation: this.showMatch
            }
          ]} delete={this.deleteMatches} create={this.createMatch}
        />
        <ol className="nav flex-column">{matchesSnippet}</ol>
        <button className="btn btn-danger" onClick={this.delete}>
          Löschen
        </button>
        <Alert message={this.state.error} />
      </div>
    );
  }
}
