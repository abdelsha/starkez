import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import classes from "./StudyHistory.module.css";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from 'react';


function StudyHistory (){
    const userstat = useSelector((state) => {
        return state.userState.user;
      });

      useEffect(() => {
          
      }, [userstat])
    return (
        <div className={classes.itemc}>
            {!userstat && <Redirect to="/" />}
        <div className={classes.Commoncard}>
            Study History
        </div>
      </div>
    )
}

export default StudyHistory;
