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
  setProjectNumber,
  setProjectData,
  setMidtermNumber,
} from "../../Redux/Actions/Course";

function Project(props) {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const projectNumber12 = props.projectNum;

  const dispatch = useDispatch();

  const setExamNumberDispatch = (payload) => {
    dispatch(setProjectNumber(payload));
  };

  const [projectone, setProjectone] = useState(new Date());

  let [projectoneText, setProjectoneText] = useState("");

  const [projectNumbers, setProjectNumbers] = useState("");
  const [projectNumbers1, setprojectNumbers1] = useState([]);
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
  }, [projectNumber12]);

  const newElements = () => {
    let value = projectNumber12;
    let array = [];
    for (let i = 0; i < value; i++) {
      array.push(i);
    }
    setprojectNumbers1(array);
  };

  return (
    <div className={classes.Exams}>
      <div className={classes.ExamHead}>
        {projectNumber12 >= 1 ? <h2>Projects</h2> : <div />}
      </div>

      {projectNumbers1.map((val, key) => {
        ////console.log(items);
        let index = props.itemss.findIndex((x) => x.id == `project${key + 1}`);
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
          <div className={classes.ExamDates} key={key}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                id={`project${key + 1}Date`}
                label={`project ${key + 1}`}
                inputFormat="MM/dd/yyyy"
                value={index != -1 ? props.itemss[index].date : projectone}
                onChange={(e) => {
                  props.inputdesc(`project${key + 1}`, e, "date");
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id={`project${key + 1}Description`}
                label={`Project ${key + 1} Description`}
                value={index != -1 ? props.itemss[index].desc : projectoneText}
                onChange={(e) => {
                  props.inputdesc(`project${key + 1}`, e.target.value, "desc");
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
