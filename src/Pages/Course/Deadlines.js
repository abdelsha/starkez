import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Link } from "@mui/material";
import classes from "./Course.module.css";


function Deadlines (){
    return (
        <div className={classes.itema}>
                <div className={classes.Commoncard}>
                    Deadlines
                </div>
              </div>
    )
}

export default Deadlines;
