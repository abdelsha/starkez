import React from "react";
import './Layout.css';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setExamNumber} from "../Redux/Actions/Course";
import { switchMenu } from "../Redux/Actions/Menu";
import NavigationBar from "../Navigation/NavigationBar";



function Layout(props) {
    
    const menuBarStatus = useSelector((state)=>{
        return state.menuState.menuBar;
    })
    
      const dispatch = useDispatch();
    
      const setMenuBarDispatch = (trigger) => {
          dispatch(switchMenu(trigger));
      };
    

      

      const triggerMenu = () =>{
        //console.log(menuBarStatus)
      }
    return(
        
        <div className="Layout_Layout">
            <div className="Layout_NavButton" >
               
                <img 
                src="./images/menu.png" 
                all="" 
                onClick={(e)=>{setMenuBarDispatch(menuBarStatus)}}
                style={
                    menuBarStatus
                      ? { transform: "rotate(90deg)" }
                      : { transform: "rotate(0deg)" }
                  }/>
                
            </div>
            <NavigationBar currmenue={menuBarStatus} menueoption={setMenuBarDispatch}>
            {props.children}
            </NavigationBar>
            
            
        </div>
    )
}
//something else
export default Layout;