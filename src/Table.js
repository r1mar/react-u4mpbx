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

    console.log(event.target);

    newState.selection[event.target.id] = {};

    if(this.state.selection && this.state.selection) {}
    newState.selection[event.target.id].selected = !(this.state.selection && this.state.selection[
      event.target.id
    ] && this.state.selection[
      event.target.id
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
                    {JSON.stringify(this.state)}
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
                      <th id={row.id.toString()} scope="row" key={column.name}>
                        {row[column.name]}
                      </th>
                    );
                  } else {
                    return <td id={row.id.toString()} key={column.name}>{row[column.name]}</td>; //className="table-danger" scope="row"
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
