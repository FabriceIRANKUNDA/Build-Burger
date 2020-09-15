import React, { Component } from "react";
import classes from "./Model.css";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import BackDrop from "../BackDrop/BackDrop";

class Model extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <Aux>
        <BackDrop show={this.props.show} clicked={this.props.modelClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Model;
