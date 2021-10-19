import React from "react";
import classes from './AddCourse.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import firebase from "firebase";
import { submitCourseInfo } from "../../Redux/Actions/Course";




function AddCourse () {

    const userstat = useSelector((state)=>{
        return state.userState.user;
      });
    const courseStat= useSelector((state) =>{
        return state.courseState.course;
    })

      const dispatch = useDispatch();

    const [courseStart, setCourseStart] = useState(new Date('2014-08-18T21:11:54'));
    const [courseEnd, setCourseEnd] = useState(new Date('2014-08-18T21:11:54'));
    const [midtermone,setMidtermone] = useState(new Date('2014-08-18T21:11:54'));
    const [midtermtwo,setMidtermtwo] = useState(new Date('2014-08-18T21:11:54'));
    const [midtermthree,setMidtermthree] = useState(new Date('2014-08-18T21:11:54'));
    const [exam,setExam] = useState(new Date('2014-08-18T21:11:54'));
    let [midtermoneText,setMidtermoneText] = useState("");
    let [midtermtwoText,setMidtermtwoText] = useState("");
    let [midtermthreeText,setMidtermthreeText] = useState("");
    const [courseName,setCourseName]=useState('');
    const [courseYear,setCourseYear]=useState('');
   


function submitCourseInfoHelper (e) {
    console.log('clicked');
    e.preventDefault();
    if( e.target !== e.currentTarget){
        return;
    }
    if (userstat){
        console.log('sentdata');
        const payload ={
        
            user: userstat,
            timestamp: firebase.firestore.Timestamp.now(),
            courseStart: courseStart,
            courseEnd:courseEnd,
            midtermone:midtermone,
            midtermtwo:midtermtwo,
            midtermthree:midtermthree,
            exam:exam,
            midtermoneText:midtermoneText,
            midtermtwoText:midtermtwoText,
            midtermthreeText:midtermthreeText,
    
        }
        dispatch(submitCourseInfo(payload));
    }else{
        console.log('user not logged in');
    }
    
}
  const courseStartHelper = (newValue) => {
    setCourseStart(newValue);
  };
  const courseEndHelper = (newValue) => {
    setCourseEnd(newValue);
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
                  onChange={(e)=>{setCourseName(e.target.value)}}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Course Year"
                  placeholder="Ex. 4th Year"
                  value={courseYear}
                  onChange={(e)=>{setCourseYear(e.target.value)}}
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
                  required
                  className={classes.CourseDesc}
                  id="outlined-required"
                  label="Course Description"
                  
                />
              </div>
            </div>
          </div>
          <div className={classes.Exams}>
            <div className={classes.ExamHead}>
              <h2>Midterms And Exams</h2>
            </div>
            <div className={classes.ExamDates}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Midterm 1"
                  inputFormat="MM/dd/yyyy"
                  value={midtermone}
                  onChange={(e)=>{setMidtermone(e)}}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TextField
                  
                  id="outlined"
                  label="Midterm 1 Description"
                  value={midtermoneText}
                  
                  onChange={(e)=>{setMidtermoneText(e.target.value)}}
                />
              </LocalizationProvider>
            </div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Midterm 2"
                  inputFormat="MM/dd/yyyy"
                  value={midtermtwo}
                  onChange={(e) => {setMidtermtwo(e)}}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TextField
                  
                  id="outlined"
                  label="Midterm 2 Description"
                  value={midtermtwoText}
                  
                  onChange={(e)=>{setMidtermtwoText(e.target.value)}}
                />
                </LocalizationProvider>
            </div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Midterm 3"
                  inputFormat="MM/dd/yyyy"
                  value={midtermthree}
                  onChange={(e) => {setMidtermthree(e)}}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TextField
                  
                  id="outlined"
                  label="Midterm 3 Description"
                  value={midtermthreeText}
                 
                  onChange={(e)=>{setMidtermthreeText(e.target.value)}}
                />
                </LocalizationProvider>
            </div>
            <div className={classes.ExamDates}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                
                <DesktopDatePicker
                  label="Final Exam"
                  inputFormat="MM/dd/yyyy"
                  value={exam}
                  onChange={(e) => {setExam(e)}}
                  renderInput={(params) => <TextField {...params} />}
                />
                
              </LocalizationProvider>
            </div>
          </div>
          <div className={classes.Button}>
              <Button variant="contained"
              onClick={(e)=>{submitCourseInfoHelper(e)}}>
                  submit
              </Button>
          </div>
        </Box>
      </div>
    );
}

export default AddCourse;