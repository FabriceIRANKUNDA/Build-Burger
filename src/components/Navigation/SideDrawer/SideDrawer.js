import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import BackDrop from "../../UI/BackDrop/BackDrop";

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.showSidedrawer)
    attachedClasses = [classes.SideDrawer, classes.Open];
  return (
    <Aux>
      <BackDrop show={props.showSidedrawer} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
