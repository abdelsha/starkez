import { Link } from "react-router-dom";
import React from "react";
import classes from "./NavigationTab.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";

function NavigationTab(props) {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const dispatch = useDispatch();
  return (
    <div className={classes.Layout}>
      <div className={classes.MenuTab}>
        <nav className={classes.NavTab}>
          <a>
            <Link className={classes.Home} to="/Home">Home</Link>

            <Link to="/Courses">Courses</Link>

            <Link to="/Deadlines">Deadlines</Link>

            <Link to="/Study_History">Study - History</Link>
          </a>
          <a>
            <Link className={classes.Home} to="/Friends">Friends</Link>

            <Link  to="/Messages">Messages</Link>
            </a>
            <a>
          
            <Link className={classes.Home} to="/Settings">Settings</Link>
            </a>
          
        </nav>
        
        
      </div>
      <div className={classes.ContentInfo}>
            {props.children}
        </div>
      <div className={classes.MenuBars}>
        <div className={classes.MenuBar}>
          <nav className={classes.NavMenue}>
            <Link to="/Home">Home</Link>

            <Link to="/Courses">Courses</Link>

            <Link to="/Messages">Messages</Link>

            <Link to="/Settings">Settings</Link>
          </nav>
          <div className={classes.User}>
            {userstat && userstat.photoURL ? (
              <img src={userstat.photoURL} all="" />
            ) : (
              <img src="/images/user1.svg" all="" />
            )}
            
          </div>
          
        </div>
        <div className={classes.Signout}> 
              <Button
              sx={{"background-color":"white"}}
              >SignOut</Button>
          </div>
      </div>
    </div>
  );
}

export default NavigationTab;
