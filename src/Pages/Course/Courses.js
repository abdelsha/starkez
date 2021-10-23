import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import classes from "./Course.module.css";
import Deadlines from "./Deadlines";
import Status from "./Status";
import StudyHistory from "./StudyHistory";

function CoursePage() {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const dispatch = useDispatch();
  return (
    <div className={classes.Layouts}>
      <div className={classes.MenuTabs}>Course</div>

      <div className={classes.MainArea}>
          <div className={classes.MainContent}>
          {/*<Deadlines/>
          <Status/>
          <StudyHistory/>*/}
              
              
             

          </div>
        <div className={classes.Button}>
          <Button variant="contained" href="/Add_Course" className={classes.buttons} sx={{
              "border-radius":"50%",
              "padding":"5px 5px",
              "min-width":"auto",
          }}>
              <img src="./images/plus-icon.png" all=""/>
            
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
