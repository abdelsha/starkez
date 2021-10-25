import { ClassNames } from "@emotion/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {useState} from 'react';
import classes from "./Setting.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import firebase from "firebase";
import { updateUserInfo } from "../../Redux/Actions/UserState";

/*TODO 
CHANGE FIRST AND LAST NAME
CHANGE PASSWORD
CHANGE EMAIL ADDRESS, CONTACT NUMBER 

*/
function SettingPage() {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const [values, setValues]= useState({
      firstName:"",
      lastName:"",
      email:"ss",
      contactNumber:"",
  })
  const setValuesHelper =(prop,event)=> {
    
    setValues({
          ...values,
          [prop]: event,
  })
  //console.log(values)
  }
  const reset=(e) => {
    e.preventDefault();
    setValues({
        firstName:"",
        lastName:"",
        email:"ss",
        contactNumber:"",
    })
  }
  const dispatch = useDispatch();

  const submitEverything=(e) =>{
    let obj={};
    
    for (const prop in values){
        //console.log(`values.${prop} = ${values[prop]}`)
        if (values[prop]!=""){
            //onsole.log(`values.${prop}`)
            obj[`${prop}`]=`${values[prop]}`}
        }
    
    let payload=obj;
    payload["user"]=userstat;
    payload["timestamp"]= firebase.firestore.Timestamp.now()
    console.log(payload)
    dispatch(updateUserInfo(payload));
    //reset(e);
    //console.log(object)
    //console.log(Object.assign({},finArr))
  }
  return (
    <div>
      <header className={classes.Header}>
        <h1>Settings</h1>
        <div className={classes.User}>
            {userstat && userstat.photoURL ? (
              <img src={userstat.photoURL} all="" />
            ) : (
              <img src="/images/user1.svg" all="" />
            )}
          </div>
      </header>
      <main className={classes.Container}>
          
        <div className={classes.colone}>
          <div className={classes.FirstName}>
          <TextField
              
              id="demo-helper-text-aligned-no-helper"
              label="Fist Name"
              sx={{"flex-grow":"1"}}
              value={values.firstName}
              onChange={(e)=>setValuesHelper("firstName",e.target.value)}
            />
          </div>
          <div className={classes.Email}><TextField
              
              id="demo-helper-text-aligned-no-helper"
              label="Email"
              sx={{"flex-grow":"1"}}
              value={values.email}
              onChange={(e)=>setValuesHelper('email',e.target.value)}
            /></div>
            <div className={classes.rowone}><TextField
              helperText="Please enter your name"
              id="demo-helper-text-aligned-no-helper"
              label="Name"
              sx={{"flex-grow":"1"}}
            /></div>
        </div>
        <div className={classes.coltwo}>
          <div className={classes.LastName}><TextField
              
              id="demo-helper-text-aligned-no-helper"
              label="Last Name"
              sx={{"flex-grow":"1"}}
              value={values.lastName}
              onChange={(e)=>setValuesHelper("lastName",e.target.value)}
            /></div>
          <div className={classes.Number}><TextField
              
              id="demo-helper-text-aligned-no-helper"
              label="Contact Number"
              sx={{"flex-grow":"1"}}
              value={values.contactNumber}
              onChange={(e)=>setValuesHelper("contactNumber",e.target.value)}
            /></div>
          <div className={classes.rowone}><TextField
              helperText="Please enter your name"
              id="demo-helper-text-aligned-no-helper"
              label="Name"
              sx={{"flex-grow":"1"}}
            /></div>
        </div>
      </main>
      <div className={classes.Submit}>
      <Button
            variant="contained"
            onClick={(e) => {
              submitEverything(e);
            }}
          >
            submit
          </Button>
      </div>
    </div>
  );
}

export default SettingPage;
