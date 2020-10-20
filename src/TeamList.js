import React from "react";
import style from "./style.css";

export default class TeamList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: ["Mönchen Gladbach", "Wolfsburg", "1.FC Köln", "SGE"]
    };
  }

  render() {
    return (
      <ol>
        {this.state.teams.sort().map(team => {
          <li key={team}>{team} </li>;
        })}
      </ol>
    );
  }
}
