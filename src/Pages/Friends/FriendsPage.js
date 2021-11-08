import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./FriendsPage.module.css";
import { useState, useEffect } from "react";
import {
  getOnlineUsers,
  getRealTimeConversations,
  updateMessate,
} from "../../Redux/Actions/UserState";
import { auth } from "../../Firebase/Firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import { Redirect } from "react-router";
import MessagePage from "../Messages/MessagePage";

function FriendPage() {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const getMessage = useSelector((state) => {
    return state.userState.conversations;
  });
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
    console.log(getMessage);
  }, [userstat, getMessage]);

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(user.fullName);
    setUserUid(user.UID);
    console.log(user.UID);
    dispatch(
      getRealTimeConversations({ uid_1: userstat.uid, uid_2: user.UID })
    );
    console.log(user);
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
    //console.log(messObj)

  };
  const redirectPage=(user)=>{
    //console.log(user)
    
      <Redirect to="/Messages" user={user} />
    
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
          <div className={classes.chatArea}>
            <h2>Friends</h2>
            {onlineUser.length > 0
              ? onlineUser.map((user) => {
                  return (
                    <Button
                    sx={{marginBottom:"15px", marginTop:"15px" }}
                    href ='/Messages'
                    onClick={(e)=>{
                      console.log("heree")
                    }}
                    >
                    <Card sx={{ minWidth: 345, display:"flex", "justifyContent":"center",
                    }}
                    
                    >
                      <CardActionArea
                      sx={{display:"flex",flexDirection:"column",
                      justifyContent:"center", alignItems:"center",
                      
                    }}

                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={user.sharedImg ? 
                            `${user.sharedImg}`:"/images/user1.svg" 
                          }
                          alt={user.fullName}
                          sx={{ "border-radius":"50%", maxHeight:"65px", 
                          maxWidth:"65px", 
                          display:"flex",
                          justifyContent:"center", alignItems:"center"}}
                        />
                        <CardContent sx={{display:"flex", flexDirection:"column"}}>
                          <Typography gutterBottom variant="h5" component="div"
                          sx={{display:"flex"}}
                          >
                            <span>{user.fullName}</span>
                            <span className={
                            user.isOnline
                              ? `${classes.onlineStatus}`
                              : `${classes.onlineStatusoff}`
                          }></span>
                          </Typography>
                          <Typography variant="body2" color="text.secondary"
                          sx={{display:"flex", justifyContent:"center"}}
                          >
                            bio
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    </Button>
                  );
                })
              : null}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
}

export default FriendPage;
