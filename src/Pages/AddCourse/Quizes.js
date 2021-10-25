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

  const quizNumber12 = useSelector((state) => {
    return state.courseState.quizNumber;
  });

  const quizData12 = useSelector ((state) => {
      return state.courseState.quizData;
  })

  const dispatch = useDispatch();

  const setQuizNumberDispatch = (payload) => {
    dispatch(setQuizNumber(payload));
  };

  /*const setQuizDataDispatch = (payload) => {
      dispatch(setQuizData(payload))
  }*/

  const [courseStart, setCourseStart] = useState(
    new Date("2023-01-11T21:11:54")
  );

  const [quizone, setQuizone] = useState(new Date("2023-01-11T21:11:54"));

  let [quizoneText, setQuizoneText] = useState("");

  const [quizNumbers, setQuizNumbers] = useState("");
  const [quizNumbers1, setQuizNumbers1] = useState([]);

  const [itemss, setItemss] = useState([
    {
      id: "",
      date: "",
      desc: "",
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

  const quizDatesHelper = (val) => {
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
      ////console.log(newArr[1]);

      if (newArr.length > parseInt(quizNumbers, 10) + 1) {
        let finArr = [];
        //console.log("heresss");
        newArr.map((x, key) => {
          if (key < parseInt(quizNumbers, 10) + 1) {
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
    }
    props.data(itemss);
    //setQuizDataDispatch(itemss);
  };

  const quizTexts = (val) => {
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
      if (newArr.length > parseInt(quizNumbers, 10) + 1) {
        //console.log(quizNumbers);
        let finArr = [];
        //console.log("here");
        newArr.map((x, key) => {
          if (key < parseInt(quizNumbers, 10) + 1) {
            finArr.push(x);
            //console.log(finArr);
          }
        });
        setItemss(finArr);
      } else {
        ////console.log(newArr)
        setItemss(newArr);
      }

      ////console.log(itemss);
    }
    props.data(itemss);
    //setQuizDataDispatch(itemss);
  };

  return (
    <div className={classes.Exams}>
      <div className={classes.ExamHead}>
        {quizNumber12 >= 1 ? <h2>Quizs</h2> : <div />}
      </div>

      {quizNumbers1.map((val, key) => {
        ////console.log(items);
        let index = itemss.findIndex((x) => x.id == `quiz${key + 1}`);
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
          <div className={classes.ExamDates}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                id={`quiz${key + 1}Date`}
                label={`quiz ${key + 1}`}
                inputFormat="MM/dd/yyyy"
                value={index != -1 ? itemss[index].date : quizone}
                onChange={(e) => {
                  quizDatesHelper({
                    id: `quiz${key + 1}`,
                    date: e,
                    desc: "",
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id={`quiz${key + 1}Description`}
                label={`Quiz ${key + 1} Description`}
                value={index != -1 ? itemss[index].desc : quizoneText}
                onChange={(e) => {
                  ////console.log(e.target.value)
                  quizTexts({
                    id: `quiz${key + 1}`,
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

export default Quiz;
