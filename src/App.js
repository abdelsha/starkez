
import './App.css';
import {Route, Switch} from 'react-router-dom';
import React from 'react';
import Layout from './Layout/Layout';




function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact={true}>
          Login
        </Route>
        <Route path="/Home">HomePage</Route>
        <Route path="/Courses">CoursePage</Route>
        <Route path="Add_Course">Add_Course</Route>
        <Route path="/Settings">Settings</Route>
        <Route path="/Portfolio">Portfolio</Route>
        <Route path="/Deadlines">Deadlines</Route>
        <Route path="/Deadlines_specific">
          {" "}
          {/* Use Redux store to pass which course the user is viewing and then create this link*/}
          Deadlines_specific
        </Route>
        <Route path="/Friends">Friends</Route>
        <Route path="/Messages">Messages</Route>
        <Route path="/Study_History">Study_History</Route>
      </Switch>
    </Layout>
  );
}

export default App;
