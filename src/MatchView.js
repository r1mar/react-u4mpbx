import React from "react";
import { Link } from "react-router-dom";
import service from "./Service";
import Alert from "./Alert";

export default class MatchView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      match: {

      }
    };
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      service
        .readMatch(this.props.match.params.id)
        .then(match => {
          this.setState({
            match: match
          });
        })
        .catch(error => {
          this.setState({
            error: error.message
          });
        });
    }
  }

  save(event) {
    let result;

    event.preventDefault();

      if (this.props.match.params.id) {
        result = service.updateMatch(this.state.workingCopy);
        
      } else {
        result = service.createMatch(this.state.workingCopy);
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
    let original, workingCopy, txtInput, btnSave, teamOptions1;

    if (this.state.original) {
      original = this.state.original;
      workingCopy = this.state.workingCopy;
      cmbTeam1 = (
        <select
          id="cmbTeam1"
          type="text"
          className="form-control"
          onChange={this.onChange}
          value={workingCopy.team1Id}
        >
          {teamOptions}
        </select>
      );
      btnSave = (
        <button
          type="submit"
          className="btn btn-primary"
          disabled={original.team1Id === workingCopy.team1Id ? "disabled" : ""}
        >
          Übernehmen
        </button>
      );
    }

    return (
      <div>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/matches" className="nav-link">
              Zurück
            </Link>
          </li>
        </ul>
        <form onSubmit={this.save}>
          <div className="input-group">
            <label htmlFor="txtName" text="Name:" />
            {txtInput}
          </div>
          {btnSave}
          <Alert message={this.state.error} />
        </form>
      </div>
    );
  }
}
