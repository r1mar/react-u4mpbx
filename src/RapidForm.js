import React from "react";
import Form from "./Form";
import NotFoundError from "./NotFoundError";

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
      if(e instanceof NotFoundError) {
        this.props.history.push(this.props.notFound);
      } else {
      this.setState({
        errors: [e]
      });}
    }
  }

  async onSubmit() {
    try {
      if(this.props.operation === "create") {
        this.props.created(await service.createEntity(this.props.value, this.state.value));
      } else {
        await service.updateEntity(this.props.value, this.state.value);
      }
    } catch(e) {
      this.setState({
        errors: [e]
      });
    }
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
