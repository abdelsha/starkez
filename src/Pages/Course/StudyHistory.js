import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import classes from "./Course.module.css";


function StudyHistory (){
    return (
        <div className={classes.itemc}>
        <div className={classes.Commoncard}>
            Study History
        </div>
      </div>
    )
}

export default StudyHistory;
