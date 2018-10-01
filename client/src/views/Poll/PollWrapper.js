import React from "react";
import { Route } from "react-router-dom";
import Poll from "./index";

const PollWrapp = () => {
  return (
    <div>
      <Route path={"/poll/:id"} component={Poll} />
    </div>
  );
};

export default PollWrapp;
