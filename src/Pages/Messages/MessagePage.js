import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import classes from './MessagePage.module.css';

function MessagePage() {
    const userstat = useSelector((state)=>{
        return state.userState.user;
      });
    const courseStat= useSelector((state) =>{
        return state.courseState.course;
    })

      const dispatch = useDispatch();
    return (
        <div className={classes.Layouts}>
          <div className={classes.Friends}>
            This is shows the current friend list, ordered from online to offline
          </div>
    
          <div className={classes.Messages}>
            <div className={classes.CommonCard}>
              This will show the messages
            </div>
          </div>
          
        </div>
      );
}

export default MessagePage;