import React from "react";
import Form from "./Form";

export default class RapidForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      object: {},
      metadata: {},
      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({
        metadata: await service.readMetadata(this.props.meta)
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
        className={props.validated ? "form-validated" : ""}
      >
        {props.children}

        <input type="submit" className="btn btn-primary" />
        <Alert messages={props.errors} />
      </Form>
    );
  }
}
