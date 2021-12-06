import React from "react";
import HomePage from "../pages/HomePage"
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import TopBar from "../components/TopBar";
import {HashRouter as Router, Route, Navigate, Routes} from 'react-router-dom';
import SignUpPage from "../pages/SignUpPage";
import { Authentication } from "../shared/AuthenticationContext";

const App = () => {
  
  // const authValues = React.useContext(Authentication);
  // const { isLoggedIn } = authValues;
  const isLoggedIn = false;

  return (
    <div>
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          { !isLoggedIn && <Route path="/login" element={<LoginPage />} />} 
          <Route path="/signup" element={<SignUpPage />} /> 
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </Router>
    </div>   
  )
  
}

export default App;
