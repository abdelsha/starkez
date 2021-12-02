import React, { createElement } from "react";
import classes from "./AddCourse.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DateFnsUtils from "@date-io/date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, listItemIconClasses } from "@mui/material";
import firebase from "firebase";
import {

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

  const [courseStart, setCourseStart] = useState(new Date());

  const [courseEnd, setCourseEnd] = useState(new Date());

  const [courseName, setCourseName] = useState("");
  const [courseYear, setCourseYear] = useState("");

  const [courseDesc, setCourseDesc] = useState("");

  const [examNumber, setExamNumber] = useState("");
  const [midtermNumber, setMidtermNumber] = useState("");
  const [quizNumber, setQuizNumber] = useState("");
  const [projectNumber, setProjectNumber] = useState("");
  const [assignmentNumber, setAssignmentNumber] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
  };

  const reset = (e) => {
    try {
      setCourseStart(new Date());
      setCourseEnd(new Date());
      setCourseName("");
      setCourseYear("");
      setCourseName("");
      setCourseDesc("");
      setExamNumber(0);
      setMidtermNumber(0);
      setQuizNumber(0);
      setProjectNumber(0);
      setAssignmentNumber(0);
      handleClick(e);
    } catch (err) {
      console.log(err);
    }
  };

  const courseStartHelper = (newValue) => {
    setCourseStart(newValue);
  };

  const courseEndHelper = (newValue) => {
    setCourseEnd(newValue);
  };

  ///////////////////////////////////////////////////////////////////
  const [itemss, setItemss] = useState([
    {
      courseName: courseName,
      id: "",
      date: "",
      desc: "",
      complete: false,
    },
  ]);
  const updateCourseName = () => {
    let mod = itemss;
    mod.map((val) => {
      val.courseName = courseName;
    });
    setItemss(() => mod);
    console.log(itemss);
  };

  useEffect(() => {
    //setCourseNames(()=>props.courseName)
    updateCourseName();
    //console.log(courseName)
  }, [[], courseName]);

  useEffect(() => {
    //console.log(itemss);
    //props.data(itemss)
  }, [[], itemss, courseName]);

  const descHelper = (id, value, type) => {
    try {
      let index = itemss.findIndex((x) => x.id == id);
      //console.log(value)
      if (index == -1) {
        if (type == "desc") {
          setItemss((prev) => [
            ...prev,
            {
              courseName: courseName,
              id: id,
              date: new Date(),
              desc: value,
              complete: false,
            },
          ]);
        } else if (type == "date") {
          setItemss((prev) => [
            ...prev,
            {
              courseName: courseName,
              id: id,
              date: value,
              desc: "",
              complete: false,
            },
          ]);
        }
      } else if (index != -1) {
        //console.log("here2");
        if (type === "remove") {
          //console.log(id);
          const updateddes = itemss.filter((todo) => todo.id !== id);
          setItemss(() => updateddes);
        } else {
          const updateddes = itemss.map((todo) => {
            if (todo.id == id) {
              if (type == "desc") {
                return {
                  ...todo,
                  desc: value,
                };
              } else if (type == "date") {
                return {
                  ...todo,
                  date: value,
                };
              }
            }
            return todo;
          });
          setItemss(() => updateddes);
        }
      }
    } catch (error) {
      console.log(error);
    }

    //console.log(itemss);
    //props.data(items);
  };
  function submitEverything(e) {
    try {
      let everyarr = itemss.filter((rem) => rem.id !== "");
      e.preventDefault();
      if (e.target !== e.currentTarget) {
        return;
      }

      const payloadss = {
        timestamp: firebase.firestore.Timestamp.now(),
        courseName: courseName,
        courseDesc: courseDesc,
        courseYear: courseYear,
        courseStart: courseStart,
        courseEnd: courseEnd,
        status: everyarr,
      };

      console.log(payloadss);
      if (userstat) {
        if (
          courseName != "" &&
          courseDesc != "" &&
          courseYear != "" &&
          courseStart != "" &&
          courseEnd != ""
        ) {
          dispatch(submitCourseInfo(payloadss, userstat));
          reset(e);
          alert("Submition Complete");
          //console.log("submitted");
        } else {
          alert("Please complete required fields");
        }
      } else {
        console.log("user not logged in");
      }
    } catch (err) {
      console.log(err);
    }
  }
  //////////////////////////////////////////////////////////////////////

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
                  //console.log(examNumber)
                  //console.log(e.target.value)
                  if (examNumber > e.target.value) {
                    descHelper(`exam${examNumber}`, null, "remove");
                  }
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
                  if (midtermNumber > e.target.value) {
                    descHelper(`midterm${midtermNumber}`, null, "remove");
                  }
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
                onChange={(e) => {
                  if (quizNumber > e.target.value) {
                    descHelper(`quiz${quizNumber}`, null, "remove");
                  }
                  setQuizNumber(e.target.value);
                }}
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
                  if (assignmentNumber > e.target.value) {
                    descHelper(`assignment${assignmentNumber}`, null, "remove");
                  }
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
                onChange={(e) => {
                  if (projectNumber > e.target.value) {
                    descHelper(`project${projectNumber}`, null, "remove");
                  }
                  setProjectNumber(e.target.value);
                }}
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
        <Midterm
          itemss={itemss}
          inputdesc={descHelper}
          courseName={courseName}
          midtermNum={midtermNumber}
        />

        <Examination
          itemss={itemss}
          inputdesc={descHelper}
          courseName={courseName}
          examNum={examNumber}
        />
        <Quiz
          itemss={itemss}
          inputdesc={descHelper}
          courseName={courseName}
          quizNum={quizNumber}
        />
        <Assignment
          itemss={itemss}
          inputdesc={descHelper}
          courseName={courseName}
          assignmentNum={assignmentNumber}
        />
        <Project
          itemss={itemss}
          inputdesc={descHelper}
          courseName={courseName}
          projectNum={projectNumber}
        />

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
