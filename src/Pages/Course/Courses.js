import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import "./Course.css";
import Deadlines from "./Deadlines";
import Status from "./PieChart";
import StudyHistory from "./StudyHistory";
import { getCoursesAPI, UpdateCourseInfo } from "../../Redux/Actions/Course";
import { getUserAuth } from "../../Redux/Actions/UserState";
import Project from "../AddCourse/Projects";
import {Redirect } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

function CoursePage() {
  const [loaded, setLoaded] = useState(false);
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  
  const courseStat = useSelector((state) => {
    return state.courseState.courses;
  });
  const courseIsLoaded = useSelector((state) => {
    return state.courseState.course_loaded;
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

  /*useEffect(() => {
    dispatch(getUserAuth());
    if (userstat) {
      //console.log("here")
      dispatch(getCoursesAPI(userstat));

    }
  }, [userstat]);

  useEffect(()=>{
    //console.log("upadated")
    //console.log(courseStat)
    dispatch(UpdateCourseInfo(courseStat));
    
  },[courseStat])
*/

  useEffect(()=>{
    //console.log(courseStat)
    if(assignmentData.length>1){
      setLoaded(()=>true);
    }
    
  },[assignmentData])

 
  return (
    <>
    {!userstat && <Redirect to="/" />}
    {!loaded ? (
  <Box
    sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
  >
    <CircularProgress />
  </Box>):(
    <div className="CoursePage_CommonCards">
      
    <div className="CoursePage_Layouts">
      <div className="CoursePage_BlockCards">
        
        {loaded ? (
          <Deadlines 
          assignments={assignmentData} 
          exams={examData}
          midterms={midtermData} 
          quizes={quizData} 
          projects={projectData} />
        ) : (
          <div />
        )}
      </div>
      <div className="CoursePage_Status">
      <div className="CoursePage_BlockCards">
      {loaded ? (
          <Status assignments={assignmentData} />
        ) : (
          <div />
        )}
       </div>
      </div>
      <div className="CoursePage_History">
      <div className="CoursePage_BlockCards">
      {loaded ? (
          <StudyHistory />
        ) : (
          <div />
        )}
       </div>
      </div>
      <div className="CoursePage_Button">
        <Button
          variant="contained"
          href="/Add_Course"
          className="CoursePage_buttons"
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
    </div>
  )}
  </>
  );
}

export default CoursePage;
