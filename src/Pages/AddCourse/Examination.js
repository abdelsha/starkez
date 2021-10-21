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

function Examination() {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const examNumber12 = useSelector((state) => {
    return state.courseState.examNumber;
  });

  const examData12 = useSelector((state) => {
    return state.courseState.examData;
  });

  const dispatch = useDispatch();

  const setExamNumberDispatch = (payload) => {
    dispatch(setExamNumber(payload));
  };

  const setExamDataDispatch = (payload) => {
    dispatch(setExamData(payload));
  };

  const [courseStart, setCourseStart] = useState(
    new Date("2023-01-11T21:11:54")
  );

  const [examone, setExamone] = useState(new Date("2023-01-11T21:11:54"));

  let [examoneText, setExamoneText] = useState("");

  const [examNumbers, setExamNumbers] = useState("");
  const [examNumbers1, setExamNumbers1] = useState([]);

  const [itemss, setItemss] = useState([
    {
      id: "",
      date: "",
      desc: "",
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

  const examDatesHelper = (val) => {
    let newArr = [...itemss];
    let index = itemss.findIndex((x) => x.id == val.id);
    if (index == -1) {
      //console.log("sdaas");
      setItemss([
        ...itemss,
        {
          id: val.id,
          date: val.date,
          desc: "",
        },
      ]);
    } else {
      newArr[index].date = val.date;
      //console.log(newArr);
      //console.log(newArr[1]);

      if (newArr.length > parseInt(examNumbers, 10) + 1) {
        let finArr = [];
        //console.log("heresss");
        newArr.map((x, key) => {
          if (key < parseInt(examNumbers, 10) + 1) {
            finArr.push(x);
            //console.log(finArr);
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
    setExamDataDispatch(itemss);
    //console.log(examData12);
  };

  const examTexts = (val) => {
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
    } else {
      let value = val.desc;
      newArr[index].desc = value;
      if (newArr.length > parseInt(examNumbers, 10) + 1) {
        //console.log(examNumbers);
        let finArr = [];
        //console.log("here");
        newArr.map((x, key) => {
          if (key < parseInt(examNumbers, 10) + 1) {
            finArr.push(x);
            //console.log(finArr);
          }
        });
        setItemss(finArr);
      } else {
        //console.log(newArr)
        setItemss(newArr);
      }
    }
    setExamDataDispatch(itemss);
    //console.log(examData12);
  };

  return (
    <div className={classes.Exams}>
      <div className={classes.ExamHead}>
        {examNumber12 >= 1 ? <h2>Exams</h2> : <div />}
      </div>

      {examNumbers1.map((val, key) => {
        //console.log(items);
        let index = itemss.findIndex((x) => x.id == `exam${key + 1}`);
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
          <div className={classes.ExamDates}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                id={`exam${key + 1}Date`}
                label={`exam ${key + 1}`}
                inputFormat="MM/dd/yyyy"
                value={index != -1 ? itemss[index].date : examone}
                onChange={(e) => {
                  examDatesHelper({
                    id: `exam${key + 1}`,
                    date: e,
                    desc: "",
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id={`exam${key + 1}Description`}
                label={`Exam ${key + 1} Description`}
                value={index != -1 ? itemss[index].desc : examoneText}
                onChange={(e) => {
                  //console.log(e.target.value)
                  examTexts({
                    id: `exam${key + 1}`,
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

export default Examination;
