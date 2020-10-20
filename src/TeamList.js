import React from "react";
import { Link } from "react-router-dom";
import style from "./style.css";

export default class TeamList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: ["Mönchen Gladbach", "Wolfsburg", "1.FC Köln", "SGE"]
    };
  }

  render() {
    let teams = this.state.teams.sort().map(team => (
      <li key={team}>
        <Link to="/team/{team}">{team}</Link>
      </li>
    ));

    return (
      <ol>
        {teams}
      </ol>
    );
  }
}
