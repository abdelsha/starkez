import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import classes from "./PieChart.css";

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
  const [thisPieData, setThisPieData] = useState([])

  const setThePieData =(exams=0, projs=0, midterms=0, assign=0, quizes=0, comp=0) =>{
    setThisPieData(()=>[]);
    if (exams>0){
      setThisPieData((prevData)=> [...prevData, { title: "Exams", value: examNumber, color: "#E38627" }])
    }
    if (projs>0){
      setThisPieData(prevData=> [...prevData, { title: "Projects", value: projNumber, color: "#C13C37" }])
    }
    if (midterms>0){
      setThisPieData(prevData=> [...prevData, { title: "Midterms", value: midtermNumber, color: "#6A2135" }])
    }
    if (assign>0){
      setThisPieData(prevData=> [...prevData, { title: "Assignments", value: assignmentNumber, color: "#6A5D35"}])
    }
    if (quizes>0){
      setThisPieData(prevData=> [...prevData, { title: "Quizes", value: quizNumber, color: "#C14835" }])
    }
    if (comp>0){
      setThisPieData(prevData=> [...prevData, { title: "Complete", value: comp, color: "#2ba34f" }])
    }
  }
  useEffect(()=>{
    setThePieData(examNumber, projNumber, midtermNumber, assignmentNumber, quizNumber)
    //console.log(thisPieData)
  }, [examNumber])
  useEffect(() => {
    //console.log(orderdCourse);
    if (assignmentData.length > 1) {
      //console.log(examNumber);
      setLoaded("true");
      //console.log(quizNumber)
      
      
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
        setThePieData(examNumber, projNumber, midtermNumber, assignmentNumber, quizNumber)
        num=courseNumber;
        //console.log(thisPieData)
        setPieData(thisPieData);
        
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
      setThePieData(exam, proj, mid, assign, quiz, comp)
      
     }else{
      setThePieData(exam, proj, mid, assign, quiz) 
      
     }
      
      setPieData(thisPieData);
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
    
    <div className="PieChart_Layouts">
      <div className="PieChart_Status">
        
          <div className="PieChart_StatusCard">
            <div className="PieChart_CommonCardss">
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
                          <ListItemText primary={course.courseName} sx={{fontSize:10}}/>
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
            <div className="PieChart_pieCharts">
              <span>Pie Chart</span>
              <PieChart
                animation
                animationDuration={500}
                animationEasing="ease-out"
                center={[50, 50]}
                data={thisPieData}
                label={(data) => data.dataEntry.title}
                
                style={{ height: "250px", "font-size": "3px" }}
                >
                  
              </PieChart>
            </div>
          </div>
        
      </div>
    </div>
    
  );
}

export default Status;
