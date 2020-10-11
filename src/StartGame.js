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
    }
  }

  render() {
  return (
    <div className="gameArea">
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
      tapStartAt: getTime()
    }));
  }

  onTouchEnd(e) {

  }

  onMouseDown(e) {

  }

  onMouseUp(e) {

  }

  onMouseLeave(e) {

  }
}
