import React from "react";
import Navigation from "../Navigation/Navigation";


function Layout(props) {
    return(
        
        <div>
            <Navigation/>
            {props.children}
        </div>
    )
}

export default Layout;