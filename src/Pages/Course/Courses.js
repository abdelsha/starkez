import React from "react";
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import classes from "./Course.module.css";
import Deadlines from "./Deadlines";
import Status from "./Status";
import StudyHistory from "./StudyHistory";
import { getCoursesAPI, updateCourseInfo } from "../../Redux/Actions/Course";

function CoursePage() {
  
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoursesAPI(userstat));
    dispatch(updateCourseInfo(courseStat));
  }, []);
  return (
    <div className={classes.Layouts}>
      
        <div className={classes.Deadlines}>
          <Deadlines />
          
        </div>
        <div className={classes.Status}>
        <Status />
          
        </div>
        <div className={classes.History}>
        <StudyHistory />
        </div>
        <div className={classes.Button}>
          <Button
            variant="contained"
            href="/Add_Course"
            className={classes.buttons}
            sx={{
              "border-radius": "50%",
              padding: "5px 5px",
              "min-width": "auto",
            }}
          >
            <img src="./images/plus-icon.png" all="" />
          </Button>
        </div>
      
    </div>
  );
}

export default CoursePage;
