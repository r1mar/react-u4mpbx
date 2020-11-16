import React from "react";
import { Link } from "react-router-dom";
import service from "./Service";
import Form from "./Form";
import ComboBox from "./ComboBox";
import NumberBox from "./NumberBox";
import DateBox from "./DateBox";
import NotFoundError from "./NotFoundError";
import FieldError from "./FieldError";
import bootstrap from "bootstrap-icons/icons/bootstrap.svg";

export default class MatchView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      match: {
        gameDay: "",
        host: {
          goals: 0
        },
        guest: {
          goals: 0
        }
      },
      errors: [],
      teams: []
    };
    this.save = this.save.bind(this);
    this.onSelectTeam = this.onSelectTeam.bind(this);
    this.onChangeGoal = this.onChangeGoal.bind(this);
    this.onChangeGameDay = this.onChangeGameDay.bind(this);
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
          if (error instanceof NotFoundError) {
            this.props.history.push("/not-found");
          } else {
            this.setState((state, props) => ({
              errors: [...state.errors, error]
            }));
          }
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
          errors: [...state.errors, error]
        }));
      });
  }

  save(event) {
    let result;

    event.preventDefault();

    this.setState({
      errors: [],
      sent: true
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
        errors: [error]
      });
    });
  }

  onSelectTeam(event) {
    let newMatch = Object.assign({}, this.state.match),
      team = this.state.teams.find(team => team.id === +event.target.value);

    if (event.target.id === "cmbTeam1") {
      newMatch.host = Object.assign({}, this.state.match.host, team);
    } else {
      newMatch.guest = Object.assign({}, this.state.match.guest, team);
    }

    this.setState({
      match: newMatch,
      sent: false
    });
  }

  onChangeGameDay(event) {
    this.setState({
      match: Object.assign({}, this.state.match, {
        gameDay: event.target.value
      }),
      sent: false
    });
  }

  onChangeGoal(event) {
    let newMatch = Object.assign({}, this.state.match);

    if (event.target.id === "txtGoals1") {
      newMatch.host.goals = Number.isInteger(event.target.value)
        ? +event.target.value
        : event.target.value;
    } else {
      newMatch.guest.goals = Number.isInteger(event.target.value)
        ? +event.target.value
        : event.target.value;
    }

    this.setState({
      match: newMatch,
      sent: false
    });
  }

  render() {
    let lblId = this.state.match.id ? <h1># {this.state.match.id}</h1> : null;

    return (
      <div>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/matches" className="nav-link">
              Zurück
            </Link>
          </li>
        </ul>
        <img src={bootstrap} />
        <div>{lblId}</div>
        <Form
          onSubmit={this.save}
          errors={this.state.errors}
          validated={this.state.sent}
        >
          <DateBox
            id="txtGameday"
            label="Spieltag"
            onChange={this.onChangeGameDay}
            value={this.state.match.gameDay}
            required
            errors={this.state.errors.filter(
              error => error instanceof FieldError && error.field === "gameDay"
            )}
          />
          <ComboBox
            id="cmbTeam1"
            label="Gastgeber:"
            onChange={this.onSelectTeam}
            options={this.state.teams.map(team => ({
              id: team.id,
              value: team.name
            }))}
            value={this.state.match.host.id}
            required
            errors={this.state.errors.filter(
              error => error instanceof FieldError && error.field === "host.id"
            )}
          />
          <ComboBox
            id="cmbTeam2"
            label="Gast:"
            onChange={this.onSelectTeam}
            options={this.state.teams.map(team => ({
              id: team.id,
              value: team.name
            }))}
            value={this.state.match.guest.id}
            required
            errors={this.state.errors.filter(
              error => error instanceof FieldError && error.field === "guest.id"
            )}
            min="0"
          />
          <div className="form-row">
            <NumberBox
              id="txtGoals1"
              onChange={this.onChangeGoal}
              value={this.state.match.host.goals}
              required
              errors={this.state.errors.filter(
                error =>
                  error instanceof FieldError && error.field === "host.goals"
              )}
              min="0"
              inline={true}
            />
            <NumberBox
              id="txtGoals2"
              onChange={this.onChangeGoal}
              value={this.state.match.guest.goals}
              required
              errors={this.state.errors.filter(
                error =>
                  error instanceof FieldError && error.field === "guest.goals"
              )}
              inline={true}
            />
          </div>
        </Form>
      </div>
    );
  }
}
