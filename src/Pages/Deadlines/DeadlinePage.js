import { ClassNames } from "@emotion/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./DeadlinePage.css";
import { useState, useEffect } from "react";
import {
  getCoursesAPI,
  UpdateCourseInfo,
  quickSort,
  updateCoursesAPI,
} from "../../Redux/Actions/Course";
import { getUserAuth } from "../../Redux/Actions/UserState";
import { PieChart } from "react-minimal-pie-chart";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Button } from "@mui/material";
import {Redirect } from "react-router-dom";
import { CircularProgress } from "@mui/material"
import Status from "../Course/PieChart";
import Deadlines from "../Course/Deadlines";

function DeadlinePage() {
  let templist = ["All"];
  
  const [loaded, setLoaded] = useState(false);
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.courses;
  });
  const assignmentData = useSelector((state) => {
    return state.courseState.assignmentData;
  });

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
    //console.log(orderdCourse);
    if (assignmentData.length > 1) {
      //console.log(examNumber);
      setLoaded(()=>true);
      
    }
    //console.log(courseStat)
  }, [[], retdeadlines]);

  const dateMaker = (date) => {
    let dates =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    return dates;
  };
  // This sends the checked items to the firestore
  const setComplete = (event, value, index) => {
    let coursename = value.courseName;
    let values = "";
    updateCoursesAPI(userstat, coursename, value, event.target.checked);
    //dispatch(updateCoursesAPI())
  };

  //This section works on the option bar for the pie graph

  //This section is for the pie graph
  const currentDate = new Date();
  return (
    <>
    {!loaded ? (
  <Box
    sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
  >
    <CircularProgress />
  </Box>):(
    <div className="DeadlinePage_Layouts">
      {!userstat && <Redirect to="/" />}
      <div className="DeadlinePage_Deadlines">
        <div className="DeadlinePage_CommonCard">
          <h2>Deadlines</h2>
          {loaded ? (
            <div className="DeadlinePage_CurrentPastDeadlines">
              <div className="DeadlinePage_CurrentDeadlines">
              <h4>Current Deadlines</h4>
              <div className="DeadlinePage_PastDeadlines" >
              
              {orderdCourse.map((data, key) => {
              //console.log(data.date.toDate())
              if(currentDate.getTime()<=data.date.toDate().getTime()){
                return (
                  <div className="DeadlinePage_DataDisplays" key={key}>
                    <div className="DeadlinePage_Commoncards">
                      <div className="DeadlinePage_DeadLineText"
                      
                      style={currentDate.getTime()>data.date.toDate().getTime()?{color:"red", fontWeight:"bold"}:{color:"black"}}
                      > 
                        
                        <p>{data.courseName}</p>
                        <p> {data.desc}</p>
                        <p>
                          {dateMaker(data.date.toDate()).toString()}
                        </p>
                        <Checkbox className="Deadline_checkboxs"
                        checked={data.complete}
                        onChange={(e) => {
                          setComplete(e, data, key);
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      </div>
                      {/*data.toDateString()*/}
                    </div>
                  </div>
                );
              }
              
              })}
                
              
              </div>
              </div>
              <div className="DeadlinePage_CurrentDeadlines">
                <h4>Past Deadlines</h4>
                <div className="DeadlinePage_PastDeadlines">
                {orderdCourse.map((data, key) => {
                if(currentDate.getTime()>data.date.toDate().getTime()){
                  return (
                    <div className="DeadlinePage_DataDisplays" key={key}>
                      <div className="DeadlinePage_Commoncards">
                        <div className="DeadlinePage_DeadLineText"
                        
                        style={currentDate.getTime()>data.date.toDate().getTime()?{color:"red", fontWeight:"bold"}:{color:"black"}}
                        > 
                          
                          <p>{data.courseName}</p>
                          <p> {data.desc}</p>
                          <p>
                            {dateMaker(data.date.toDate()).toString()}
                          </p>
                          <Checkbox className="Deadline_checkboxs"
                      checked={data.complete}
                      onChange={(e) => {
                        setComplete(e, data, key);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                        </div>
                        {/*data.toDateString()*/}
                      </div>
                    </div>
                  );
                }
              
              })}

              </div>
            </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
      <div className="DeadlinePage_Status">
        <div className="DeadlinePage_CommonCardDeadLine">
          <div className="DeadlinePage_StatusCard">
            <div className="DeadlinePage_CommonCards">
              <Status/>
              
            </div>
            
              
            
          </div>
        </div>
      </div>
    </div>
  )}
    </>
  );
}

export default DeadlinePage;
