import React from "react";
import { Link } from "react-router-dom";
import service from "./Service";
import Form from "./Form";

export default class MatchView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      match: {
      },
      errors: []
    };
    this.save = this.save.bind(this);
    this.onSelectTeam1 = this.onSelectTeam1.bind(this);
  }

  componentDidMount() {
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
  }

  save(event) {
    let result;

    event.preventDefault();

    this.setState({
      errors: []
    })

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
        errors: [error.message
      });
      });

      service
  }

  onSelectTeam1(event) {
    this.setState({
      match: Object.assign({}, this.state.match, {
        team1Id: event.target.value
      })
    });
  }

  render() {
    let teamOptions =this.state.teams.map(team => (
      <option id={team.id}>{team.name}</option>
    )), cmbTeam1 = (
        <select
          id="cmbTeam1"
          type="text"
          className="form-control"
          onChange={this.onSelectTeam1}
          value={workingCopy.team1Id}
        >
          {teamOptions}
        </select>
      );

    return (
      <div>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/matches" className="nav-link">
              Zurück
            </Link>
          </li>
        </ul>
        <Form onSubmit={this.save}>
          <div className="input-group">
            <label htmlFor="txtName" text="Name:" />
            {cmbTeam1}
          </div>
        </Form>
      </div>
    );
  }
}
