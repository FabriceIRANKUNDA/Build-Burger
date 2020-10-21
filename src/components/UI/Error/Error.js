import React from "react";

import classes from "./Error.css";

const error = props => {
  return <div className={classes.Error}>{props.children}</div>;
};

export default error;
