import React from "react";
import Form from "./Form";

export default class RapidForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {},
      properties: [],
      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      let value;

      if(this.props.operation != "create") {
        value = await service.readEntity(this.props.value);

        this.setState({
          value: value
        })
      }

      this.props.properties.forEach(property => {
        this.setState(async (state, props) => ({
          properties: [ ...this.state.properties, {
          path: property.path,
          metadata: await service.readMetadata(property.meta) 
        }]}));
      });

    } catch (e) {
      this.setState({
        errors: [e]
      });
    }
  }

  onSubmit() {

  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        errors={this.state.errors}
      >
        {props.children}

        <input type="submit" className="btn btn-primary" />
        <Alert messages={props.errors} />
      </Form>
    );
  }
}
