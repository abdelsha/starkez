import React from "react";
import { Link } from "react-router-dom";
import classes from './Login.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react'


function Login (props){
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");  
  return (
      <div className={classes.CommonCard}>
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
              <Button variant="contained">
                <h7>Submit</h7>
              </Button>
            </div>
            <Button variant="outlined" className={classes.LoginButton}>
              <img src="/images/Google.png" all="" />
              <p>Sign In With Google</p>
            </Button>
          </div>
        </Box>
      </div>
    );
}

export default Login;