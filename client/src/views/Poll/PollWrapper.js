import React from "react";
import { Route } from "react-router-dom";
import Poll from "./index";

const PollWrapp = props => {
  return (
    <div>
      <Route path={"/poll/:id"} component={Poll} />
      {props.location.pathname === "/poll" && <div>No polls selected</div>}
    </div>
  );
};

export default PollWrapp;
