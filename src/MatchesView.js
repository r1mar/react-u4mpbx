import React from "react";
import { Link } from "react-router-dom";
import style from "./style.css";
import service from "./Service";

export default class MatchesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.delete = this.delete.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    service.readMatches().then(matches => {
      this.setState({
        matches: matches
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
      matches: this.state.matches.filter(match => toDeleteMatches.indexOf(match) === -1)
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
            <Link to={"/match" + match.id}>{match.name}</Link>
          </label>
        </li>
      ));

    return (
      <div>
        <Link to="/">Zurück</Link>
        <Link to="/match">Neu</Link>
        <ol>{matchesSnippet}</ol>
        <button onClick={this.delete}>Löschen</button>
        <span className="error">{this.state.error}</span>
      </div>
    );
  }
}
