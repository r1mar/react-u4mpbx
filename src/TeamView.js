import React from "react";
import { Link } from "react-router-dom";
import service from "./Service";
import Alert from "./Alert";

function TextBox(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label} </label>
      <input id={props.id} name={props.name} type="text" className="form-control" onChange={props.onChange}
      value={props.value} required={props.required} />
    </div>
  );
}

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
          <TextBox id="txtName" label="Name:" name="txtName"
              onChange={this.onChange}
              value={this.state.team.name}
              required />
          <input
            type="submit"
            className="btn btn-primary" />
          <Alert message={this.state.error} />
        </form>
      </div>
    );
  }
}
