import React from "react";
import { Link } from "react-router-dom";
import service from "./file3";

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    service.readTeam(this.props.match.params.id).then(team => {
      this.setState({
        team: Object.assign({}, team)
        });

    }).catch(error => {
      this.setState({
        error: error.message
      });

    });
  }

  save() {
    service.updateTeam(this.state.team.id);
  }

  render() {
    return (
      <div>
        <Link to="/teams">Zurück</Link>
        <label for="txtName" text="Name:" />
        <input id="txtName" type="text" value={this.state.team.name} />
        <span className="error">{this.state.error}</span>
        <button className="save" click={this.save}>Speichern</button>
      </div>
    );
  }
}