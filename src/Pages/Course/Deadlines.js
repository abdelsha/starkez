import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link, SwipeableDrawer } from "@mui/material";
import classes from "./Deadlines.module.css";

import firebase from "firebase";
import {
  getCoursesAPI,
  setDeadlines,
  UpdateCourseInfo,
  
} from "../../Redux/Actions/Course";
import { getUserAuth } from "../../Redux/Actions/UserState";
import { useState, useEffect } from "react";

function Deadlines(props) {
  let totArr = [];
  let totOrdArr = [];
  let arr2 = [];

  const retdeadlines = useSelector((state) => {
    return state.courseState.deadlines;
  });
  const orderdCourse = useSelector((state) => {
    return state.courseState.orderdCourse;
  });
  const dispatch = useDispatch();
  
  useEffect(() => {
    totOrdArr = retdeadlines;
    totArr = orderdCourse;
  }, [retdeadlines]);

  const dateMaker = (date) => {
    let dates =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    return dates;
  };
  return (
    <div className={classes.Layouts}>
      <div className={classes.Deadline}>
        <div className={classes.Commoncard}>
          <h2>Deadlines</h2>
          
          {retdeadlines.map((data, key) => {
            //console.log(data.date.toDate())
            return (
              <div className={classes.DataDisplays}>
                <div className={classes.Commoncards}>
                  <div className={classes.DeadLineText}>
                    <span>Course Name: {data.courseName}</span>
                    <span>Description: {data.desc}</span>
                    <span>
                      Due Date: {dateMaker(data.date.toDate()).toString()}
                    </span>
                  </div>
                  {/*data.toDateString()*/}
                </div>
              </div>
            );

            /*return(
            <li>{Object.entries(data)[0][0]}</li>
         )*/
            //console.log(data.courseStart.toDate());
          })}
          {/*
          <div>
            <button onClick={()=>{dateArry()}}>sort</button>
          </div>*/}
        </div>
      </div>
    </div>
  );
}

export default Deadlines;
