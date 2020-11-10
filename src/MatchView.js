import React from "react";
import { Link } from "react-router-dom";
import service from "./Service";
import Form from "./Form";
import ComboBox from "./ComboBox";

export default class MatchView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      match: {},
      errors: [],
      teams: []
    };
    this.save = this.save.bind(this);
    this.onSelectTeam = this.onSelectTeam.bind(this);
  }

  componentDidMount() {
    this.setState({
      errors: []
    });

    if (this.props.match.params.id) {
      service
        .readMatch(this.props.match.params.id)
        .then(match => {
          this.setState({
            match: match,
            errors: []
          });
        })
        .catch(error => {
          this.setState((state, props) => ({
            errors: [...state.errors, error.message]
          }));
        });
    }

    service
      .readTeams()
      .then(teams => {
        this.setState({
          teams: teams
        });
      })
      .catch(error => {
        this.setState((state, props) => ({
          errors: [...state.errors, error.message]
        }));
      });
  }

  save(event) {
    let result;

    event.preventDefault();

    this.setState({
      errors: []
    });

    if (this.props.match.params.id) {
      result = service.updateMatch(this.state.match);
    } else {
      result = service.createMatch(this.state.match);

      result.then(match => {
        this.props.history.push("/match/" + match.id);
      });
    }

    result.catch(error => {
      this.setState({
        errors: [error.message]
      });
    });
  }

  onSelectTeam(event) {
    let newMatch = Object.assign({}, this.state.match);

    if (event.target.id === "cmbTeam1") {
      newMatch.teamId1 = event.target.id;
    } else {
      newMatch.teamId2 = event.target.id;
    }

    this.setState({
      match: newMatch
    });
  }

  render() {
    return (
      <div>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/matches" className="nav-link">
              Zurück
            </Link>
          </li>
        </ul>
        <Form onSubmit={this.save} errors={this.state.errors}>
          <ComboBox
            id="cmbTeam1"
            label="Gastgeber:"
            onChange={this.onSelectTeam}
            options={this.state.teams.map(team => ({
              id: team.id,
              value: team.name
            }))}
          />
          <ComboBox
            id="cmbTeam2"
            label="Gast:"
            onChange={this.onSelectTeam}
            options={this.state.teams.map(team => ({
              id: team.id,
              value: team.name
            }))}
          />
          <NumberBox id="txtTore1" onChange={this.onChangeGoal}
            value={this.state.match.team1Goals}
        </Form>
      </div>
    );
  }
}
