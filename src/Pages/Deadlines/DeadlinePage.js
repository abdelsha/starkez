import { ClassNames } from "@emotion/react";
import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import classes from './DeadlinePage.module.css';

function DeadlinePage() {
    const userstat = useSelector((state)=>{
        return state.userState.user;
      });
    const courseStat= useSelector((state) =>{
        return state.courseState.course;
    })

      const dispatch = useDispatch();
    return (
        <div className={classes.Layouts}>
            <div className={classes.Deadlines}>
                <div className={classes.CommonCard}>
                    Deadlines
                </div>
            </div>  
            <div className={classes.Status}>
                <div className={classes.CommonCard}>
                    Status
                </div>
            </div>  
            
        </div>
    )
}

export default DeadlinePage;