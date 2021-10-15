import { Link } from "react-router-dom";
import React from "react";
import classes from './NavigationBar.module.css'

function NavigationBar() {
    return (
        <div className={classes.NavBar}>
        <div className={classes.NavTab}>tab</div>
        <nav className={classes.NavMenue}>
          <Link to="/Home">Home</Link>

          <Link to="/Courses">Courses</Link>

          <Link to="/Deadlines">Deadlines</Link>
          
          <Link to="/Study_History">Study_History</Link>

          <Link to="/Friends">Friends</Link>

          <Link to="/Messages">Messages</Link>
          
          <Link to="/Messages">Settings</Link>
        </nav>
        <div className={classes.User}>
            <img src="/images/user1.svg" all=""/>
        </div>
      </div>
    )
}

export default NavigationBar;