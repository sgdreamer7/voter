import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes, routes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {routes.map((route, i) => {
              if (route.redirect || route.path === "/verifyEmail") return null;
              return (
                <ListItem className={classes.inlineBlock} key={i}>
                  <Link to={route.path} className={classes.block}>
                    {route.navbarName}
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a href="/" className={classes.a}>
              Voter
            </a>
            , made with love for a better web
          </span>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.array
};

export default withStyles(footerStyle)(Footer);
