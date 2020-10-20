import React from "react";

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { params } = this.props.match;

    return (
      <h1>id ist {params.name}</h1>
    );
  }
}