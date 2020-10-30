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

    newState.selection[event.target.id] = {};

    if (
      this.state.selection &&
      this.state.selection[event.target.id] &&
      this.state.selection[event.target.id].selected
    ) {
      delete newState.selection[event.target.id];
    } else {
      newState.selection[event.target.id].selected = true;
    }

    this.setState(newState);
  }

  render() {
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th colspan={this.props.columns.length + 1} className="text-right">
              <button
                className="btn btn-danger"
                onClick={this.delete}
                disabled={
                  !this.state.selection ||
                  Object.keys(this.state.selection).length === 0
                }
              >
                Löschen
              </button>
            </th>
          </tr>
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
              let selected =
                  this.state.selection &&
                  this.state.selection[row.id.toString()] &&
                  this.state.selection[row.id.toString()].selected,
                attributes = {
                  className: selected ? "table-danger" : ""
                };

              let cells =
                this.props.columns &&
                this.props.columns.map(column => {
                  let content = column.navigation ? (
                    <a
                      id={row.id.toString()}
                      onClick={column.navigation}
                      href="#"
                    >
                      {row[column.name]}
                    </a>
                  ) : (
                    row[column.name]
                  );
                  if (column.name === "id") {
                    return (
                      <th id={row.id.toString()} scope="row" key={column.name}>
                        {content}
                      </th>
                    );
                  } else {
                    return (
                      <td id={row.id.toString()} key={column.name}>
                        {content}
                      </td>
                    );
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
