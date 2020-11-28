import React from "react";
import Form from "./Form";
import NotFoundError from "./NotFoundError";
import RapidTextBox from "./RapidTextBox";

export default class RapidForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {},
      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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

  getValue() {

  }

  onChange() {
    
  }

  render() {
    let children = this.props.properties.map(property => {
      switch(property.metadata.type) {
        case "string": return (
          <TextBox id={property.path} value={this.getValue(property.path)} onChange={this.onChange} errors={this.state.errors.filter(error => error.path === property.path)} meta={property.meta} />
        );
      }
    });

    return (
      <Form
        onSubmit={this.onSubmit}
        errors={this.state.errors}
      >
        {children}
      </Form>
    );
  }
}
