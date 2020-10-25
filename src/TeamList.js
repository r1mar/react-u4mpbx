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
    service.readTeams().then(teams => {
      this.setState({
        teams: teams
      });
    });
  }

  delete() {
    let toDeleteIds = [],
      toDeleteTeams = [];

    this.state.teams.forEach(team => {
      if(team.selected) {
        toDeleteIds.push(team.id);
        toDeleteTeams.push(team);
      }
    });

    service.deleteTeams(toDeleteIds).catch(error => {
      this.setState(Object.assign({}, this.state, {
        error: error.message
      }));
    });

    this.setState({
      teams: this.state.teams.filter(team => toDeleteTeams.indexOf(team) === -1)
    });

  }

  render() {
    let teamsSnippet = this.state.teams && this.state.teams.map(team => (
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
      <button click={this.delete}>Löschen</button>
      <span className="error">{this.state.error}</span>
      </div>
    );
  }
}
