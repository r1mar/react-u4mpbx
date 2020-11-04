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

      let result;
      if (this.props.match.params.id) {
        result = service.updateTeam(this.state.team);

      } else {
        result = service.createTeam(this.state.team);
        result.then(team => {
          this.props.history.push("/team/" + team.id);
        });

      }

      result.catch(error => {
          this.setState({
              error: error.message
            });
        });
  }

  onChange(event) {
    this.setState({
      team: {
        name: event.target.value
      }
    });
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
              name="txtName"
              onChange={this.onChange}
              value={this.state.team.name}
              className="form-control"
              required />
          </div>
          <input
            type="submit"
            className="btn btn-primary" />
          <Alert message={this.state.error} />
        </form>
      </div>
    );
  }
}
