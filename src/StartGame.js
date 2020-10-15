import React from "react";
import style from "./style.css";

export default class StartGame 
extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      area: {
        width: 1000,
        height: 1000
      },
      active: {
        class: "ship blink",
        position: {
        x: 60,
        y: 60,
        width: 100,
        height: 20
        },
        rotate: 45
      }
    };

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.transition = this.transition.bind(this);
  }

  render() {
  return (
    <div className="gameArea" style={
      {
      width: this.state.area.width + "px", 
      height: this.state.area.height + "px"
      }
      } onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
    onMouseDown={this.onTouchStart} onMouseUp={this.onTouchEnd} onMouseLeave={this.onTouchEnd} >
      <div className={this.state.active.class} style={
        {
          top: this.state.active.position.y + "px",
          left: this.state.active.position.x + "px",
          transform: "rotate(" + this.state.active.rotate + "deg)",
          width: this.state.active.width + "px",
          height: this.state.active.height + "px"
        }
      } >Schiff</div>
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
    
    if(duration > 500 && !this.state.active.destination) {
      let ship = Object.assign({}, this.state.active, {
        destination: {
          x: e.offsetX,
          y: e.offsetY
        }
      })
      this.setState(Object.assign({}, this.state, {
        active: ship
      }));
      this.timer = setInterval(this.transition, 40);
    }
  }

  transition() {
    let x = this.state.active.destination.x - this.state.active.position.x,
    y = this.state.active.destination.y - this.state.active.position.y
    destRotate = Math.atan2(x,y);

    //if(this.state.active.rotate === destRotate) {
      clearInterval(this.timer);
    //}
  }

  componentWillUnmount() {
    if(this.timer) {
    clearInterval(this.timer);
    }
  }
}
