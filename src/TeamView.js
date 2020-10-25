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
          original: team,
          workingCopy: Object.assign({}, team)
        });

    }).catch(error => {
      this.setState({
        error: error.message
      });

    });
  }

  save() {
    if(this.state.original.name !== this.state.workingCopy.name) {
      service.updateTeam(this.state.workingCopy);
      this.setState({
        team: {
          original: this.state.workingCopy,
          workingCopy: Object.assign({}, this.state.workingCopy)
        }
      });
    }
  }

  render() {
    let original, workingCopy, txtInput, btnSave;

    if(this.state.original) {
    original = this.state.original,
      workingCopy = this.state.workingCopy,
      txtInput = (<input id="txtName" type="text" value={workingCopy.name} />),
      btnSave = (<button click={this.save} className="save" enabled={original.name === workingCopy.name ? false : true}>Speichern</button>);
    }

    return (
      <div>
        <Link to="/teams">Zurück</Link>
        <label for="txtName" text="Name:" />
        {txtInput}
        <span className="error">{this.state.error}</span>
        {btnSave}
      </div>
    );
  }
}