import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./MessagePage.module.css";
import { useState, useEffect } from "react";
import { getOnlineUsers } from "../../Redux/Actions/UserState";

function MessagePage() {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });
  const onlineUser = useSelector(state =>state.userState.online_users);
  const [loaded, setLoaded] = useState("false");


  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(userstat)
    if (userstat) {
      //console.log(true);
      setLoaded("true");
      getOnlineUsers();
      //console.log(onlineUser)
    }
    ;
  }, [[], userstat]);
  return (
    <section className={classes.container}>
      {loaded == "true" ? (
        <div className={classes.container}>
          
          <div className={classes.listOfUsers}>
            <div className={classes.displayName}>
              <div className={classes.displayPic}>
                {userstat && userstat.photoURL ? (
                  <img src={userstat.photoURL} all="" />
                ) : (
                  <img src="/images/user1.svg" all="" />
                )}
              </div>
              <div style={{ margin: "0 10px" }}>
                <span style={{ fontWeight: 500 }}>{userstat.displayName? userstat.displayName: "UserName"}</span>
              </div>
            </div>
          </div>
          <div className={classes.chatArea}>
            <div className={classes.chatHeader}> {userstat.displayName? userstat.displayName: "UserName"} </div>
            <div className={classes.messageSections}>
              <div style={{ textAlign: "left" }}>
                <p className={classes.messageStyle}>Hello User</p>
              </div>
            </div>
            <div className={classes.chatControls}>
              <textarea />
              <button>Send</button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
}

export default MessagePage;
