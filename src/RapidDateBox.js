import React from "react";
import DateBox from "./DateBox";
import service from "./Service";

export default class RapidDateBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metadata: {},
      errors: []
    };
  }

  async componentDidMount() {
    try {
      this.setState({
        metadata: await service.readMeta(this.props.meta),
        errors: this.props.errors ?? []
      });
    } catch (e) {
      this.setState({
        errors: [e]
      });
    }
  }

  render() {
    return (
      <DateBox
        label={this.state.metadata.label}
        errors={this.state.errors}
        inline={this.props.inline}
        id={this.props.id}
        onChange={this.props.onChange}
        value={this.props.value}
        required={this.state.metadata.required}
        onInternalError={this.props.onInternalError}
      />
    );
  }
}
