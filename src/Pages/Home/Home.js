import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import { signOutApi } from "../../Redux/Actions/UserState";
import { Redirect } from "react-router-dom";
import classes from "./Home.module.css";

function HomePage() {
  var redirectReq = 0;
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
    <div className={classes.Layouts}>
      <div className={classes.Courses}>
        <div className={classes.CommonCard}>Courses</div>
      </div>
      <div className={classes.Deadlines}>
        <div className={classes.CommonCard}>Deadlines</div>
      </div>
      <div className={classes.Friends}>
        <div className={classes.CommonCard}>Friends</div>
      </div>
      <div className={classes.CourseDetail}>
        <div className={classes.CommonCard}>Course Detail</div>
      </div>
      <div className={classes.Messages}>
        <div className={classes.CommonCard}>Messages</div>
      </div>
      <div className={classes.Videos}>
        <div className={classes.CommonCard}>Videos</div>
      </div>
      <div className={classes.StudySession}>
        <div className={classes.CommonCard}>Study Session</div>
      </div>
      <div className={classes.StudyHistory}>
        <div className={classes.CommonCard}>Study History</div>
      </div>
      <div className={classes.Encouraging}>
        <div className={classes.CommonCard}>
          Encouraging words
          <Button
            variant="contained"
            onClick={() => {
              signOut();
            }}
          >
            SignOut
          </Button>
          <Button variant="contained">
            <Link
              href="/"
              underline="none"
              sx={{
                color: "white",
              }}
            >
              SignIn
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
