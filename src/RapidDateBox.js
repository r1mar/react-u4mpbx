import React from "react";
import DateBox from "./DateBox";
import service from "./Service";

export default class RapidDateBox extends React.Component {
  constructor(props) {
    this.state = {
      metadata:{},
      errors: peops.error ?? []
    }
  } 

  async componentDidMount() {
    try {
      this.setState({
        metadata: await service.readMeta(this.props.meta)
      });
    } catch(e) {
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
      inline={props.inline}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
        required={this.state.metadata.required}
    </DateBox>
  );
}}