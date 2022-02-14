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

import { setQuizData, setQuizNumber } from "../../Redux/Actions/Course";

function Quiz(props) {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const quizNumber12 = props.quizNum;

  const dispatch = useDispatch();

  const setQuizNumberDispatch = (payload) => {
    dispatch(setQuizNumber(payload));
  };

  const [quizone, setQuizone] = useState(new Date());

  let [quizoneText, setQuizoneText] = useState("");

  const [quizNumbers, setQuizNumbers] = useState("");
  const [quizNumbers1, setQuizNumbers1] = useState([]);
  const [courseName, setCourseNames] = useState("");

  ///////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////
  const [itemss, setItemss] = useState([
    {
      courseName: courseName,
      id: "",
      date: "",
      desc: "",
      complete: false,
    },
  ]);

  useEffect(() => {
    newElements();
  }, [quizNumber12]);
  const newElements = () => {
    let value = quizNumber12;
    let array = [];
    for (let i = 0; i < value; i++) {
      array.push(i);
    }
    setQuizNumbers1(array);
  };

  return (
    <div className={classes.Exams}>
      <div className={classes.ExamHead}>
        {quizNumber12 >= 1 ? <h2>Quizs</h2> : <div />}
      </div>

      {quizNumbers1.map((val, key) => {
        ////console.log(items);
        let index = props.itemss.findIndex((x) => x.id == `quiz${key + 1}`);
        let newIndex = 0;
        if (index != -1) {
          newIndex = index;
          //console.log("true");
        } else {
          newIndex = quizone;
          //console.log("false");
        }
        //console.log(index);
        return (
          <div className={classes.ExamDates} key={key}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                id={`quiz${key + 1}Date`}
                label={`quiz ${key + 1}`}
                inputFormat="MM/dd/yyyy"
                value={index != -1 ? props.itemss[index].date : quizone}
                onChange={(e) => {
                  props.inputdesc(`quiz${key + 1}`, e, "date");
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id={`quiz${key + 1}Description`}
                label={`Quiz ${key + 1} Description`}
                value={index != -1 ? props.itemss[index].desc : quizoneText}
                onChange={(e) => {
                  props.inputdesc(`quiz${key + 1}`, e.target.value, "desc");
                }}
              />
            </LocalizationProvider>
          </div>
        );
      })}
    </div>
  );
}

export default Quiz;
