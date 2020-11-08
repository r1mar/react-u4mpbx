import React from "react";
import { Link } from "react-router-dom";
import service from "./Service";
import Form from "./Form";
import ComboBox from "./file2";

export default class MatchView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      match: {},
      errors: [],
      teams: []
    };
    this.save = this.save.bind(this);
    this.onSelectTeam1 = this.onSelectTeam1.bind(this);
  }

  componentDidMount() {
    this.setState({
      errors: []
    })

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

    service.readTeams().then(teams => {
      this.setState({
        teams: teams
      });
    }).catch(error => {
      this.setState((state, props) => ({
        errors: [...state.errors, error.message]
      }));
    })
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
        errors: [error.message]
      });
      });

  }

  onSelectTeam1(event) {
    this.setState({
      match: Object.assign({}, this.state.match, {
        team1Id: event.target.value
      })
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
          <ComboBox label="Gastgeber:" onChange={this.onSelectTeam1} options={this.state.teams.map(team => ({
            id: team.id,
            value: team.name
          }))} />
        </Form>
      </div>
    );
  }
}
