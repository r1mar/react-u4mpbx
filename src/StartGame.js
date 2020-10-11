import React from "react";
import style from "./style.css";

export default class StartGame 
extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: {
        class: "ship",
        position: {
          x: "10em",
          y: "10em"
        }
      }
    };

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  render() {
  return (
    <div className="gameArea" onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
    onMouseDown={this.onTouchStart} onMouseUp={this.onTouchEnd} onMouseLeave={this.onTouchEnd} >
      <div className="ship" style={
        {
          top: this.state.active.position.y,
          left: this.state.active.position.x
        }
      } />
      <div className="orbit">
        <div className="planet" />
      </div>
    </div>
  );
  }

  onTouchStart(e) {
    this.setState(Object.assign({}, this.state, {
      tapStartAt: new Date()
    }));
  }

  onTouchEnd(e) {
    let duration = new Date() - this.state.tapStartAt;
    alert(duration);
  }
}
