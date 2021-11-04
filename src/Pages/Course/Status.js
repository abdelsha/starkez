import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import classes from "./Status.module.css";

import { ClassNames } from "@emotion/react";

import { useState, useEffect } from "react";
import {
  getCoursesAPI,
  UpdateCourseInfo,
  quickSort,
  updateCoursesAPI,
} from "../../Redux/Actions/Course";
import { getUserAuth } from "../../Redux/Actions/UserState";
import { PieChart } from "react-minimal-pie-chart";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";



function Status (){
    let templist = ["All"];
  
  const [loaded, setLoaded] = useState("false");
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.courses;
  });
  const assignmentData = useSelector((state) => {
    return state.courseState.assignmentData;
  });
  const courseNumber = useSelector((state) => {
    return state.courseState.courseNumber;
  });
  const compCourseNumber = useSelector((state) => {
    return state.courseState.compCourseNumber;
  });
  const examNumber = useSelector((state) => {
    return state.courseState.examNumber;
  });
  const compExamNumber = useSelector((state) => {
    return state.courseState.compExamNumber;
  });
  const midtermNumber = useSelector((state) => {
    return state.courseState.midtermNumber;
  });
  const compMidtermNumber = useSelector((state) => {
    return state.courseState.compMidtermNumber;
  });
  const quizNumber = useSelector((state) => {
    return state.courseState.quizNumber;
  });
  const compQuizNumber = useSelector((state) => {
    return state.courseState.compQuizNumber;
  });
  const projNumber = useSelector((state) => {
    return state.courseState.projectNumber;
  });
  const compProjNumber = useSelector((state) => {
    return state.courseState.compProjectNumber;
  });
  const assignmentNumber = useSelector((state) => {
    return state.courseState.assignmentNumber;
  });
  const compAssignmentNumber = useSelector((state) => {
    return state.courseState.compAssignmentNumber;
  });
  let totArr = [];
  let totOrdArr = [];
  let piedatt=[
    { title: "Exams", value: examNumber, color: "#E38627" },
    { title: "Projects", value: projNumber, color: "#C13C37" },
    { title: "Midterms", value: midtermNumber, color: "#6A2135" },
    { title: "Quizes", value: quizNumber, color: "#C14835" },
    {
      title: "Assignments",
      value: assignmentNumber,
      color: "#6A5D35",
    },
  ];

  const retdeadlines = useSelector((state) => {
    return state.courseState.deadlines;
  });
  const orderdCourse = useSelector((state) => {
    return state.courseState.orderdCourse;
  });
  const dispatch = useDispatch();

 
  const [pieData, setPieData] = useState([
    { title: "Exams", value: examNumber, color: "#E38627" },
    { title: "Projects", value: projNumber, color: "#C13C37" },
    { title: "Midterms", value: midtermNumber, color: "#6A2135" },
    { title: "Quizes", value: quizNumber, color: "#C14835" },
    {
      title: "Assignments",
      value: assignmentNumber,
      color: "#6A5D35",
    },
  ])
  const [pieNum,setPieNum] = useState(courseNumber)
  useEffect(() => {
    //console.log(orderdCourse);
    if (assignmentData.length > 1) {
      //console.log(examNumber);
      setLoaded("true");
      piedatt=[
        { title: "Exams", value: examNumber, color: "#E38627" },
        { title: "Projects", value: projNumber, color: "#C13C37" },
        { title: "Midterms", value: midtermNumber, color: "#6A2135" },
        { title: "Quizes", value: quizNumber, color: "#C14835" },
        {
          title: "Assignments",
          value: assignmentNumber,
          color: "#6A5D35",
        },
      ]
      
    }
    //console.log(courseStat)
  }, [[], retdeadlines]);

  
  // This sends the checked items to the firestore
 

  //This section works on the option bar for the pie graph
  
  
  const setPieDataHelper = (course) => {
    let tempData = [{}];
    let assign = 0;
    let proj = 0;
    let exam = 0;
    let mid = 0;
    let quiz = 0;
    let num=0;
    let comp=0;
    let tot=0;
    //console.log(course);
    try {
      if(course=="All"){
        tempData=[
          { title: "Exams", value: examNumber, color: "#E38627" },
          { title: "Projects", value: projNumber, color: "#C13C37" },
          { title: "Midterms", value: midtermNumber, color: "#6A2135" },
          { title: "Quizes", value: quizNumber, color: "#C14835" },
          {
            title: "Assignments",
            value: assignmentNumber,
            color: "#6A5D35",
          },
        ];
        num=courseNumber;
        //console.log(tempData)
        setPieData(tempData);
        setPieNum(num);
      }
      else{
      orderdCourse.map((datas) => {
        
        if (datas.courseName == course) {
          tot+=1;
          if (!datas.complete) {
            if(datas.id.includes("assignment")){
              assign+=1;
              num+=1;
            }
            if(datas.id.includes("project")){
              proj+=1;
              num+=1;
            }
            if(datas.id.includes("exam")){
              exam+=1;
              num+=1;
            }
            if(datas.id.includes("midterm")){
              mid+=1;
              num+=1;
            }
            if(datas.id.includes("quiz")){
              quiz+=1;
              num+=1;
            }
          }
        }
      });
     comp=tot-num;
     if(comp>=1){
      tempData=[
        { title: "Exams", value: exam, color: "#E38627" },
        { title: "Projects", value: proj, color: "#C13C37" },
        { title: "Midterms", value: mid, color: "#6A2135" },
        { title: "Quizes", value: quiz, color: "#C14835" },
        { title: "Assignments", value: assign, color: "#6A5D35" },
        { title: "Complete", value: comp, color: "#2ba34f" }
        
      ]
     }else{
      tempData=[
        { title: "Exams", value: exam, color: "#E38627" },
        { title: "Projects", value: proj, color: "#C13C37" },
        { title: "Midterms", value: mid, color: "#6A2135" },
        { title: "Quizes", value: quiz, color: "#C14835" },
        { title: "Assignments", value: assign, color: "#6A5D35" },
        
        
      ]
     }
      
      setPieData(tempData);
      setPieNum(num);
      //console.log(tempData)
      //console.log(num)
    }
    } catch (error) {
      console.log(error);
    }
  };

  //This section is for the pie graph

  return (
    <div className={classes.Layouts}>
      <div className={classes.Status}>
        <div className={classes.CommonCard}>
          <div className={classes.StatusCard}>
            <div className={classes.CommonCardss}>
              <List>
                
                {courseStat.length > 1 ? (
                  <div>
                    <Button onClick={(e)=>{setPieDataHelper("All")}}>
                          <ListItemText primary="All" />
                        </Button>

                    {courseStat.map((course, key) => {
                      return (
                        <div>
                        <Button onClick={(e)=>{setPieDataHelper(course.courseName)}}>
                          <ListItemText primary={course.courseName} />
                        </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div></div>
                )}
              </List>
            </div>
            <div>
              <span>Pie Chart</span>
              {pieData[0].value==0?(
              <PieChart
                animation
                animationDuration={500}
                animationEasing="ease-out"
                center={[50, 50]}
                data={piedatt}
                label={(data) => data.dataEntry.title}
                
                style={{ height: "250px", "font-size": "3px" }}
                >
                  
              </PieChart>
              ):(
              <PieChart
                animation
                animationDuration={500}
                animationEasing="ease-out"
                center={[50, 50]}
                data={pieData}
                label={(data) => data.dataEntry.title}
                
                style={{ height: "250px", "font-size": "4px" }}
              />
              )}
                  
                
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;
