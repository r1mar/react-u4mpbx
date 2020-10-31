import React from "react";
import { Link } from "react-router-dom";
import style from "./style.css";
import service from "./Service";
import Alert from "./Alert";
import Table from "./Table";

export default class TeamsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: []
    };

    this.delete = this.delete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showTeam = this.showTeam.bind(this);
    this.deleteTeams = this.deleteTeams.bind(this);
    this.createTeam = this.createTeam.bind(this);
  }

  componentDidMount() {
    service.readTeams().then(teams => {
      this.setState({
        teams: teams
      });
    });
  }

  delete() {
    let toDeleteIds = [],
      toDeleteTeams = [];

    this.state.teams.forEach(team => {
      if (team.selected) {
        toDeleteIds.push(team.id);
        toDeleteTeams.push(team);
      }
    });

    service.deleteTeams(toDeleteIds).catch(error => {
      this.setState(
        Object.assign({}, this.state, {
          error: error.message
        })
      );
    });

    this.setState({
      teams: this.state.teams.filter(team => toDeleteTeams.indexOf(team) === -1)
    });
  }

  deleteTeams(ids, items) {
    let result = service.deleteTeams(ids);
    
    result.then(() => {
      this.setState({
        teams: this.state.teams.filter(team => items.indexOf(team) === -1)
      });
    }).catch(error => {
      this.setState(Object.assign({}, this.state, {
        error: error.message
      }))
    });

    return result;
  }

  createTeam() {
    this.props.history.push("/team");
  }

  onChange(event) {
    let team = this.state.teams.filter(team => team.id == event.target.id);

    team = Object.assign({}, team);
    team.selected = event.target.checked;
    this.setState({
      teams: this.state.teams.map(team => {
        if (team.id == event.target.id) {
          team.selected = event.target.checked;
        }

        return team;
      })
    });
  }

  showTeam(event) {
    event.preventDefault();

    this.props.history.push("/team/" + event.target.id);
  }

  render() {
    let teamsSnippet =
      this.state.teams &&
      this.state.teams.map(team => (
        <li key={team.id.toString()}>
          <input
            type="checkbox"
            id={team.id.toString()}
            value={team.selected}
            onChange={this.onChange}
          />
          <label htmlFor={team.id.toString()}>
            <Link className="nav-link" to={"/team/" + team.id}>
              {team.name}
            </Link>
          </label>
        </li>
      ));

    return (
      <div>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Zurück
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/team" className="nav-link">
              Neu
            </Link>
          </li>
        </ul>
        <Table
          rows={this.state.teams}
          columns={[
            {
              label: "#",
              name: "id"
            },
            {
              label: "Name",
              name: "name",
              navigation: this.showTeam
            }
          ]} delete={this.deleteTeams} create={this.createTeam}
        />
        <ol className="nav flex-column">{teamsSnippet}</ol>
        <button className="btn btn-danger" onClick={this.delete}>
          Löschen
        </button>
        <Alert message={this.state.error} />
      </div>
    );
  }
}
