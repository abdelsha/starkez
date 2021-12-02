import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import {
  getOnlineUsers,
  retrieveFriendList,
  signOutApi,
} from "../../Redux/Actions/UserState";
import { Redirect } from "react-router-dom";
import classes from "./Home.module.css";
import { useState, useEffect } from "react";
import Status from "../Course/Status";
import Deadlines from "../Course/Deadlines";
import Video from "../Video1/Video";
import { Spinner } from "react-bootstrap";
import { CircularProgress, Box } from "@mui/material";

function HomePage() {
  var redirectReq = 0;
  const [loaded, setLoaded] = useState(false);
  const [courseload, setCourseLoad]=useState(false);
  const userstat = useSelector((state) => {
    return state.userState.user;
  });

  const courseStat = useSelector((state) => {
    return state.courseState.courses;
  });
  const examData = useSelector((state) => {
    return state.courseState.examData;
  });
  const midtermData = useSelector((state) => {
    return state.courseState.midtermData;
  });
  const projectData = useSelector((state) => {
    return state.courseState.projectData;
  });
  const quizData = useSelector((state) => {
    return state.courseState.quizData;
  });
  const assignmentData = useSelector((state) => {
    return state.courseState.assignmentData;
  });
  const courseData = useSelector((state) => {
    return state.courseState.courseData;
  });
  const friends = useSelector((state) => {
    return state.userState.friendList;
  });
  const onlineUser = useSelector((state) => state.userState.online_users);
  const [videoOn, setVideoOn] = useState(false);
  const dispatch = useDispatch();

  const usedispatchHelper = (item, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(item);
      resolve();
    });
  useEffect(() => {
    //console.log(courseStat)

    try {
      usedispatchHelper(getOnlineUsers(), dispatch).then(() => {
        usedispatchHelper(retrieveFriendList(), dispatch).then(() => {
          //console.log("done");
          if (courseData.length > 1) {
            setCourseLoad(()=>true)
            if (userstat) {
              setLoaded(true);
            }
          }
        });
      });
    } catch {}
  }, [courseData]);

  const signOut = () => {
    dispatch(signOutApi());
  };

  return (
    <>
    
      {!loaded ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className={classes.CommonCards}>
          {!userstat && <Redirect to="/" />}

          <div className={classes.Layouts}>
            <div className={classes.Courses}>
              <h2>Courses</h2>
              {!courseStat.length > 1 ? (
                <div />
              ) : (
                courseStat.map((course, key) => {
                  return (
                    <div className={classes.CoursesCard}>
                      {course.courseName}
                    </div>
                  );
                })
              )}
            </div>
            <div className={classes.Deadlines}>
              {!courseload ? null : <Deadlines />}
            </div>
            <div className={classes.Friends}>
              <div className={classes.CommonCardss}>
                <h2>Friends</h2>
                {friends.length > 0
                  ? friends.map((user) => {
                      return (
                        <div key={user.UID} className={classes.displayName}>
                          <div className={classes.displayPic}>
                            {user.sharedImg ? (
                              <img src={user.sharedImg} all="" />
                            ) : (
                              <img src="/images/user1.svg" all="" />
                            )}
                          </div>
                          <div style={{ margin: "0 10px" }}>
                            <span style={{ fontWeight: 500 }}>
                              {user.fullName ? user.fullName : "UserName"}
                            </span>
                            <span
                              className={
                                user.isOnline ? `${classes.onlineStatus}` : null
                              }
                            ></span>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className={classes.CourseDetail}>
              {!courseStat.length > 1 ? <div /> : <Status />}
            </div>
            <div className={classes.Messages}>
              <div className={classes.CommonCardss}>
                <h2>Messages</h2>
                {friends.length > 0
                  ? friends.map((user) => {
                      return (
                        <div key={user.UID} className={classes.displayName}>
                          <div className={classes.displayPic}>
                            {user.sharedImg ? (
                              <img src={user.sharedImg} all="" />
                            ) : (
                              <img src="/images/user1.svg" all="" />
                            )}
                          </div>
                          <div style={{ margin: "0 10px" }}>
                            <span style={{ fontWeight: 500 }}>
                              {user.fullName ? user.fullName : "UserName"}
                            </span>
                            <span
                              className={
                                user.isOnline
                                  ? `${classes.onlineStatus}`
                                  : `${classes.onlineStatusoff}`
                              }
                            ></span>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className={classes.Videos}>
              <div className={classes.CommonCardss}>
                <h2>Video</h2>
                <div>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      setVideoOn(true);
                    }}
                  >
                    Start Video Call
                    {videoOn && <Redirect to="/Video" />}
                  </Button>
                </div>
              </div>
            </div>
            <div className={classes.StudySession}>
              <div className={classes.CommonCard}>Study Session</div>
            </div>
            <div className={classes.StudyHistory}>
              <div className={classes.CommonCard}>Study History</div>
            </div>
            <div className={classes.Encouraging}>
              <div className={classes.CommonCard}>
                Encouraging words
                {/*<Button
                variant="contained"
                onClick={() => {
                  signOut()
                }}
                
              >
                SignOut
              </Button>
              <Button variant="contained">
                <Link
                  href="/"
                  underline="none"
                  sx={{
                    color: "white",
                  }}
                >
                  SignIn
                </Link>
                </Button>*/}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
