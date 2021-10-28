import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import classes from "./Course.module.css";
import firebase from "firebase";
import { getCoursesAPI, UpdateCourseInfo } from "../../Redux/Actions/Course";
import { getUserAuth } from "../../Redux/Actions/UserState";
import {useState, useEffect} from 'react'

function Deadlines() {
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
  
  
  return (
    <div className={classes.itema}>
      <div className={classes.Commoncard}>
        Deadlines

        {examData.map((data) => {
            console.log(examData[0])
         
         return(
            <li>{Object.entries(data)[0][0]}</li>
         )
          //console.log(data.courseStart.toDate());
        })}
      </div>
    </div>
  );
}

export default Deadlines;
