import React from "react";

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {this.props.columns &&
              this.props.columns.map(column => {
                return <th scope="col">{column.label}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {this.props.rows &&
            this.props.rows.map(row => {
              let cells =
                this.props.columns &&
                this.props.columns.map(column => {
                  return <th>{row[column.name]}</th>; //className="table-danger" scope="row"
                });

              return <tr>{cells}</tr>;
            })}
        </tbody>
      </table>
    );
  }
}
