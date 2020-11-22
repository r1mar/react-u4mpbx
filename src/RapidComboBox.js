import React from "react";
import service from "./Service";
import ComboBox from "./ComboBox";

export default class RapidComboBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      errors: props.errors,
      metadata: {}
    };

    this.mapOptions = this.mapOptions.bind(this);
  }

  async componentDidMount() {
    try {
      if (this.props.options) {
        let metadata = await service.readMetadata(this.props.meta);

        this.setState({
          options: await service.readEntities(metadata.valueList.path),
          metadata: metadata
        });
      }
    } catch (e) {
      this.setState({
        errors: [e]
      });
    }
  }

  mapOptions(optionInput) {
    let id = optionInput[this.state.metadata.valueList.id],
      value = optionInput[this.state.metadata.valueList.value];

    return {
      id: id,
      value: value
    };
  }

  render() {
    return (
      <ComboBox
        id={this.props.id}
        label={this.state.metadata.label}
        onChange={this.props.onChange}
        options={this.state.options.map(this.mapOptions)}
        value={this.props.value}
        required={this.state.metadata.required}
        errors={this.state.errors}
      />
    );
  }
}
