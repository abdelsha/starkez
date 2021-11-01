import { ClassNames } from "@emotion/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./DeadlinePage.module.css";
import { useState, useEffect } from "react";
import {
  getCoursesAPI,
  UpdateCourseInfo,
  quickSort,
} from "../../Redux/Actions/Course";
import { getUserAuth } from "../../Redux/Actions/UserState";
import { PieChart } from "react-minimal-pie-chart";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


function DeadlinePage() {
  const [loaded, setLoaded] = useState("false");
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });
  const assignmentData = useSelector((state) => {
    return state.courseState.assignmentData;
  });

  let totArr = [];
  let totOrdArr = [];
  let arr2 = [];

  const retdeadlines = useSelector((state) => {
    return state.courseState.deadlines;
  });
  const orderdCourse = useSelector((state) => {
    return state.courseState.orderdCourse;
  });
  const dispatch = useDispatch();

  const sorting = (array, value) => {
    //console.log(quickSort(array,value));
  };
  useEffect(() => {
    console.log(retdeadlines);
    if (assignmentData.length > 1) {
      console.log("loaded");
      setLoaded("true");
    }
  }, [[], retdeadlines]);

  const dateMaker = (date) => {
    let dates =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    return dates;
  };

  const setComplete=(value,index) =>{
      let cusArr=orderdCourse;
      console.log([value,index])
      
  }
  return (
    <div className={classes.Layouts}>
      <div className={classes.Deadlines}>
        <div className={classes.CommonCard}>
          <h2>Deadlines</h2>
          {loaded == "true" ? (
            <div>
              {orderdCourse.map((data,key) => {
                return (
                  <div className={classes.CommonCards}>
                    <span>Course Name: {data.courseName}</span>
                    <span>Description: {data.desc}</span>
                    <span>
                      Due Date: {dateMaker(data.date.toDate()).toString()}
                    </span>
                    <FormControlLabel control={<Checkbox onClick={(e)=>{setComplete(e,key)}}/>} label="Completed" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
      <div className={classes.Status}>
        <div className={classes.CommonCard}>
          <PieChart
          animation
          animationDuration={500}
          animationEasing="ease-out"
          center={[50, 50]}
            data={[
              { title: "One", value: 10, color: "#E38627" },
              { title: "Two", value: 15, color: "#C13C37" },
              { title: "Three", value: 20, color: "#6A2135" },
            ]}
            
          />
        </div>
      </div>
    </div>
  );
}

export default DeadlinePage;
