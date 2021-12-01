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

import { setExamNumber, setExamData } from "../../Redux/Actions/Course";

function Examination(props) {
  let courseNames;
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const dispatch = useDispatch();
  const examNumber12 = props.examNum;
  const setExamNumberDispatch = (payload) => {
    dispatch(setExamNumber(payload));
  };

  /*const setExamDataDispatch = (payload) => {
    dispatch(setExamData(payload));
  };*/

  const [examone, setExamone] = useState(new Date());

  let [examoneText, setExamoneText] = useState("");

  const [examNumbers, setExamNumbers] = useState("");
  const [examNumbers1, setExamNumbers1] = useState([]);

  const [courseName, setCourseNames] = useState("");

  ///////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////
  const [itemss, setItemss] = useState([
    {
      courseName: courseNames,
      id: "",
      date: "",
      desc: "",
      complete: false,
    },
  ]);

  useEffect(() => {
    newElements();
  }, [examNumber12]);
  const newElements = () => {
    let value = examNumber12;
    let array = [];
    for (let i = 0; i < value; i++) {
      array.push(i);
    }
    setExamNumbers1(array);
  };

  return (
    <div className={classes.Exams}>
      <div className={classes.ExamHead}>
        {examNumber12 >= 1 ? <h2>Exams</h2> : <div />}
      </div>

      {examNumbers1.map((val, key) => {
        //console.log(items);
        let index = props.itemss.findIndex((x) => x.id == `exam${key + 1}`);
        let newIndex = 0;
        if (index != -1) {
          newIndex = index;
          //console.log("true");
        } else {
          newIndex = examone;
          //console.log("false");
        }
        //console.log(index);
        return (
          <div className={classes.ExamDates} key={key}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                id={`exam${key + 1}Date`}
                label={`exam ${key + 1}`}
                inputFormat="MM/dd/yyyy"
                value={index != -1 ? props.itemss[index].date : examone}
                onChange={(e) => {
                  props.inputdesc(`exam${key + 1}`, e, "date");
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id={`exam${key + 1}Description`}
                label={`Exam ${key + 1} Description`}
                value={index != -1 ? props.itemss[index].desc : examoneText}
                onChange={(e) => {
                  props.inputdesc(`exam${key + 1}`, e.target.value, "desc");
                }}
              />
            </LocalizationProvider>
          </div>
        );
      })}
    </div>
  );
}

export default Examination;
