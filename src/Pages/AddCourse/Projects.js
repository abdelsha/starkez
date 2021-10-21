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

import { setProjectNumber, setProjectData, setMidtermNumber } from "../../Redux/Actions/Course";

function Project() {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const projectNumber12 = useSelector((state) => {
    return state.courseState.projectNumber;
  });

  const projectData12 = useSelector ((state)=> {
      return state.courseState.projectData;
  })

  const dispatch = useDispatch();

  const setExamNumberDispatch = (payload) => {
    dispatch(setProjectNumber(payload));
  };

  const setProjectDataDispatch = (payload) => {
      dispatch(setProjectData(payload));
  }

  const [courseStart, setCourseStart] = useState(
    new Date("2014-08-18T21:11:54")
  );

  const [projectone, setProjectone] = useState(new Date("2023-01-11T21:11:54"));

  let [projectoneText, setProjectoneText] = useState("");

  const [projectNumbers, setProjectNumbers] = useState("");
  const [projectNumbers1, setprojectNumbers1] = useState([]);

  const [itemss, setItemss] = useState([
    {
      id: "",
      date: "",
      desc: "",
    },
  ]);

  useEffect(() => {
    newElements();
  }, [projectNumber12]);

  const newElements = () => {
    let value = projectNumber12;
    let array = [];
    for (let i = 0; i < value; i++) {
      array.push(i);
    }
    setprojectNumbers1(array);
  };

  const projectDatesHelper = (val) => {
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

      if (newArr.length > parseInt(projectNumbers, 10) + 1) {
        let finArr = [];
        //console.log("heresss");
        newArr.map((x, key) => {
          if (key < parseInt(projectNumbers, 10) + 1) {
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
    setProjectDataDispatch(itemss);
  };

  const projectTexts = (val) => {
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
      if (newArr.length > parseInt(projectNumbers, 10) + 1) {
        //console.log(projectNumbers);
        let finArr = [];
        //console.log("here");
        newArr.map((x, key) => {
          if (key < parseInt(projectNumbers, 10) + 1) {
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
    setProjectDataDispatch(itemss);
  };

  return (
    <div className={classes.Exams}>
      <div className={classes.ExamHead}>
        {projectNumber12 >= 1 ? <h2>Projects</h2> : <div />}
      </div>

      {projectNumbers1.map((val, key) => {
        ////console.log(items);
        let index = itemss.findIndex((x) => x.id == `project${key + 1}`);
        let newIndex = 0;
        if (index != -1) {
          newIndex = index;
          //console.log("true");
        } else {
          newIndex = projectone;
          //console.log("false");
        }
        //console.log(index);
        return (
          <div className={classes.ExamDates}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                id={`project${key + 1}Date`}
                label={`project ${key + 1}`}
                inputFormat="MM/dd/yyyy"
                value={index != -1 ? itemss[index].date : projectone}
                onChange={(e) => {
                  projectDatesHelper({
                    id: `project${key + 1}`,
                    date: e,
                    desc: "",
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id={`project${key + 1}Description`}
                label={`Project ${key + 1} Description`}
                value={index != -1 ? itemss[index].desc : projectoneText}
                onChange={(e) => {
                  ////console.log(e.target.value)
                  projectTexts({
                    id: `project${key + 1}`,
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

export default Project;
