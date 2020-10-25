import React from "react";
import { Link } from "react-router-dom";
import service from "./Service";

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    service.readTeam(this.props.match.params.id).then(team => {
      this.setState({
        team: {
          original: team,
          workingCopy: Object.assign({}, team)
        }});

    }).catch(error => {
      this.setState({
        error: error.message
      });

    });
  }

  save() {
    if(this.state.team.original.name !== this.state.team.workingCopy.name) {
      service.updateTeam(this.state.team.workingCopy);
      this.setState({
        team: {
          original: this.state.team.workingCopy,
          workingCopy: Object.assign({}, this.state.team.workingCopy)
        }
      });
    }
  }

  render() {
    let original, workingCopy, txtInput, btnSave;

    if(this.state.team) {
    original = this.state.team.original,
      workingCopy = this.state.team.workingCopy,
      txtInput = (<input id="txtName" type="text" value={workingCopy.name} />),
      btnSave = (<button click={this.save} className="save" enabled={original.name === workingCopy.name ? false : true}>Speichern</button>);
    }

    return (
      <div>{JSON.stringify(this.props)}
        <Link to="/teams">Zurück</Link>
        <label for="txtName" text="Name:" />
        {txtInput}
        <span className="error">{this.state.error}</span>
        {btnSave}
      </div>
    );
  }
}