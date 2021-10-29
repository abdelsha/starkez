import React from "react";
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import classes from "./Course.module.css";
import Deadlines from "./Deadlines";
import Status from "./Status";
import StudyHistory from "./StudyHistory";
import { getCoursesAPI, UpdateCourseInfo } from "../../Redux/Actions/Course";
import { getUserAuth } from "../../Redux/Actions/UserState";
import Project from "../AddCourse/Projects";

function CoursePage() {
  
  const userstat = useSelector((state) => {
    
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });
  const examData = useSelector((state)=>{
    return state.courseState.examData;
  })
  const midtermData = useSelector((state)=>{
    return state.courseState.midtermData;
  })
  const projectData = useSelector((state)=>{
    return state.courseState.projectData;
  })
  const quizData= useSelector((state)=>{
    return state.courseState.quizData;
  })
  const assignmentData= useSelector((state)=>{
    return state.courseState.assignmentData;
  })
  const courseData= useSelector((state)=>{
    return state.courseState.courseData;
  })

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAuth())
    if (userstat){
      dispatch(getCoursesAPI(userstat));
      dispatch(UpdateCourseInfo(courseStat));
    }
  },[]);
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
