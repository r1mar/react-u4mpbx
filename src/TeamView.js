import React from "react";
import { Link } from "react-router-dom";
import service from "./Service";
import Alert from "./Alert";

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: {
        name: ""
      }
    };
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      service
        .readTeam(this.props.match.params.id)
        .then(team => {
          this.setState({
            team: team
          });
        })
        .catch(error => {
          this.setState({
            error: error.message
          });
        });
    } else {
      this.setState({
        team: {
          name: ""
        }
      });
    }
  }

  save(event) {
    event.preventDefault();

    if (this.state.name !== this.state.name) {
      let result;
      if (this.props.match.params.id) {
        result = service.updateTeam(this.state.team);
      } else {
        result = service.createTeam(this.state.team);
      }

      result
        .then(() => {
          this.setState({
            team: this.state.team
          });
        })
        .catch(error => {
          this.setState(
            Object.assign({}, this.state, {
              error: error.message
            })
          );
        });
    }
  }

  onChange(event) {
    let newState = Object.assign({}, this.state);

    newState.team.name = event.target.value;

    if (event.target.value !== event.target.attributes["value"].value) {
      newState.disabled = "disabled";
    }
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <Link to="/teams">Zurück</Link>
        <form onSubmit={this.save}>
          <div className="form-group">
            <label htmlFor="txtName">Name:</label>
            <input
              id="txtName"
              type="text"
              onChange={this.onChange}
              value={this.state.team.name}
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.state.disabled}
          >
            Übernehmen
          </button>
          <Alert message={this.state.error} />
        </form>
      </div>
    );
  }
}
