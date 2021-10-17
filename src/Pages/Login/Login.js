import React from "react";
import { Redirect } from "react-router-dom";
import classes from './Login.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState, useEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { createAccountWithhUserName, signInWithUsername , signInWithGoogleApi} from "../../Redux/Actions/UserState";


function Login (props){
  const userstat = useSelector((state)=>{
    return state.userState.user;
  })
  const dispatch = useDispatch();
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");  

  const submitHelper=(e) => {
    dispatch(signInWithUsername(userName,password))
    //console.log(e);
  }
  const createAccountHelper=(e) =>{
    dispatch(createAccountWithhUserName(userName, password))
  }

  const signInWithGoogleHelper=(e) => {
    dispatch(signInWithGoogleApi())
  }
  return (
      <div className={classes.CommonCard}>
        {
            userstat && <Redirect to ='/Home'/>
        }
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className={classes.TextField}>
            <div className={classes.Starkez}>
              <h2 >STARKEZ</h2>
            </div>
            <TextField
              required
              id="outlined-required"
              label="Username"
              placeholder="Enter Username"
              value={userName}
              onChange={(e)=> {setUserName(e.target.value)}}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
            <div className={classes.SubmitButton}>
              <Button variant="contained"
              onClick={(event) => submitHelper(event)}>
                <h7>Login</h7>
              </Button>
              <Button variant="contained"
              onClick={(event) => createAccountHelper(event)}>
                <h7>Create Account</h7>
              </Button>
            </div>
            <Button variant="outlined" 
            className={classes.LoginButton}
            onClick={(event) => {signInWithGoogleHelper(event)}}>
              <img src="/images/Google.png" all="" />
              <p>Sign In With Google</p>
            </Button>
          </div>
        </Box>
      </div>
    );
}

export default Login;