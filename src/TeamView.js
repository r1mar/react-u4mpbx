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
          if(error instanceof NotFoundError) {
            this.props.history.push("/not-found");
          } else {
          this.setState({
            errors: [error.message]
          });
          }
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
      if(error instanceof NotFoundError) {
        this.props.history.push("/not-found");
      }
      this.setState({
        errors: [error.message]
      });
    });
  }

  onChange(event) {
    this.setState({
      team: Object.assign({}, this.state.team, {
        name: event.target.value
      })
    });
  }

  render() {
    let title = this.props.match.params.id ? (
      "Verein #" + this.props.match.params.id
    ) : "Neues Spiel";

    return (
      <div>
        <PageHeader title={title} history={this.props.history} />
        <Form onSubmit={this.save} errors={this.state.errors.filter(error => !(error instanceof FieldError))}>
          <TextBox
            id="txtName"
            label="Name:"
            onChange={this.onChange}
            value={this.state.team.name}
            required
            errors={this.state.errors.filter(error => error instanceof FieldError)}
          />
        </Form>
      </div>
    );
  }
}
