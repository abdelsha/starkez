import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import classes from "./Course.module.css";


function Status (){
    return (
        <div className={classes.itemb}>
                <div className={classes.Commoncard}>
                    Status
                </div>
              </div>
    )
}

export default Status;
