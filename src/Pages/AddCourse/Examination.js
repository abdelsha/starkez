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


function Examination() {
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
  const [quizNumbers, setQuizNumbers] = useState("")
  const [quizNumbers1, setQuizNumbers1] = useState([])
  const [assignmentNumbers, setAssignmentNumbers] = useState("");
  const [assignmentNumbers1, setAssignmentNumbers1] = useState([]);
  const [projectNumbers, setProjectNumbers] = useState("");
  const [projectNumbers1, setProjectNumbers1] = useState([]);
  const [itemss,setItemss] = useState([]);

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


 
  const midtermDatesHelper=(val)=>{
    
    let index= itemss.findIndex(x=> x.id ==val.id);
    if(index == -1){
        setItemss([
            ...itemss,
            {
              id: val.id,
              date: val.date,
            },
          ]);
    }else{
        let newArr=[...itemss]
        newArr[index]=val;
        //console.log(newArr[1]);
        if (newArr.length > midtermNumbers){
            let finArr=[];
            newArr.map( ( (x,key) =>{
                if (key<midtermNumbers){
                    finArr.push(x)
                    console.log(finArr);
                }
            }))
            setItemss(finArr);
        }else{
            //console.log(newArr)
        setItemss(newArr);
        
        /*console.log("newArr:")
        console.log(newArr)
        console.log("items")
        console.log(itemss)*/
        }   
        //console.log(itemss[index].date)
    }
  }

  const dateDisplay =(val) => {
      setMidtermone=val.date;
    let index= itemss.findIndex(x=> x.id ==val.id);
    return itemss[index].date
    
  }

    
    return(
        <div></div>
    )
}

export default Examination