import React from "react";
import { Link } from "react-router-dom";
import style from "./style.css";
import service from "./Service";
import Alert from "./Alert";
import Table from "./Table";
import PageHeader from "./PageHeader";

export default class TeamsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      errors: []
    };

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

  deleteTeams(ids, items) {
    let result = service.deleteTeams(ids);

    result
      .then(() => {
        this.setState({
          teams: this.state.teams.filter(team => items.indexOf(team) === -1)
        });
      })
      .catch(error => {
        this.setState(
          Object.assign({}, this.state, {
            errors: [error.message]
          })
        );
      });

    return result;
  }

  createTeam() {
    this.props.history.push("/team");
  }

  showTeam(event) {
    event.preventDefault();

    this.props.history.push("/team/" + event.target.id);
  }

  render() {
    return (
      <div>
        <PageHeader title="Vereine" history={this.props.history} />

        <Table
          rows={this.state.teams}
          columns={[
            {
              id: 1,
              label: "#",
              name: "id"
            },
            {
              id: 2,
              label: "Name",
              name: "name",
              navigation: this.showTeam
            }
          ]}
          delete={this.deleteTeams}
          create={this.createTeam}
        />

        <Alert messages={this.state.errors} />
      </div>
    );
  }
}
