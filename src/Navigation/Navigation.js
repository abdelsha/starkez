import React from "react";
import NavigationBar from "./NavigationBar";
import classes from "./Navigation.module.css"


function Navigation (props) {
    return (
        <div className={classes.MenuBar}>
            <NavigationBar/>
            {/* This is where you decide whether to choose the navigationo bar or tab is chosen */}
        </div>
    )
}

export default Navigation;