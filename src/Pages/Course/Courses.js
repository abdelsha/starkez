import React from "react";
import { useState, useEffect } from "react";
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
  const [loaded, setLoaded] = useState("false");
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  
  const courseStat = useSelector((state) => {
    return state.courseState.courses;
  });
  const examData = useSelector((state) => {
    return state.courseState.examData;
  });
  const midtermData = useSelector((state) => {
    return state.courseState.midtermData;
  });
  const projectData = useSelector((state) => {
    return state.courseState.projectData;
  });
  const quizData = useSelector((state) => {
    return state.courseState.quizData;
  });
  const assignmentData = useSelector((state) => {
    return state.courseState.assignmentData;
  });
  const courseData = useSelector((state) => {
    return state.courseState.courseData;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAuth());
    if (userstat) {
      //console.log("here")
      dispatch(getCoursesAPI(userstat));
      

        
        
      
    }
  }, [userstat]);

  useEffect(()=>{
    //console.log("upadated")
   // console.log(courseStat)
    dispatch(UpdateCourseInfo(courseStat));
    
  },[courseStat])
  useEffect(()=>{
    //console.log(assignmentData)
    if(assignmentData.length>1){
      setLoaded("true");
    }
    
  },[assignmentData])

  return (
    <div className={classes.Layouts}>
      <div className={classes.Deadline}>
        
        {loaded == "true" ? (
          <Deadlines assignments={assignmentData} />
        ) : (
          <div />
        )}
      </div>
      <div className={classes.Status}>
      {loaded == "true" ? (
          <Status assignments={assignmentData} />
        ) : (
          <div />
        )}
       
      </div>
      <div className={classes.History}>
      {loaded == "true" ? (
          <StudyHistory />
        ) : (
          <div />
        )}
       
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
