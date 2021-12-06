import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link, SwipeableDrawer } from "@mui/material";
import "./Deadlines.css";

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
    //console.log(orderdCourse)
  }, [retdeadlines]);

  const dateMaker = (date) => {
    let dates =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    return dates;
  };

  const currentDate = new Date();
  return (
    
    
      <>
          <h2>Deadlines</h2>
          {retdeadlines?(
            <div>
            {orderdCourse.map((data, key) => {
              //console.log(data.date.toDate())
              return (
                <div className="Deadline_DataDisplays" key={key}>
                  <div className="Deadline_Commoncards">
                    <div className="Deadline_DeadLineText"
                    
                    style={currentDate.getTime()>data.date.toDate().getTime()?{color:"red", fontWeight:"bold"}:{color:"black"}}
                    > 
                      
                      <p>{data.courseName}</p>
                      <p> {data.desc}</p>
                      <p>
                        {dateMaker(data.date.toDate()).toString()}
                      </p>
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
            </div>
          ):(
            <div/>
          )}
          
          {/*
          <div>
            <button onClick={()=>{dateArry()}}>sort</button>
          </div>*/}
      
     </>
   
   
  );
}

export default Deadlines;
