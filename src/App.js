import "./App.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import Layout from "./Layout/Layout";
import AddCourse from "./Pages/AddCourse/AddCourse";
import { useSelector, useDispatch } from "react-redux";
import {useState, useEffect} from 'react';


import Login from "./Pages/Login/Login";
import HomePage from "./Pages/Home/Home";
import CoursePage from "./Pages/Course/Courses";
import SettingPage from "./Pages/Settings/Setting";
import PortfolioPage from "./Pages/Portfolio/Portfolio";
import DeadlinePage from "./Pages/Deadlines/DeadlinePage";
import FriendPage from "./Pages/Friends/FriendsPage";
import MessagePage from "./Pages/Messages/MessagePage";
import StudyHistoryPage from "./Pages/StudyHistory/StudyHistoryPage";
import { getUserAuth } from "./Redux/Actions/UserState";
import { getCoursesAPI,UpdateCourseInfo } from "./Redux/Actions/Course";
import CreateAccount from "./Pages/Login/CreateAccount";

function App() {
  const [loaded, setLoaded] = useState("false");
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const isloaded = useSelector((state) => {
    return state.userState.user_loaded;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.courses;
  });
  const courseIsLoaded = useSelector((state) => {
    return state.courseState.course_loaded;
  });
  const courseData = useSelector((state) => {
    return state.courseState.courseData;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAuth());
    if (userstat) {
      //console.log("here")
      dispatch(getCoursesAPI(userstat));

    }
  },[userstat]);

  useEffect(()=>{
    
    
    if (courseStat){
      dispatch(UpdateCourseInfo(courseStat));
    }
  },[courseStat])

  useEffect(()=>{
    
    
    if (courseData){
      //console.log("upadated")
      setLoaded("true");
    }
  },[courseData])

  
  return (
    
    <Layout>
      
      <Switch>
        <Route path="/" exact={true}>
          <Login />
        </Route>
        <Route path="/Create_Account">
          <CreateAccount />
        </Route>
        <Route path="/Home">
          <HomePage />
        </Route>
        <Route path="/Courses">
          <CoursePage />
        </Route>
        <Route path="/Add_Course">
          <AddCourse />
        </Route>
        <Route path="/Settings">
          <SettingPage />
        </Route>
        <Route path="/Portfolio">
          <PortfolioPage />
        </Route>
        <Route path="/Deadlines">
          <DeadlinePage />
        </Route>
        <Route path="/Deadlines_specific">
          {/* Use Redux store to pass which course the user is viewing and then create this link*/}
          Deadlines_specific
        </Route>
        <Route path="/Friends">
          <FriendPage />
        </Route>
        <Route path="/Messages">
          <MessagePage />
        </Route>
        <Route path="/Study_History">
          <StudyHistoryPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
