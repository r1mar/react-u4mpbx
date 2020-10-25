import React from "react";
import { Link } from "react-router-dom";
import service from "./Service";

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
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

  onChange(event) {
    let newState = Object.assign({}, this.state);

    newState.workingCopy = event.target.value;
    this.setState(newState);
  }

  render() {
    let original, workingCopy, txtInput, btnSave;

    if(this.state.original) {
    original = this.state.original,
      workingCopy = this.state.workingCopy,
      txtInput = (<input id="txtName" type="text" value={workingCopy.name} />),
      btnSave = (<button onClick={this.save} className="save" onChange={this.onChange} disabled={original.name === workingCopy.name ? "disabled" : ""}>Speichern</button>);
    }

    return (
      <div>{JSON.stringify(this.state)}
        <Link to="/teams">Zurück</Link>
        <label htmlFor="txtName" text="Name:" />
        {txtInput}
        <span className="error">{this.state.error}</span>
        {btnSave}
      </div>
    );
  }
}