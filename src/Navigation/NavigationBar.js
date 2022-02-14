import { Link } from "react-router-dom";
import React from "react";
import "./NavigationBar.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { signOutApi } from "../Redux/Actions/UserState";

function NavigationBar(props) {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });
  const menuBarStatus = useSelector((state) => {
    return state.menuState.menuBar;
  });
  const [trigSignout, setTrigSignout] = useState(false);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(signOutApi());
  };
  return (
    <>
      {menuBarStatus ? (
        <div className="NavigationBar_Modal" onClick={() => props.menueoption(props.currmenue)}>
          <div className="NavigationBar_MenuTab">
            <nav className="NavigationBar_NavTab">
              {console.log(menuBarStatus)}
              <a onClick={() => props.menueoption(props.currmenue)}>
                <Button  className="NavigationBar_Home" variant="text">
                  <img src="/images/Home.png" alt="" />
                  <Link  to="/Home">
                    Home
                  </Link>
                </Button>

                <Button>
                  <img src="/images/course.png" alt="" />
                  <Link to="/Courses">Courses</Link>
                </Button>

                <Button variant="text">
                  <img src="/images/deadline.png" alt="" />
                  <Link to="/Deadlines">Deadlines</Link>
                </Button>

                <Button variant="text">
                  <img src="/images/study.png" alt="" />
                  <Link to="/Study_History">Study - History</Link>
                </Button>
              </a>
              <a onClick={() => props.menueoption(props.currmenue)}>
                <Button className="NavigationBar_Home" variant="text">
                  <img src="/images/friend.png" alt="" />
                  <Link  to="/Friends">
                    Friends
                  </Link>
                </Button>

                <Button variant="text">
                  <img src="/images/message.png" alt="" />
                  <Link to="/Messages">Messages</Link>
                </Button>
                <Button variant="text">
                  <img src="/images/call.png" alt="" />
                  <Link to="/Video">Video</Link>
                </Button>
              </a>
              <a onClick={() => props.menueoption(props.currmenue)}>
                <Button  className="NavigationBar_Home" variant="text">
                  <img src="/images/setting.png" alt="" />
                  <Link to="/Settings">
                    Settings
                  </Link>
                </Button>
              </a>
            </nav>
          </div>
        </div>
      ) : null}
      <div className="NavigationBar_Layout">
        <div className="NavigationBar_MenuBar">
          <nav className="NavigationBar_NavMenue">
            <Button variant="text">
              <img src="/images/Home.png" alt="" />
              <Link className="NavigationBar_links" to="/Home">
                Home
              </Link>
            </Button>

            <Button variant="text">
              <img src="/images/course.png" alt="" />
              <Link className="NavigationBar_inks" to="/Courses">
                Courses
              </Link>
            </Button>

            <Button variant="text">
              <img src="/images/deadline.png" alt="" />
              <Link className="NavigationBar_links" to="/Deadlines">
                Deadlines
              </Link>
            </Button>

            <Button variant="text">
              <img src="/images/message.png" alt="" />
              <Link className="NavigationBar_links" to="/Messages">
                Messages
              </Link>
            </Button>

            <Button variant="text">
              <img src="/images/setting.png" alt="" />
              <Link className="NavigationBar_links" to="/Settings">
                Settings
              </Link>
            </Button>
          </nav>

          <div className="NavigationBar_Users">
            {userstat && userstat.photoURL ? (
              
              <img
                className="NavigationBar_UserPic"
                src={userstat.photoURL}
                all=""
                onClick={() => setTrigSignout((prevState) => !prevState)}
              />
            ) : (
              <img
                className="NavigationBar_UserPic"
                src="/images/user1.svg"
                all=""
                onClick={() => setTrigSignout((prevState) => !prevState)}
              />
            )}
            <img
              className="NavigationBar_Downarrow"
              src="/images/downarrow.png"
              all=""
              style={
                trigSignout
                  ? { transform: "rotate(180deg)" }
                  : { transform: "rotate(0deg)" }
              }
            />
          </div>
          {trigSignout ? (
            <div className="NavigationBar_Signout">
              <Button
                sx={{ "background-color": "white" }}
                onClick={() => {
                  signOut();
                }}
              >
                SignOut
              </Button>
            </div>
          ) : null}
        </div>
        <div className="NavigationBar_Body">{props.children}</div>
      </div>
    </>
  );
}

export default NavigationBar;
