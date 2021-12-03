import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import {
  getOnlineUsers,
  retrieveFriendList,
  signOutApi,
} from "../../Redux/Actions/UserState";
import { Redirect } from "react-router-dom";
import "./Home.css";
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
    {!userstat && <Redirect to="/" />}
      {!loaded ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="Home_CommonCards">
          <div className="Home_Layouts">
            <div className="Home_Courses">
            <div className="Home_BlockCards">
              <h2>Courses</h2>
              {!courseStat.length > 1 ? (
                <div />
              ) : (
                courseStat.map((course, key) => {
                  return (
                    <div className="Home_CoursesCard">
                      {course.courseName}
                    </div>
                  );
                })
              )}
              </div>
            </div>
            <div className="Home_Deadlines">
              {!courseload ? null : <Deadlines />}
            </div>
            <div className="Home_Friends">
              <div className="Home_CommonCardss">
                <h2>Friends</h2>
                {friends.length > 0
                  ? friends.map((user) => {
                      return (
                        <div key={user.UID} className="Home_displayName">
                          <div className="Home_displayPic">
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
                                user.isOnline ? `${"Home_onlineStatus"}` : null
                              }
                            ></span>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="Home_CourseDetail">
              {!courseStat.length > 1 ? <div /> : <Status />}
            </div>
            <div className="Home_Messages">
              <div className="Home_CommonCardss">
                <h2>Messages</h2>
                {friends.length > 0
                  ? friends.map((user) => {
                      return (
                        <div key={user.UID} className="Home_displayName">
                          <div className="Home_displayPic">
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
                                  ? "Home_onlineStatus"
                                  : "Home_onlineStatusoff"
                              }
                            ></span>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="Home_Videos">
              <div className="Home_CommonCardss">
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
            <div className="Home_StudySession">
              <div className="Home_CommonCard">Study Session</div>
            </div>
            <div className="Home_StudyHistory">
              <div className="Home_CommonCard">Study History</div>
            </div>
            <div className="Home_Encouraging">
              <div className="Home_CommonCard">
                Encouraging words
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
