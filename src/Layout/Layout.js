import React from "react";
import Navigation from "../Navigation/Navigation";
import classes from './Layout.module.css';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setExamNumber} from "../Redux/Actions/Course";
import { switchMenu } from "../Redux/Actions/Menu";
import NavigationBar from "../Navigation/NavigationBar";
import NavigationTab from "../Navigation/NavigationTab";


function Layout(props) {
    
    const menuBarStatus = useSelector((state)=>{
        return state.menuState.menuBar;
    })
    const menuTabStatus = useSelector((state)=>{
        return state.menuState.menuTab;
    })
      const dispatch = useDispatch();
    
      const setMenuBarDispatch = (trigger) => {
          dispatch(switchMenu(trigger));
      };
    

      

      const triggerMenu = () =>{
        console.log(menuBarStatus)
      }
    return(
        
        <div className={classes.Layout}>
            <div className={classes.NavButton} >
               
                <img src="./images/menu.png" all="" onClick={(e)=>{setMenuBarDispatch(menuBarStatus)}}/>
                
            </div>
            {console.log(menuBarStatus)}
            {menuBarStatus=="true"? (
            <NavigationBar>
                {props.children}
            </NavigationBar>)
            :(
            <NavigationTab>
                {props.children}
            </NavigationTab>)}
            
            
            
        </div>
    )
}

export default Layout;