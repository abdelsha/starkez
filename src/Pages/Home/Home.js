import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Button, Link } from "@mui/material";
import { signOutApi } from "../../Redux/Actions/UserState";
import {Redirect} from "react-router-dom";
function HomePage() {
    var redirectReq=0;
    const userstat = useSelector((state)=>{
        return state.userState.user;
      });
    const courseStat= useSelector((state) =>{
        return state.courseState.course;
    });

      const dispatch = useDispatch();
      const signOut= () => {
          dispatch(signOutApi());
      }
      
    return (
        <div>
            HomePage
            <Button 
            variant="contained" 
            onClick={()=>{signOut()}}>
                SignOut
            </Button>
            
            <Button
            variant="contained"
            >
                
            <Link href = "/"
           underline="none"
           sx={{
               color:"white",
               
           }}
           >
               SignIn</Link >
            </Button>
           
           
        </div>
    )
}

export default HomePage;