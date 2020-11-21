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
          optionsMetadata: await service.readMetadata(this.props.options)
        });
      }
    } catch (e) {
      this.setState({
        errors: [e]
      });
    }
  }

  mapOptions(optionInput) {
    let id = "",
      value;

    this.state.optionsMetadata.forEach(meta => {
      if (meta.isKey) {
        id += optionInput[meta.name];
      }

      if (meta.isName) {
        value = optionInput[meta.name];
      }
    });

    return {
      id: id,
      value: value
    };
  }

  render() {
    return (
      <ComboBox
        id={this.props.id}
        label={this.props.label}
        onChange={this.props.onChange}
        options={this.state.options.map(this.mapOptions)}
        value={this.props.value}
        required={this.props.required}
        errors={this.state.errors}
      />
    );
  }
}
