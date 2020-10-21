import React from "react";
import { Link } from "react-router-dom";
import style from "./style.css";
import service from ".:file3";

export default class TeamsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: ["Mönchen Gladbach", "Wolfsburg", "1.FC Köln", "SGE"]
    };
  }

  componentDidMount() {
    service.getTeams().then(teams => {
      this.setState({
        teams: teams
      });
    });
  }

  render() {
    let teamsSnippet = this.state.teams.map(team => (
      <li key={team.id}>
        <Link to={"/team/" + team.id}>{team.name}</Link>
      </li>
    ));

    return (
      <ol>
        {teamsSnippet}
      </ol>
    );
  }
}
