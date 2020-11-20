import React from "react";
import service from "./Service";
import Form from "./Form";
import RapidComboBox from "./RapidComboBox";
import NumberBox from "./NumberBox";
import DateBox from "./DateBox";
import NotFoundError from "./NotFoundError";
import FieldError from "./FieldError";
import PageHeader from "./PageHeader";

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

  async componentDidMount() {
    try {
      this.setState({
        errors: []
      });

      if (this.props.match.params.id) {
        this.setState({
          match: await service.readEntity(
            "/match/" + this.props.match.params.id
          ),
          metadata: await service.readMetadata("/matches")
        });
      }

      this.setState({
        teams: await service.readEntities("/teams")
      });
    } catch (e) {
      if (e instanceof NotFoundError) {
        this.props.history.push("/not-found");
      } else {
        this.setState(state => ({
          errors: [e]
        }));
      }
    }
  }

  async save(event) {
    try {
      let match;
      event.preventDefault();

      this.setState({
        errors: [],
        sent: true
      });

      if (this.props.match.params.id) {
        match = await service.updateEntity(
          "/match/" + this.state.match.id,
          this.state.match
        );
      } else {
        match = await service.createEntity("/matches", this.state.match);

        this.props.history.push("/match/" + match.id);
      }
    } catch (e) {
      this.setState({
        errors: [e]
      });
    }
  }

  onSelectTeam(event) {
    try {
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
    } catch (e) {
      this.setState({
        errors: [e]
      });
    }
  }

  onChangeGameDay(event) {
    try {
      this.setState({
        match: Object.assign({}, this.state.match, {
          gameDay: event.target.value
        }),
        sent: false
      });
    } catch (e) {
      this.setState({
        errors: [e]
      });
    }
  }

  onChangeGoal(event) {
    try {
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
    } catch (e) {
      this.setState({
        errors: [e]
      });
    }
  }

  render() {
    let errors = this.state.errors,
      title;

    try {
      title = this.state.match.id
        ? "Spiel #" + this.state.match.id
        : "Neues Spiel";
    } catch (e) {
      errors = [e];
    }

    return (
      <div>
        <PageHeader title={title} history={this.props.history} />

        <Form onSubmit={this.save} errors={errors} validated={this.state.sent}>
          <DateBox
            id="txtGameday"
            label="Spieltag"
            onChange={this.onChangeGameDay}
            value={this.state.match.gameDay}
            required
            errors={errors.filter(
              error => error instanceof FieldError && error.field === "gameDay"
            )}
          />
          <RapidComboBox
            id="cmbTeam1"
            onChange={this.onSelectTeam}
            value={this.state.match.host.id}
            label={
              this.state.metadata.properties.find(
                property => property.name === "host"
              ).label
            }
            required={
              this.state.metadata.properties.find(
                property => property.name === "host"
              ).required
            }
            options="/teams"
            errors={errors.filter(
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
            errors={errors.filter(
              error => error instanceof FieldError && error.field === "guest.id"
            )}
          />
          <div className="form-row">
            <NumberBox
              id="txtGoals1"
              onChange={this.onChangeGoal}
              value={this.state.match.host.goals}
              required
              errors={errors.filter(
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
              errors={errors.filter(
                error =>
                  error instanceof FieldError && error.field === "guest.goals"
              )}
              inline={true}
              min="0"
            />
          </div>
        </Form>
      </div>
    );
  }
}
