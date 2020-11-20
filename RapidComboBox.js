import React from "react";
import service from "./Service";

export default class RapidCompoBox {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      errors: props.errors
    };

    this.mapOptions = this.mapOptions.bind(this);
  }

  async componentDidMount() {
    try {
      if (this.props.options) {
        this.setState({
          options: await service.readEntities(this.props.options),
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
      name;

    this.state.optionsMetadata.properties.forEach(meta => {
      if (meta.isKey) {
        id += optionInput[meta.name];
      }

      if (meta.isName) {
        name = optionInput[meta.name];
      }
    });

    return {
      id: id,
      name: name
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
