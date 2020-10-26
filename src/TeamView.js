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
    if (this.props.match.params.id) {
      service
        .readTeam(this.props.match.params.id)
        .then(team => {
          this.setState({
            original: team,
            workingCopy: Object.assign({}, team)
          });
        })
        .catch(error => {
          this.setState({
            error: error.message
          });
        });
    } else {
      this.setState({
        original: {},
        workingCopy: {}
      });
    }
  }

  save(event) {
    event.preventDefault();

    if (this.state.original.name !== this.state.workingCopy.name) {
      if (this.props.match.params.id) {
        service.updateTeam(this.state.workingCopy);
      } else {
        service.createTeam(this.state.workingCopy);
      }

      this.setState({
        original: this.state.workingCopy,
        workingCopy: Object.assign({}, this.state.workingCopy)
      });
    }
  }

  onChange(event) {
    let newState = Object.assign({}, this.state);

    newState.workingCopy.name = event.target.value;
    this.setState(newState);
  }

  render() {
    let original, workingCopy, txtInput, btnSave;

    if (this.state.original) {
      (original = this.state.original),
        (workingCopy = this.state.workingCopy),
        (txtInput = (
          <input
            id="txtName"
            type="text"
            onChange={this.onChange}
            value={workingCopy.name}
          />
        )),
        (btnSave = (
          <input
            type="submit"
            className="save"
            disabled={original.name === workingCopy.name ? "disabled" : ""}
          />
        ));
    }

    return (
      <form onSubmit={this.save}>
        <Link to="/teams">Zurück</Link>
        <label htmlFor="txtName" text="Name:" />
        {txtInput}
        <span className="error">{this.state.error}</span>
        {btnSave}
      </form>
    );
  }
}
