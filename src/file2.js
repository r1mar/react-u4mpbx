import React from "react";
import service from "./file3";

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    service.readTeam(this.props.match.params.id).then(team => {
      this.setState({team});

    }).catch(error) {
      this.setState({
        error: error.message
      })

    }
  }

  delete() {
    service.deleteTeam(this.state.team.id);
  }

  render() {
    return (
      <div>
        <label for="txtName" text="Name:" />
        <input id="txtName" type="text" value={this.state.team.name} />
        <span className="error">{this.state.error}</span>
        <button click="delete">Löschen</button>
      </div>
    );
  }
}