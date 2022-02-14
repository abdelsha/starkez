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
import {Redirect} from "react-router-dom";

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
      email:"",
      contactNumber:"",
      image:""
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
        email:"",
        contactNumber:"",
        image:""
    })
  }
  const dispatch = useDispatch();

  const submitEverything=(e) =>{
    let obj={};
    let objPayload={};
    
    for (const prop in values){
        //console.log(`values.${prop} = ${values[prop]}`)
        if (values[prop]!=""){
            //onsole.log(`values.${prop}`)
            obj[`${prop}`]=`${values[prop]}`}
        }
    
    let payload=obj;
    if( values.image!=""){
        //console.log(values.image)
        payload["image"]="";
    }
    console.log(values.image)
    objPayload["user"]=userstat;
    objPayload['image']=values.image;
    payload["timestamp"]= firebase.firestore.Timestamp.now()
    console.log(objPayload)
    dispatch(updateUserInfo(payload,objPayload));
    //reset(e);
    //console.log(object)
    //console.log(Object.assign({},finArr))
  }
  return (
    <div className={classes.main}>
      {!userstat && <Redirect to="/" />}
      <header className={classes.Header}>
        <h1>Settings</h1>
        <span>{userstat.displayName? userstat.displayName:null}</span>
        <div className={classes.User}>
          {userstat && userstat.photoURL ? (
            <img src={userstat.photoURL} all="" />
          ) : (
            <img src="/images/user1.svg" all="" />
          )}
          <input
            type="file"
            accept="image/gif, image/jpeg, image/png"
            name="image"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => {
                if (e.target.files[0] === "" || e.target.files[0] === undefined){
                    alert("This is not An Image")
                }else{
                    console.log(e.target.files[0])
                setValuesHelper("image", e.target.files[0])}}}
          ></input>
          <span>
            <Button 

            sx={{"padding":"6px 6px", "margin-top":"10px"}}
            variant="contained">
                <label 
                
                for="file">Select an image to share</label>
            </Button>
            
          </span>
        </div>
      </header>
      <main className={classes.Container}>
        <div className={classes.colone}>
          <div className={classes.FirstName}>
            <TextField
              id="demo-helper-text-aligned-no-helper"
              label="Fist Name"
              sx={{ "flex-grow": "1" }}
              value={values.firstName}
              onChange={(e) => setValuesHelper("firstName", e.target.value)}
            />
          </div>
          <div className={classes.Email}>
            <TextField
              id="demo-helper-text-aligned-no-helper"
              label="Email"
              sx={{ "flex-grow": "1" }}
              value={values.email}
              onChange={(e) => setValuesHelper("email", e.target.value)}
            />
          </div>
          
        </div>
        <div className={classes.coltwo}>
          <div className={classes.LastName}>
            <TextField
              id="demo-helper-text-aligned-no-helper"
              label="Last Name"
              sx={{ "flex-grow": "1" }}
              value={values.lastName}
              onChange={(e) => setValuesHelper("lastName", e.target.value)}
            />
          </div>
          <div className={classes.Number}>
            <TextField
              id="demo-helper-text-aligned-no-helper"
              label="Contact Number"
              sx={{ "flex-grow": "1" }}
              value={values.contactNumber}
              onChange={(e) => setValuesHelper("contactNumber", e.target.value)}
            />
          </div>
          
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
