import React from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAccountWithhUserName,
  signInWithUsername,
  signInWithGoogleApi,
} from "../../Redux/Actions/UserState";
import FormControl from "@mui/material/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { setProjectData } from "../../Redux/Actions/Course";

function CreateAccount(props) {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName]= useState("");
  const [lastName,setLastName]= useState("");
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });

  const submitHelper = (e) => {
    dispatch(signInWithUsername(userName, password));
    //console.log(e);
  };
  const setPasswordHelper = (e) => {
    setPassword({
      ...password,
      password: e,
    });
  };
  const handleClickShowPassword = (e) => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };
  const createAccountHelper = (e) => {
      let payload={
          firstName:firstName,
          lastName:lastName,
          displayName:`${firstName} ${lastName}`,
      };
    dispatch(createAccountWithhUserName(userName, password.password,payload));
  };

  const signInWithGoogleHelper = (e) => {
    dispatch(signInWithGoogleApi());
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="Login_CommonCard">
      {userstat && <Redirect to="/Home" />}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="Login_TextField">
          <div className="Login_Starkez">
            <h2>STARKEZ</h2>
          </div>
          <TextField
            required
            id="outlined-required"
            label="Email"
            placeholder="Enter Email"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={password.showPassword ? "text" : "password"}
              value={password.password}
              onChange={(e) => setPasswordHelper(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {password.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <TextField
              required
              id="outlined-required"
              label="First Name"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Last Name"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          <div className="Login_SubmitButton">
            <Button
              variant="contained"
              onClick={(event) => submitHelper(event)}
            >
              <h7>Login</h7>
            </Button>
            <Button
              variant="contained"
              onClick={(event) => createAccountHelper(event)}
            >
              <h7>Create Account</h7>
            </Button>
          </div>
          <Button
            variant="outlined"
            className="Login_LoginButton"
            onClick={(event) => {
              signInWithGoogleHelper(event);
            }}
          >
            <img src="/images/Google.png" all="" />
            <p>Sign In With Google</p>
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default CreateAccount;
