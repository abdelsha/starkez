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

function AddCourse() {
  var list1 = [];
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });
  const examNumber12 = useSelector((state) => {
    return state.courseState.examNumber;
  });
  const midtermNumber12 = useSelector((state) => {
    return state.courseState.midtermNumber;
  });

  const quizNumber12 = useSelector((state) => {
    return state.courseState.quizNumber;
  });

  const assignmentNumber12 = useSelector((state) => {
    return state.courseState.assignmentNumber;
  });

  const projectNumber12 = useSelector((state) => {
    return state.courseState.projectNumber;
  });

  const midtermData12 = useSelector((state) => {
    return state.courseState.midtermData;
  });
  const projectData12 = useSelector((state) => {
    return state.courseState.projectData;
  });
  const assignmentData12 = useSelector((state) => {
    return state.courseState.assignmentData;
  });
  const quizData12 = useSelector((state) => {
    return state.courseState.quizData;
  });
  const examData12 = useSelector((state) => {
    return state.courseState.examData;
  });
  const dispatch = useDispatch();

  const [courseStart, setCourseStart] = useState(
    new Date("2023-01-11T21:11:54")
  );

  const setExamNumberDispatch = (payload) => {
    dispatch(setExamNumber(payload));
  };

  const setMidtermNumberDispatch = (payload) => {
    dispatch(setMidtermNumber(payload));
  };

  const setQuizNumberDispatch = (payload) => {
    dispatch(setQuizNumber(payload));
  };

  const setAssignmentNumberDispatch = (payload) => {
    dispatch(setAssignmentNumber(payload));
  };
  const setProjectNumberDispatch = (payload) => {
    dispatch(setProjectNumber(payload));
  };

  const [courseEnd, setCourseEnd] = useState(new Date("2023-01-11T21:11:54"));
  const [midtermone, setMidtermone] = useState(new Date("2023-01-11T21:11:54"));
  const [midtermtwo, setMidtermtwo] = useState(new Date("2023-01-11T21:11:54"));
  const [midtermthree, setMidtermthree] = useState(new Date("2023-01-11T21:11:54")
  );
  const [exam, setExam] = useState(new Date("2023-01-11T21:11:54"));
  let [midtermoneText, setMidtermoneText] = useState("");
  let [midtermtwoText, setMidtermtwoText] = useState("");
  let [midtermthreeText, setMidtermthreeText] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [examNumbers, setExamNumbers] = useState("");
  const [courseDesc, setCourseDesc] =useState("");

  const [midtermNumbers, setMidtermNumbers] = useState("");

  const [quizNumbers, setQuizNumbers] = useState("");

  const [assignmentNumbers, setAssignmentNumbers] = useState("");

  const [projectNumbers, setProjectNumbers] = useState("");

  const [itemss, setItemss] = useState([{id: "",date: "",desc: "",},]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
  };

  const reset = (e) => {
    setCourseStart(new Date("2023-01-11T21:11:54"));
    setCourseEnd("");
    setCourseName("");
    setCourseYear("");
    dispatch(setExamNumber(""));
    dispatch(setMidtermNumber(""));
    dispatch(setQuizNumber(""));
    dispatch(setAssignmentNumber(""));
    dispatch(setProjectNumber(""));
    dispatch(setExamData([{id: "",date: "",desc: "",},]));
    dispatch(setMidtermData([{id: "",date: "",desc: "",},]));
    dispatch(setQuizData([{id: "",date: "",desc: "",},]));
    dispatch(setAssignmentData([{id: "",date: "",desc: "",},]));
    dispatch(setProjectData([{id: "",date: "",desc: "",},]));
    handleClick(e);
  };

  function submitCourseInfoHelper(e) {
    console.log("clicked");
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    if (userstat) {
        
      console.log("sentdatas");
      const payload = {
        user: userstat,
        timestamp: firebase.firestore.Timestamp.now(),
        courseName: courseName,
        courseYear: courseYear,
        courseStart: courseStart,
        courseEnd: courseEnd,
        midtermone: midtermone,
        midtermtwo: midtermtwo,
        midtermthree: midtermthree,
        exam: exam,
        midtermoneText: midtermoneText,
        midtermtwoText: midtermtwoText,
        midtermthreeText: midtermthreeText,
      };
      dispatch(submitCourseInfo(payload));
    } else {
      console.log("user not logged in");
    }
  }

  const courseStartHelper = (newValue) => {
    setCourseStart(newValue);
  };

  const courseEndHelper = (newValue) => {
    setCourseEnd(newValue);
  };

  function submitEverything (e) {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    //console.log(quizData12);
    //console.log(projectData12);
   let examDataSub=examData12.filter(x=> x.id!='');
   let midtermDataSub=midtermData12.filter(x=> x.id!= '');
   let quizDataSub=quizData12.filter(x=> x.id!='');
   let assignmentDataSub=assignmentData12.filter(x=> x.id!= '');
   let projectDataSub=projectData12.filter(x=> x.id!= '');


    const payloads = {
        user: userstat,
        timestamp: firebase.firestore.Timestamp.now(),
        courseName: courseName,
        courseYear: courseYear,
        courseStart: courseStart,
        courseEnd: courseEnd,
        midterms : midtermDataSub,
        exams: examDataSub,
        quizes: quizDataSub, 
        assignments: assignmentDataSub,
        projects: projectDataSub,
    }
    //console.log(payloads);
    if (userstat){
        if (courseName!=""){
            dispatch(submitCourseInfo(payloads));
            reset(e);
        }else{
            alert("Please Enter Course Name")
        }
        
    } 
    else{
        console.log('user not logged in')
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
                type ="number"
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
                value={examNumber12}
                onChange={(e) => {
                  setExamNumberDispatch(e.target.value);
                }}
              />
              <TextField
                id="outlined-number"
                label="Number of Midterms"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={midtermNumber12}
                onChange={(e) => {
                  setMidtermNumberDispatch(e.target.value);
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
                value={quizNumber12}
                onChange={(e) => setQuizNumberDispatch(e.target.value)}
              />
              <TextField
                id="outlined-number"
                label="Number of Assignments"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={assignmentNumber12}
                onChange={(e) => {
                  setAssignmentNumberDispatch(e.target.value);
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
                value={projectNumber12}
                onChange={(e) => setProjectNumberDispatch(e.target.value)}
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
        <Midterm />
        <Examination />
        <Quiz />
        <Assignment />
        <Project />

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
