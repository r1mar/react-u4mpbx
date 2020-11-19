import React from "react";
import service from "./Service";
import FieldError from "./FieldError";
import TextBox from "./TextBox";
import Form from "./Form";
import PageHeader from "./PageHeader";
import NotFoundError from "./NotFoundError";

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: {
        name: ""
      },
      errors: []
    };
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    try {
      if (this.props.match.params.id) {
        let team = await service.readEntities(
          "/team/" + this.props.match.params.id
        );

        this.setState({
          team: team
        });
      } else {
        this.setState({
          team: {
            name: ""
          }
        });
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        this.props.history.push("/not-found");
      } else {
        this.setState({
          errors: [e]
        });
      }
    }
  }

  async save(event) {
    try {
      event.preventDefault();

      let team;
      if (this.props.match.params.id) {
        team = await service.updateTeam(this.state.team);
      } else {
        team = await service.createEntity("/team", this.state.team);
        this.props.history.replace("/team/" + team.id);
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        this.props.history.push("/not-found");
      }
      this.setState({
        errors: [e]
      });
    }
  }

  onChange(event) {
    try {
      this.setState({
        team: Object.assign({}, this.state.team, {
          name: event.target.value
        })
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
      title = this.props.match.params.id
        ? "Verein #" + this.props.match.params.id
        : "Neues Spiel";
    } catch (e) {
      errors = [e];
    }

    return (
      <div>
        <PageHeader title={title} history={this.props.history} />
        <Form
          onSubmit={this.save}
          errors={errors.filter(error => !(error instanceof FieldError))}
        >
          <TextBox
            id="txtName"
            label="Name:"
            onChange={this.onChange}
            value={this.state.team.name}
            required
            errors={errors.filter(error => error instanceof FieldError)}
          />
        </Form>
      </div>
    );
  }
}
