import React from "react";
import { Link } from "react-router-dom";
import service from "./Service";
import Alert from "./Alert";

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      original: {
        name: ""
      },
      workingCopy: {
        name: ""
      }
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
            original: team,
            workingCopy: Object.assign({}, team)
          });
        })
        .catch(error => {
          this.setState({
            error: error.message
          });
        });
    } else {
      this.setState({
        original: {
          name: ""
        },
        workingCopy: {
          name: ""
        }
      });
    }
  }

  save(event) {
    event.preventDefault();

    if (this.state.original.name !== this.state.workingCopy.name) {
      let result;
      if (this.props.match.params.id) {
        result = service.updateTeam(this.state.workingCopy);
      } else {
        result = service.createTeam(this.state.workingCopy);
      }

      result.then(() => {
      this.setState({
        original: this.state.workingCopy,
        workingCopy: Object.assign({}, this.state.workingCopy)
      });
      }).catch(error => {
        this.setState(Object.assign({}, this.state, {
          error: error.message
        }));
      });
    }
  }

  onChange(event) {
    let newState = Object.assign({}, this.state);

    newState.workingCopy.name = event.target.value;
    this.setState(newState);
  }

  render() {
    let original, workingCopy, txtInput, btnSave;

    if (this.state.original) {
      (original = this.state.original),
        (workingCopy = this.state.workingCopy),
        (txtInput = (
          <input
            id="txtName"
            type="text"
            onChange={this.onChange}
            value={workingCopy.name}
            className="form-control"
          />
        )),
        (btnSave = (
          <button
            type="submit"
            className="btn btn-primary"
            disabled={original.name === workingCopy.name ? "disabled" : ""}
          >
            Übernehmen
          </button>
        ));
    }

    return (
      <div>
        <Link to="/teams">Zurück</Link>
        <form onSubmit={this.save}>
          <div className="form-group">
            <label htmlFor="txtName">Name:</label>
            {txtInput}
          </div>
          {btnSave}
          <Alert message={this.state.error} />
        </form>
      </div>
    );
  }
}
