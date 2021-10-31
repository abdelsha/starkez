import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link, SwipeableDrawer } from "@mui/material";
import classes from "./Deadlines.module.css";

import firebase from "firebase";
import { getCoursesAPI, UpdateCourseInfo } from "../../Redux/Actions/Course";
import { getUserAuth } from "../../Redux/Actions/UserState";
import { useState, useEffect } from "react";


function Deadlines(props) {
  
  let arr=[];
  let arr2=[];
  const [ordarr, setOrdarr] = useState([]);
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
  useEffect(()=>{
    dateArry()
  },[assignmentData])
  
  const dateArry=() =>{
    let temparr=[];
    props.assignments.map((data,key)=>{
      //console.log(data.date)
      //arr[key]=data.date.toDate();
      let today = new Date()
      arr[key] = data
      if (data.date.toDate()>=today){
        temparr[key] = data
        //console.log(arr)
      }

      
      //console.log(data.date.toDate())
    })
    let filtered = temparr.filter(function (el) {
      return el != null;
    });
    arr2=filtered;
    
    setOrdarr(quickSortHelper(arr2, 0 ,arr2.length-1))
    //console.log(ordarr)
  }

  const quickSortHelper =(array, startIdx, endIdx) => {
    //console.log(array[startIdx].date.toDate())
    if (startIdx>=endIdx){
      return
    }
    let pivotIdx=startIdx;
    let left=startIdx+1;
    let right=endIdx;
    //console.log(array)
    //console.log(array[left] > array[pivotIdx] && array[right]<array[pivotIdx])
    
    while (right>=left){
      
      if (array[left].date.toDate() > array[pivotIdx].date.toDate() && array[right].date.toDate()<array[pivotIdx].date.toDate()){
        [array[left],array[right]] = [array[right], array[left]];
        //console.log("if1")
        //console.log(array);
      }
      if (array[left].date.toDate()<=array[pivotIdx].date.toDate()){
        left+=1;
        //console.log("if2")
        //console.log(array);
      }
      if (array[right].date.toDate()>= array[pivotIdx].date.toDate()){
        right -=1;
        //console.log("if3")
        //console.log(array);
      }
      
      //console.log(array);
    }
    [array[pivotIdx],array[right]] = [array[right], array[pivotIdx]];
    
    
    let leftSubArraySmaller = right-1 - startIdx < endIdx- (right+1);
    if (leftSubArraySmaller){
      quickSortHelper(array, startIdx, right-1)
      quickSortHelper(array, right+1, endIdx)
    }
    else{
      quickSortHelper(array, right +1, endIdx)
      quickSortHelper(array, startIdx,right-1)
    }
    return array
  }
  const dateMaker=(date) =>{
    let dates= date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    
    return dates;

  }
  return (
    <div className={classes.Layouts}>
      <div className={classes.Deadline}>
        <div className={classes.Commoncard}>
          <h2>Deadlines</h2>
          
          {ordarr.map((data,key) => {
            
            //console.log(data.date.toDate())
            return (
              <div className={classes.DataDisplays}>
                <div className={classes.Commoncards}>
                  <div className={classes.DeadLineText}>
                    <span>Course Name: {data.courseName}</span>
                    <span>Description: {data.desc}</span>
                    <span>Due Date: {dateMaker(data.date.toDate()).toString()}</span>
                  </div>
                  {/*data.toDateString()*/}
                </div>
                <div className={classes.Commoncards}>
                  
                  
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
