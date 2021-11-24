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
import { Button, listItemIconClasses } from "@mui/material";
import firebase from "firebase";

import {
  setAssignmentData,
  setAssignmentNumber,
  setMidtermNumber,
} from "../../Redux/Actions/Course";

function Assignment(props) {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const assignmentNumber12 = useSelector((state) => {
    return state.courseState.assignmentNumber;
  });

  const assignmentData12 = useSelector((state) => {
    return state.courseState.assignmentData;
  });

  const dispatch = useDispatch();


  /*const setAssisgnmentDataDispatch = (payload) => {
      dispatch(setAssignmentData(payload));
  }*/

  const [courseStart, setCourseStart] = useState(new Date());

  const [assignmentone, setAssignmentone] = useState(new Date());

  let [assignmentoneText, setAssignmentoneText] = useState("");

  const [assignmentNumbers, setAssignmentNumbers] = useState("");
  const [assignmentNumbers1, setassignmentNumbers1] = useState([]);
  const [courseName, setCourseNames] = useState("");

  const [itemss, setItemss] = useState([
    {
      courseName: courseName,
      id: "",
      date: "",
      desc: "",
      complete: false,
    },
  ]);
 ///////////////////////////////////////////////////////////////////
 const updateCourseName=()=>{
  let mod=itemss;
  mod.map((val)=>{
    val.courseName=courseName
  })
  setItemss(()=>mod);
  //console.log(itemss)
}

useEffect(() => {
  setCourseNames(()=>props.courseName)
  updateCourseName()
  //console.log(courseName)
}, [[], props.courseName]);


//////////////////////////////////////////////////////////////////////
  useEffect(() => {
    newElements();
  }, [props.assignmentNum]);

  const newElements = () => {
    let value = props.assignmentNum;
    let array = [];
    for (let i = 0; i < value; i++) {
      array.push(i);
    }
    setassignmentNumbers1(array);
  };

  const assignmentDatesHelper = (val) => {
    let newArr = [...itemss];
    let index = itemss.findIndex((x) => x.id == val.id);
    if (index == -1) {
      //console.log("sdaas");
      setItemss([
        ...itemss,
        {
          courseName: courseName,
          id: val.id,
          date: val.date,
          desc: "",
          complete: false,
        },
      ]);
    } else {
      newArr[index].date = val.date;
      newArr[index].courseName = courseName;
      //console.log(newArr);
      ////console.log(newArr[1]);

      if (newArr.length > parseInt(assignmentNumbers, 10) + 1) {
        let finArr = [];
        //console.log("heresss");
        newArr.map((x, key) => {
          if (key < parseInt(assignmentNumbers, 10) + 1) {
            finArr.push(x);
            //console.log(finArr);
          }
        });
        setItemss(finArr);
      } else {
        ////console.log(newArr)
        setItemss(newArr);

        /*//console.log("newArr:")
        //console.log(newArr)
        //console.log("items")
        //console.log(itemss)*/
      }
      ////console.log(itemss[index].date)
      console.log(itemss);
      console.log(courseName);
    }
    props.data(itemss);
    //setAssisgnmentDataDispatch(itemss);
  };

  const assignmentTexts = (val) => {
    let text = val.desc;
    let newArr = [...itemss];
    let index = itemss.findIndex((x) => x.id == val.id);
    if (index == -1) {
      setItemss([
        ...itemss,
        {
          courseName: courseName,
          id: val.id,
          date: "",
          desc: val.desc,
          complete: false,
        },
      ]);
    } else {
      let value = val.desc;
      newArr[index].desc = value;
      newArr[index].courseName = courseName;
      if (newArr.length > parseInt(assignmentNumbers, 10) + 1) {
        //console.log(assignmentNumbers);
        let finArr = [];
        //console.log("here");
        newArr.map((x, key) => {
          if (key < parseInt(assignmentNumbers, 10) + 1) {
            finArr.push(x);
            //console.log(finArr);
          }
        });
        setItemss(finArr);
      } else {
        ////console.log(newArr)
        setItemss(newArr);
      }

      console.log(itemss);
      console.log(courseName);
    }
    //console.log(itemss)
    props.data(itemss);
    //setAssisgnmentDataDispatch(itemss);
  };

  return (
    <div className={classes.Exams}>
      <div className={classes.ExamHead}>
        {props.assignmentNum >= 1 ? <h2>Assignments</h2> : <div />}
      </div>

      {assignmentNumbers1.map((val, key) => {
        ////console.log(items);
        let index = itemss.findIndex((x) => x.id == `assignment${key + 1}`);
        let newIndex = 0;
        if (index != -1) {
          newIndex = index;
          //console.log("true");
        } else {
          newIndex = assignmentone;
          //console.log("false");
        }
        //console.log(index);
        return (
          <div className={classes.ExamDates} key={key}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                id={`assignment${key + 1}Date`}
                label={`assignment ${key + 1}`}
                inputFormat="MM/dd/yyyy"
                value={index != -1 ? itemss[index].date : assignmentone}
                onChange={(e) => {
                  assignmentDatesHelper({
                    id: `assignment${key + 1}`,
                    date: e,
                    desc: "",
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id={`assignment${key + 1}Description`}
                label={`Assignment ${key + 1} Description`}
                value={index != -1 ? itemss[index].desc : assignmentoneText}
                onChange={(e) => {
                  ////console.log(e.target.value)
                  assignmentTexts({
                    id: `assignment${key + 1}`,
                    desc: e.target.value,
                  });
                }}
              />
            </LocalizationProvider>
          </div>
        );
      })}
    </div>
  );
}

export default Assignment;
