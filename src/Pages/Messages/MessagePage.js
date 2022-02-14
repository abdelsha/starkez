import React, { version } from "react";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import classes from "./MessagePage.css";
import "./MessagePage.css";
import { useState, useEffect } from "react";
import {
  getOnlineUsers,
  getRealTimeConversations,
  retrieveFriendList,
  retrieveRequestList,
  updateMessate,
} from "../../Redux/Actions/UserState";
import { auth } from "../../Firebase/Firebase";
import { Redirect } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
function MessagePage(props) {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const getMessage = useSelector((state) => {
    return state.userState.conversations;
  });

  const friends = useSelector((state) => {
    return state.userState.friendList;
  });
  const selectedFriend = useSelector((state) => {
    return state.userState.selectedFriend;
  });

  const requests = useSelector((state) => {
    return state.userState.requestList;
  });
  const onlineUser = useSelector((state) => state.userState.online_users);
  const [loaded, setLoaded] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(userstat)
    if (userstat) {
      //console.log(true);
      setLoaded(() => true);

      //console.log(onlineUser)
    }
  }, [[], userstat]);

  useEffect(() => {
    try {
      dispatch(getOnlineUsers());
      dispatch(retrieveFriendList());
      dispatch(retrieveRequestList());
    } catch {}
    //console.log(getMessage)
  }, [userstat, getMessage]);

  useEffect(() => {
    if (selectedFriend.UID) {
      //console.log(selectedFriend.UID)
      setChatStarted(true);
      setChatUser(selectedFriend.fullName);
      setUserUid(selectedFriend.UID);
      dispatch(
        getRealTimeConversations({
          uid_1: userstat.uid,
          uid_2: selectedFriend.UID,
        })
      );
      console.log("heress");
    }
  }, []);

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(user.fullName);
    setUserUid(user.UID);
    //console.log(user.UID)
    dispatch(
      getRealTimeConversations({ uid_1: userstat.uid, uid_2: user.UID })
    );

    //console.log(user)
  };

  const submitMessage = (e) => {
    const messObj = {
      user_uid_1: userstat.uid,
      user_uid_2: userUid,
      message,
    };

    if (message != "") {
      dispatch(updateMessate(messObj, userUid)).then(() => {
        setMessage("");
      });
    }
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
        <section className="MessagePage_container">
          {!userstat && <Redirect to="/" />}
          {loaded ? (
            <div className="MessagePage_container">
              <div className="MessagePage_listOfUsers">
                <div className="MessagePage_listOfFriends">
                  <h2>Friends</h2>
                  {friends.length > 0
                    ? friends.map((user) => {
                        return (
                          <div
                            onClick={() => {
                              initChat(user);
                              console.log(user);
                            }}
                            key={user.UID}
                            className="MessagePage_displayName"
                          >
                            <div className="MessagePage_displayPic">
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
                                    ? "MessagePage_onlineStatus"
                                    : null
                                }
                              ></span>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
                <div className="MessagePage_listOfRequests">
                  <h2>Requests</h2>
                  {/*console.log(requests)*/}
                  {requests.length > 0
                    ? requests.map((user) => {
                        return (
                          <div
                            onClick={() => {
                              initChat(user);
                              console.log(user);
                            }}
                            key={user.UID}
                            className="MessagePage_displayName"
                          >
                            <div className="MessagePage_displayPic">
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
                                    ? "MessagePage_onlineStatus"
                                    : null
                                }
                              ></span>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
              <div className="MessagePage_chatArea">
                <div className="MessagePage_chatHeader">
                  {chatStarted ? chatUser : ""}
                </div>

                <div className="MessagePage_messageSections">
                  {chatStarted ? (
                    getMessage.map((conv) => {
                      //console.log(conv);
                      return (
                        <div
                          style={{
                            textAlign:
                              conv.user_uid_1 == userstat.uid
                                ? "right"
                                : "left",
                          }}
                        >
                          <p
                            className="MessagePage_messageStyle"
                            style={
                              conv.user_uid_1 == userstat.uid
                                ? { background: "rgb(37, 168, 255)" }
                                : { background: "rgb(82, 92, 99)" }
                            }
                          >
                            {conv.message}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="MessagePage_selectUser">
                      Please select a user to send a message too
                    </p>
                  )}
                </div>
                {chatStarted ? (
                  <div className="MessagePage_chatControls">
                    <textarea
                      style={{borderRadius:"25px", textIndent:"1em"}}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                    <img 
                    onClick={submitMessage}
                    style={{cursor:"pointer"}}
                    src="./images/send.png" alt="" />
                    
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </section>
      )}
    </>
  );
}

export default MessagePage;
