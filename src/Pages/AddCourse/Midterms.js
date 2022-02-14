import React, { createElement } from "react";
import classes from "./AddCourse.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DateFnsUtils from "@date-io/date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, CardActions, listItemIconClasses } from "@mui/material";
import firebase from "firebase";

import { setMidtermData, setMidtermNumber } from "../../Redux/Actions/Course";

function Midterm(props) {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const midtermNumber12 = props.midtermNum;

  const midtermData12 = useSelector((state) => {
    return state.courseState.midtermData;
  });

  const dispatchs = useDispatch();

  const setMidtermNumberDispatch = (payload) => {
    dispatchs(setMidtermNumber(payload));
  };

  const [midtermone, setMidtermone] = useState(new Date());

  let [midtermoneText, setMidtermoneText] = useState("");

  const [midtermNumbers, setMidtermNumbers] = useState("");
  const [midtermNumbers1, setMidtermNumbers1] = useState([]);
  const [courseName, setCourseNames] = useState("");
 
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    newElements();
  }, [midtermNumber12]);

  const newElements = () => {
    let value = midtermNumber12;
    let array = [];
    for (let i = 0; i < value; i++) {
      array.push(i);
    }
    setMidtermNumbers1(array);
  };

  //////////////////////////////////////////////////////////////////////

  return (
    <div className={classes.Exams}>
      <div className={classes.ExamHead}>
        {midtermNumber12 >= 1 ? <h2>Midterms</h2> : <div />}
      </div>

      {midtermNumbers1.map((val, key) => {
        ////console.log(items);
        let index = props.itemss.findIndex((x) => x.id == `midterm${key + 1}`);
        //console.log(index)
        let newIndex = 0;
        if (index != -1) {
          newIndex = index;
          //console.log("true");
        } else {
          newIndex = midtermone;
          //console.log("false");
        }
        //console.log(index);
        return (
          <div className={classes.ExamDates} key={key}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                id={`midterm${key + 1}Date`}
                label={`midterm ${key + 1}`}
                inputFormat="MM/dd/yyyy"
                value={index != -1 ? props.itemss[index].date : midtermone}
                onChange={(e) => {
                  props.inputdesc(`midterm${key + 1}`, e, "date");
                  //descHelper(`midterm${key + 1}`,e, "date")
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id={`midterm${key + 1}Description`}
                label={`Midterm ${key + 1} Description`}
                value={index != -1 ? props.itemss[index].desc : midtermoneText}
                onChange={(e) => {
                  ////console.log(e.target.value)
                  props.inputdesc(`midterm${key + 1}`, e.target.value, "desc");
                }}
              />
            </LocalizationProvider>
          </div>
        );
      })}
    </div>
  );
}

export default Midterm;
