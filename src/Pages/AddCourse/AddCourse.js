import React, { createElement } from "react";
import classes from "./AddCourse.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DateFnsUtils from "@date-io/date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, listItemIconClasses } from "@mui/material";
import firebase from "firebase";
import {
  setAssignmentData,
  setAssignmentNumber,
  setExamData,
  setExamNumber,
  setMidtermData,
  setMidtermNumber,
  setProjectData,
  setProjectNumber,
  setQuizData,
  setQuizNumber,
  submitCourseInfo,
} from "../../Redux/Actions/Course";
import Examination from "./Examination";
import Assignment from "./Assignment";
import Project from "./Projects";
import Midterm from "./Midterms";
import Quiz from "./Quizes";

function AddCourse(props) {
  var list1 = [];

  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });
 
  const dispatch = useDispatch();
  
  const [courseStart, setCourseStart] = useState(
    new Date()
  );

 

  const [courseEnd, setCourseEnd] = useState(new Date());

  const [courseName, setCourseName] = useState("");
  const [courseYear, setCourseYear] = useState("");

  const [courseDesc, setCourseDesc] = useState("");

  const [midtermData3, setMidtermData3] = useState([
    { id: "", date: "", desc: "", complete: "" },
  ]);
  const [examData3, setExamData3] = useState([
    { id: "", date: "", desc: "", complete: "" },
  ]);
  const [quizData3, setQuizData3] = useState([
    { id: "", date: "", desc: "", complete: "" },
  ]);
  const [assignmentData3, setAssignmentData3] = useState([
    { id: "", date: "", desc: "", complete: "" },
  ]);
  const [projectData3, setProjectData3] = useState([
    { id: "", date: "", desc: "", complete: "" },
  ]);
  const [examNumber, setExamNumber] = useState("");
  const [midtermNumber, setMidtermNumber]= useState("");
  const [quizNumber, setQuizNumber] = useState("");
  const [projectNumber, setProjectNumber] = useState("");
  const [assignmentNumber, setAssignmentNumber] = useState("");

  const getCourseNameHelper = () => {
    return courseName;
  };

  const getMidtermDataHelper = (data) => {
    setMidtermData3(data);
    //console.log(midtermData3)
  };

  const getExamDataHelper = (data) => {
    setExamData3(data);
    //console.log(courseName)
  };

  const getQuizDataHelper = (data) => {
    setQuizData3(data);
    //console.log(midtermData3)
  };

  const getAssignmentDataHelper = (data) => {
    setAssignmentData3(data);
    //console.log(midtermData3)
  };

  const getProjectDataHelper = (data) => {
    setProjectData3(data);
    //console.log(midtermData3)
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
  };

  const reset = (e) => {
    setCourseStart(new Date());
    setCourseEnd(new Date());
    setCourseName("");
    setCourseYear("");
    setCourseName("");
    setCourseDesc("");
    dispatch(setExamNumber(""));
    dispatch(setMidtermNumber(""));
    dispatch(setQuizNumber(""));
    dispatch(setAssignmentNumber(""));
    dispatch(setProjectNumber(""));
    setExamData3([{ id: "", date: "", desc: "",complete:"", }]);
    setMidtermData3([{ id: "", date: "", desc: "",complete:"", }]);
    setQuizData3([{ id: "", date: "", desc: "",complete:"", }]);
    setAssignmentData3([{ id: "", date: "", desc: "",complete:"", }]);
    setProjectData3([{ id: "", date: "", desc: "",complete:"", }]);
    handleClick(e);
  };

  const courseStartHelper = (newValue) => {
    setCourseStart(newValue);
  };

  const courseEndHelper = (newValue) => {
    setCourseEnd(newValue);
  };

  function submitEverything(e) {
    let everyarr=[];
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    //console.log(quizData12);
    //console.log(projectData12);
    let examDataSub = examData3.filter((x) => x.id != "");
    let midtermDataSub = midtermData3.filter((x) => x.id != "");
    let quizDataSub = quizData3.filter((x) => x.id != "");
    let assignmentDataSub = assignmentData3.filter((x) => x.id != "");
    let projectDataSub = projectData3.filter((x) => x.id != "");

    examDataSub.map((data)=>{
      everyarr=[...everyarr,data];
    })
    midtermDataSub.map((data)=>{
      everyarr=[...everyarr,data];
    })
    quizDataSub.map((data)=>{
      everyarr=[...everyarr,data];
    })
    assignmentDataSub.map((data)=>{
      everyarr=[...everyarr,data];
    })
    projectDataSub.map((data)=>{
      everyarr=[...everyarr,data];
    })
    const payloads = {
      user: userstat,
      timestamp: firebase.firestore.Timestamp.now(),
      courseName: courseName,
      courseDesc: courseDesc,
      courseYear: courseYear,
      courseStart: courseStart,
      courseEnd: courseEnd,
      midterms: midtermDataSub,
      exams: examDataSub,
      quizes: quizDataSub,
      assignments: assignmentDataSub,
      projects: projectDataSub,
    };
    const payloadss={
      timestamp: firebase.firestore.Timestamp.now(),
      courseName: courseName,
      courseDesc: courseDesc,
      courseYear: courseYear,
      courseStart: courseStart,
      courseEnd: courseEnd,
      status:everyarr,
    }
    
    console.log(payloadss);
    if (userstat) {
      if (courseName != "" && courseDesc != "" && courseYear != ""&& courseStart != ""&& courseEnd != "") {
        dispatch(submitCourseInfo(payloadss,userstat));
        reset(e);
        //console.log("submitted");
      } else {
        alert("Please complete required fields");
      }
    } else {
      console.log("user not logged in");
    }
  }

  return (
    <div className={classes.CommonCard}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <div>
            <h2>Course Input Page</h2>
          </div>
          <div className={classes.Course}>
            <div className={classes.CourseName}>
              <TextField
                required
                id="outlined-required"
                label="Course Name"
                placeholder="Ex. Math 1A03"
                value={courseName}
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
              />
              <TextField
                required
                id="outlined-required"
                type="number"
                label="Course Year"
                placeholder="Ex. 4th Year"
                value={courseYear}
                onChange={(e) => {
                  setCourseYear(e.target.value);
                }}
              />
            </div>
            <div className={classes.CourseDate}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Course Start Date"
                  inputFormat="MM/dd/yyyy"
                  value={courseStart}
                  onChange={courseStartHelper}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Course End Date"
                  inputFormat="MM/dd/yyyy"
                  value={courseEnd}
                  onChange={courseEndHelper}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className={classes.CourseDesc}>
              <TextField
                id="outlined-number"
                label="Number of Exams"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={examNumber}
                onChange={(e) => {
                  setExamNumber(e.target.value);
                }}
              />
              <TextField
                id="outlined-number"
                label="Number of Midterms"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={midtermNumber}
                onChange={(e) => {
                  setMidtermNumber(e.target.value);
                }}
              />
            </div>
            <div className={classes.CourseDesc}>
              <TextField
                id="outlined-number"
                label="Number of Quizes"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={quizNumber}
                onChange={(e) => setQuizNumber(e.target.value)}
              />
              <TextField
                id="outlined-number"
                label="Number of Assignments"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={assignmentNumber}
                onChange={(e) => {
                  setAssignmentNumber(e.target.value);
                }}
              />
            </div>
            <div className={classes.CourseDesc}>
              <TextField
                id="outlined-number"
                label="Number of Projects"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={projectNumber}
                onChange={(e) => setProjectNumber(e.target.value)}
              />
              <TextField
                required
                className={classes.CourseDesc}
                id="outlined-required"
                label="Course Description"
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
              />
            </div>
            <div className={classes.CourseDesc}></div>
          </div>
        </div>
        <Midterm data={getMidtermDataHelper} courseName={courseName} midtermNum={midtermNumber}/>

        <Examination data={getExamDataHelper} courseName={courseName} examNum={examNumber} />
        <Quiz data={getQuizDataHelper} courseName={courseName} quizNum={quizNumber} />
        <Assignment data={getAssignmentDataHelper} courseName={courseName} assignmentNum={assignmentNumber} />
        <Project data={getProjectDataHelper} courseName={courseName} projectNum={projectNumber} />
        
        <div className={classes.Button}>
          <Button
            variant="contained"
            onClick={(e) => {
              submitEverything(e);
            }}
          >
            submit
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default AddCourse;
