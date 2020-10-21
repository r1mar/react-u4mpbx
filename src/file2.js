import React from "react";
import service from "./file3";

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    service.readTeam(this.props.match.params.id).then(team => {
      this.setState({
        team
      });
    }).catch(error) {
      this.setState({
        error: error.message
      })
    }
  }

  render() {
    return (
      <div>
        <label for="txtName" text="Name:" />
        <input id="txtName" type="text" value={this.state.team.name} />
        <span className="error">{this.state.error}</span>
      </div>
    );
  }
}