import React from "react";
import { Link } from "react-router-dom";
import style from "./style.css";
import service from "./Service";

export default class TeamsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    service.getTeams().then(teams => {
      this.setState({
        teams: teams
      });
    });
  }

  delete() {
    let toDelete = [];

    this.state.teams.forEach(team => {
      if(team.selected) {
        toDelete.push(team.id);
      }
    });
  }

  render() {
    let teamsSnippet = this.state.teams.map(team => (
      <li key={team.id}>
        <input type="checkbox" id={team.id.toString()} value={team.selected} />
        <label for={team.id.toString()}>
        <Link to={"/team/" + team.id}>{team.name}</Link></label>
      </li>
    ));

    return (
      <div>
      <Link to="/">Zurück</Link>
      <ol>
        {teamsSnippet}
      </ol>
      <button click="delete">Löschen</button>
      </div>
    );
  }
}
