import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">orders</NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">login</NavigationItem>
    ) : (
      <NavigationItem link="/logout">logout</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
