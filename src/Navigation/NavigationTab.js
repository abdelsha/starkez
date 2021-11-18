import { Link } from "react-router-dom";
import React from "react";
import classes from "./NavigationTab.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { signOutApi } from "../Redux/Actions/UserState";

function NavigationTab(props) {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(signOutApi());
    
    
  };
  return (
    <div className={classes.Layout}>
      <div className={classes.MenuTab}>
        <nav className={classes.NavTab}>
          <a>
          <Button variant="text">
          <img 
              src="/images/Home.png" alt=""/>
            <Link className={classes.Home} to="/Home">Home</Link>
            </Button>
            
            <Button variant="text">
            <img 
              src="/images/course.png" alt=""/>
              <Link to="/Courses">Courses</Link>
              </Button>
            
            <Button variant="text">
            <img 
              src="/images/deadline.png" alt=""/>
              <Link to="/Deadlines">Deadlines</Link>
              </Button>
            
            <Button variant="text">
            <img 
              src="/images/study.png" alt=""/>
              <Link to="/Study_History">Study - History</Link>
              </Button>
            
          </a>
          <a>
          <Button variant="text">
          <img 
              src="/images/friend.png" alt=""/>
            <Link className={classes.Home} to="/Friends">Friends</Link>
            </Button>
            
            <Button variant="text">
            <img 
              src="/images/message.png" alt=""/>
              <Link  to="/Messages">Messages</Link>
              </Button>
              <Button variant="text">
            <img 
              src="/images/call.png" alt=""/>
              <Link  to="/Video">Video</Link>
              </Button>
            
            </a>
            <a>
            <Button variant="text">
            <img 
              src="/images/setting.png" alt=""/>
              <Link className={classes.Home} to="/Settings">Settings</Link>
              </Button>
            
            </a>
          
        </nav>
        
        
      </div>
      <div className={classes.ContentInfo}>
            {props.children}
        </div>
      <div className={classes.MenuBars}>
        <div className={classes.MenuBar}>
          <nav className={classes.NavMenue}>
            
          <Button variant="text">
          <img 
              src="/images/course.png" alt=""/>
            <Link className={classes.links} to="/Courses">Courses</Link>
            </Button>
            
            <Button variant="text">
            <img 
              src="/images/deadline.png" alt=""/>
              <Link className={classes.links} to="/Deadlines">Deadlines</Link>
              </Button>

            <Button variant="text">
            <img 
              src="/images/message.png" alt=""/>
              <Link className={classes.links} to="/Messages">Messages</Link>
              </Button>
            
            <Button variant="text">
            <img 
              src="/images/setting.png" alt=""/>
              <Link className={classes.links} to="/Settings">Settings</Link>
              </Button>
      
          </nav>
          <div className={classes.User}>
            <div className={classes.Users}>
            {userstat && userstat.photoURL ? (
              <img src={userstat.photoURL} all="" />
            ) : (
              <img src="/images/user1.svg" all="" />
            )}
            </div>
            <div className={classes.Signout}> 
              <Button
              sx={{"background-color":"white"}}
              onClick={() => {
                signOut()
              }}
              >SignOut</Button>
          </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

export default NavigationTab;
