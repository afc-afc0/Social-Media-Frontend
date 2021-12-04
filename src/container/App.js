import React from "react";
import HomePage from "../pages/HomePage"
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import TopBar from "../components/TopBar";
import {HashRouter as Router, Route, Navigate, Routes} from 'react-router-dom';
import SignUpPage from "../pages/SignUpPage";
import { useState } from "react";

const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState("Ahmet");

  const onLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  }

  return (
    <div>
      <Router>
        <TopBar username={username} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} /> 
          <Route path="/user/:username" element={<UserPage/>} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </Router>
    </div>   
  )
  
}

export default App;
