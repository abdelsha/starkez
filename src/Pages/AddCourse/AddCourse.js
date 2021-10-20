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
import { Button, listItemIconClasses } from "@mui/material";
import firebase from "firebase";
import { submitCourseInfo } from "../../Redux/Actions/Course";

function AddCourse() {
  var list1 = [];
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const dispatch = useDispatch();

  const [courseStart, setCourseStart] = useState(
    new Date("2014-08-18T21:11:54")
  );

  const [courseEnd, setCourseEnd] = useState(new Date("2014-08-18T21:11:54"));
  const [midtermone, setMidtermone] = useState(new Date("2014-08-18T21:11:54"));
  const [midtermtwo, setMidtermtwo] = useState(new Date("2014-08-18T21:11:54"));
  const [midtermthree, setMidtermthree] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [exam, setExam] = useState(new Date("2014-08-18T21:11:54"));
  let [midtermoneText, setMidtermoneText] = useState("");
  let [midtermtwoText, setMidtermtwoText] = useState("");
  let [midtermthreeText, setMidtermthreeText] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [examNumbers, setExamNumbers] = useState("");
  const [examNumbers1, setExamNumbers1] = useState([]);
  const [midtermNumbers, setMidtermNumbers] = useState("");
  const [midtermNumbers1, setMidtermNumbers1] = useState([]);
  const [quizNumbers, setQuizNumbers] = useState("");
  const [quizNumbers1, setQuizNumbers1] = useState([]);
  const [assignmentNumbers, setAssignmentNumbers] = useState("");
  const [assignmentNumbers1, setAssignmentNumbers1] = useState([]);
  const [projectNumbers, setProjectNumbers] = useState("");
  const [projectNumbers1, setProjectNumbers1] = useState([]);
  const [itemss, setItemss] = useState([{
    id: "",
    date: "",
    desc:""
  }]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
  };

  const reset = (e) => {
    setCourseStart("");
    setCourseEnd("");
    setMidtermone("");
    setMidtermtwo("");
    setMidtermthree("");
    setExam("");
    setMidtermoneText("");
    setMidtermtwoText("");
    setMidtermthreeText("");
    setCourseName("");
    setCourseYear("");
    setExamNumbers("");
    setMidtermNumbers("");
    setQuizNumbers("");
    setAssignmentNumbers("");
    setProjectNumbers("");
    handleClick(e);
  };

  function submitCourseInfoHelper(e) {
    console.log("clicked");
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    if (userstat) {
      console.log("sentdata");
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

  const newElements = (value) => {
    let i = 0;
    setMidtermNumbers(value);
    let array = [];
    for (i = 0; i < value; i++) {
      array.push(i);
    }
    setMidtermNumbers1(array);
  };

  const midtermDatesHelper = (val) => {
    let index = itemss.findIndex((x) => x.id == val.id);
    if (index == -1) {
        console.log('sdaas')
      setItemss([
        ...itemss,
        {
          id: val.id,
          date: val.date,
          desc:""
        },
      ]);
    } else {
      let newArr = [...itemss];
      
      newArr[index].date = val.date;
      console.log(newArr)
      //console.log(newArr[1]);
      
      if (newArr.length > parseInt(midtermNumbers, 10)+1) {
        let finArr = [];
        console.log('heresss')
        newArr.map((x, key) => {
          if (key < parseInt(midtermNumbers, 10)+1) {
            finArr.push(x);
            console.log(finArr);
          }
        });
        setItemss(finArr);
      } else {
        //console.log(newArr)
        setItemss(newArr);

        /*console.log("newArr:")
        console.log(newArr)
        console.log("items")
        console.log(itemss)*/
      }
      //console.log(itemss[index].date)
    }
  };

  const midtermTexts = (val) => {
    let text = val.desc;
    let newArr = [...itemss];
    let index = itemss.findIndex((x) => x.id == val.id);
    if (index == -1) {
        setItemss([
          ...itemss,
          {
            id: val.id,
            date: "",
            desc: val.desc,
          },
        ]);
    }else{
        
        let value=val.desc;
        newArr[index].desc=value;
        if ((newArr.length) > parseInt(midtermNumbers, 10)+1) {
            console.log(midtermNumbers)
            let finArr = [];
            console.log('here')
            newArr.map((x, key) => {
              if (key < parseInt(midtermNumbers, 10)+1) {
                finArr.push(x);
                console.log(finArr);
              }
            });
            setItemss(finArr);
          } else {
            //console.log(newArr)
            setItemss(newArr);
          
        }
        
        console.log(itemss)
    }
    
  };

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
                value={examNumbers}
                onChange={(e) => {
                  setExamNumbers(e.target.value);
                }}
              />
              <TextField
                id="outlined-number"
                label="Number of Midterms"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={midtermNumbers}
                onChange={(e) => {
                  newElements(e.target.value);
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
                value={quizNumbers}
                onChange={(e) => setQuizNumbers(e.target.value)}
              />
              <TextField
                id="outlined-number"
                label="Number of Assignments"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={assignmentNumbers}
                onChange={(e) => {
                  setAssignmentNumbers(e.target.value);
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
                value={projectNumbers}
                onChange={(e) => setProjectNumbers(e.target.value)}
              />
              <TextField
                required
                className={classes.CourseDesc}
                id="outlined-required"
                label="Course Description"
              />
            </div>
            <div className={classes.CourseDesc}></div>
          </div>
        </div>

        <div className={classes.Exams}>
          <div className={classes.ExamHead}>
            <h2>Midterms And Exams</h2>
          </div>

          {midtermNumbers1.map((val, key) => {
            //console.log(items);
            let index = itemss.findIndex((x) => x.id == `midterm${key + 1}`);
            let newIndex = 0;
            if (index != -1) {
              newIndex = index;
              console.log("true");
            } else {
              newIndex = midtermone;
              console.log("false");
            }
            console.log(index);
            return (
              <div className={classes.ExamDates}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    id={`midterm${key + 1}Date`}
                    label={`midterm ${key + 1}`}
                    inputFormat="MM/dd/yyyy"
                    value={index != -1 ? itemss[index].date : midtermone}
                    onChange={(e) => {
                      midtermDatesHelper({
                        id: `midterm${key + 1}`,
                        date: e,
                        desc:"",
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <TextField
                    id={`midterm${key + 1}Description`}
                    label={`Midterm ${key + 1} Description`}
                    value={index != -1 ? itemss[index].desc : midtermoneText}
                    onChange={(e) => {
                        //console.log(e.target.value)
                        midtermTexts({
                            id: `midterm${key + 1}`,
                            desc:e.target.value,
                          });
                        }}
                  />
                </LocalizationProvider>
              </div>
            );
          })}

          
        </div>
        

        <div className={classes.Button}>
          <Button
            variant="contained"
            onClick={(e) => {
              submitCourseInfoHelper(e);
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




{/* 
          <div className={classes.ExamDates}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Midterm 1"
                inputFormat="MM/dd/yyyy"
                value={midtermone}
                onChange={(e) => {
                  setMidtermone(e);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id="outlined"
                label="Midterm 1 Description"
                value={midtermoneText}
                onChange={(e) => {
                  setMidtermoneText(e.target.value);
                }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Midterm 2"
                inputFormat="MM/dd/yyyy"
                value={midtermtwo}
                onChange={(e) => {
                  setMidtermtwo(e);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id="outlined"
                label="Midterm 2 Description"
                value={midtermtwoText}
                onChange={(e) => {
                  setMidtermtwoText(e.target.value);
                }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Midterm 3"
                inputFormat="MM/dd/yyyy"
                value={midtermthree}
                onChange={(e) => {
                  setMidtermthree(e);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id="outlined"
                label="Midterm 3 Description"
                value={midtermthreeText}
                onChange={(e) => {
                  setMidtermthreeText(e.target.value);
                }}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.ExamDates}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Final Exam"
                inputFormat="MM/dd/yyyy"
                value={exam}
                onChange={(e) => {
                  setExam(e);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          */}