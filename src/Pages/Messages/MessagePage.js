import React, { version } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./MessagePage.module.css";
import { useState, useEffect } from "react";
import { getOnlineUsers, getRealTimeConversations, updateMessate } from "../../Redux/Actions/UserState";
import { auth } from "../../Firebase/Firebase";

function MessagePage(props) {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const getMessage = useSelector((state)=>{
    return state.userState.conversations;
  })
  const onlineUser = useSelector((state) => state.userState.online_users);
  const [loaded, setLoaded] = useState("false");
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState("");
  


  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(userstat)
    if (userstat) {
      //console.log(true);
      setLoaded("true");

      //console.log(onlineUser)
    }
  }, [[], userstat]);

  useEffect(() => {
    dispatch(getOnlineUsers());
    console.log(getMessage)
  }, [userstat,getMessage]);

  const initChat = (user)=>{
    setChatStarted(true);
    setChatUser(user.fullName);
    setUserUid(user.UID)
    console.log(user.UID)
    dispatch(getRealTimeConversations({uid_1:userstat.uid, uid_2:user.UID}));
    console.log(user)
  }

  const submitMessage=(e) =>{
    const messObj={
      user_uid_1: userstat.uid,
      user_uid_2:userUid,
      message,
    }

    if (message!=""){
      dispatch(updateMessate(messObj,userUid))
      .then(()=>{setMessage("")})
    }
    //console.log(messObj)
  }
  return (
    <section className={classes.container}>
      {loaded == "true" ? (
        <div className={classes.container}>
          <div className={classes.listOfUsers}>
            {onlineUser.length > 0
              ? onlineUser.map((user) => {
                  return (
                    <div
                      onClick={() => {
                        initChat(user);
                      }}
                      key={user.UID}
                      className={classes.displayName}
                    >
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
                        <span className={user.isOnline ? `${classes.onlineStatus}`:`${classes.onlineStatusoff}`}></span>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className={classes.chatArea}>
            <div className={classes.chatHeader}>
              {chatStarted  ? chatUser : ""}
            </div>

            <div className={classes.messageSections}>
              {chatStarted  ? (
                getMessage.map(conv=>{
                 return( <div style={{ textAlign: conv.user_uid_1 == userstat.uid? "right": "left" }}>
                  <p className={classes.messageStyle}>{conv.message}</p>
                </div>)
                })
                
              ) : null}
            </div>
            {chatStarted ? (
              <div className={classes.chatControls}>
                <textarea 
                value={message}
                onChange={((e)=>{
                  setMessage(e.target.value)
                })}
                />
                <button
                onClick={submitMessage}
                >Send</button>
              </div>
            ) : (
              null
            )}
            
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
}

export default MessagePage;
