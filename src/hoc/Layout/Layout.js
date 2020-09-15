import React, { Component } from "react";

import Aux from "../Auxilliary/Auxilliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosed = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToogleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <SideDrawer
          showSidedrawer={this.state.showSideDrawer}
          closed={this.sideDrawerClosed}
        />
        <Toolbar drawerToogleclicked={this.sideDrawerToogleHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
