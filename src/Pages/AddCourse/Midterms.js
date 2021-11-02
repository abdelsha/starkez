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

  const dispatch = useDispatch();

  const setMidtermNumberDispatch = (payload) => {
    dispatch(setMidtermNumber(payload));
  };
  

  const [midtermone, setMidtermone] = useState(new Date());

  let [midtermoneText, setMidtermoneText] = useState("");

  const [midtermNumbers, setMidtermNumbers] = useState("");
  const [midtermNumbers1, setMidtermNumbers1] = useState([]);
  const [courseName, setCourseNames] = useState("");

  useEffect(() => {
    setCourseNames(props.courseName);
  }, [[], props.courseName]);
  const [itemss, setItemss] = useState([
    {
      courseName: courseName,
      id: "",
      date: "",
      desc: "",
      complete: "",
    },
  ]);

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

  const midtermDatesHelper = (val) => {
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
          complete: "",
        },
      ]);
    } else {
      newArr[index].date = val.date;
      newArr[index].courseName = courseName;
      //console.log(newArr);
      ////console.log(newArr[1]);

      if (newArr.length > parseInt(midtermNumbers, 10) + 1) {
        let finArr = [];
        //console.log("heresss");
        newArr.map((x, key) => {
          if (key < parseInt(midtermNumbers, 10) + 1) {
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
    //setMidtermDataDispatch(itemss);
  };

  const midtermTexts = (val) => {
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
          complete: "",
        },
      ]);
    } else {
      let value = val.desc;
      newArr[index].desc = value;
      newArr[index].courseName = courseName;
      if (newArr.length > parseInt(midtermNumbers, 10) + 1) {
        //console.log(midtermNumbers);
        let finArr = [];
        //console.log("here");
        newArr.map((x, key) => {
          if (key < parseInt(midtermNumbers, 10) + 1) {
            finArr.push(x);
            //console.log(finArr);
          }
        });
        setItemss(finArr);
      } else {
        ////console.log(newArr)
        setItemss(newArr);
      }

      //console.log(itemss);
    }
    props.data(itemss);
    //setMidtermDataDispatch(itemss);
  };

  return (
    <div className={classes.Exams}>
      <div className={classes.ExamHead}>
        {midtermNumber12 >= 1 ? <h2>Midterms</h2> : <div />}
      </div>

      {midtermNumbers1.map((val, key) => {
        ////console.log(items);
        let index = itemss.findIndex((x) => x.id == `midterm${key + 1}`);
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
                    desc: "",
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id={`midterm${key + 1}Description`}
                label={`Midterm ${key + 1} Description`}
                value={index != -1 ? itemss[index].desc : midtermoneText}
                onChange={(e) => {
                  ////console.log(e.target.value)
                  midtermTexts({
                    id: `midterm${key + 1}`,
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

export default Midterm;
