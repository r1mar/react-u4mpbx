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
      <ol>
        {teamsSnippet}
      </ol>
    );
  }
}
