import React from "react";
import FormGroup from "./FormGroup";

export default class DateBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    this.onInternalError = this.onInternalError.bind(this);
  }

  componentDidMount() {
    if (this.props.errors.length) {
      this.setState({
        errors: this.props.errors
      });
    }

    alert(JSON.stringify(this.props.errors.length));
  }

  onInternalError(e) {
    this.setState({
      errors: [e]
    });
  }

  render() {
    return (
      <FormGroup
        forId={this.props.id}
        label={this.props.label}
        errors={this.state.errors}
        inline={this.props.inline}
        onInternalError={this.onInternalError}
      >
        <input
          id={this.props.id}
          name={this.props.id}
          type="date"
          className={
            this.state.errors.length
              ? "form-control is-invalid"
              : "form-control"
          }
          onChange={this.props.onChange}
          value={this.props.value}
          required={this.props.required}
        />
      </FormGroup>
    );
  }
}
