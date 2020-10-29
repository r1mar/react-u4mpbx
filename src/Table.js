import React from "react";

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.toggleSelection = this.toggleSelection.bind(this);
  }

  toggleSelection(event) {
    let newState = {
      selection: Object.assign({}, this.state.selection)
    };

    newState.selection[event.target.key] = {};
    newState.selection[event.target.key].selected = !(this.state.selection && this.state.selection[
      event.target.key
    ] && this.state.selection[
      event.target.key
    ].selected);
    this.setState(newState);
  }

  render() {
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {this.props.columns &&
              this.props.columns.map(column => {
                return (
                  <th key={column.name} scope="col">
                    {column.label}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {this.props.rows &&
            this.props.rows.map(row => {
              let selected = this.state.selection && this.state.selection[row.id.toString()] &&this.state.selection[row.id.toString()].selected,
                attributes = {
                  className: selected ? "table-danger" : ""
                };

              let cells =
                this.props.columns &&
                this.props.columns.map(column => {
                  if (column.name === "id") {
                    return (
                      <th scope="row" key={column.name}>
                        {row[column.name]}
                      </th>
                    );
                  } else {
                    return <td key={column.name}>{row[column.name]}</td>; //className="table-danger" scope="row"
                  }
                });

              return (
                <tr
                  {...attributes}
                  key={row.id.toString()}
                  onClick={this.toggleSelection}
                >
                  {cells}
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}
