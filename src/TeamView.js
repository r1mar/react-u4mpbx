import React from "react";
import { Link } from "react-router-dom";
import service from "./Service";
import Alert from "./Alert";
import TextBox from "./TextBox";
import Form from "./Form";

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
          this.setState({
            errors: [error.message]
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
    let lblId = this.props.match.params.id ? (
      <h1># {this.props.match.params.id}</h1>
    ) : null;

    return (
      <div>
        <Link to="/teams">Zurück</Link>
        {lblId}
        <Form onSubmit={this.save} errors={this.state.errors}>
          <TextBox
            id="txtName"
            label="Name:"
            onChange={this.onChange}
            value={this.state.team.name}
            required
          />
        </Form>
      </div>
    );
  }
}
