import React from "react";
import HomePage from "../pages/HomePage"
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import TopBar from "../components/TopBar";
import {HashRouter as Router, Route, Navigate, Routes} from 'react-router-dom';
import SignUpPage from "../pages/SignUpPage";
import { useState } from "react";

const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Ahmet");

  const onLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  }

  const onLogoutSuccess = () => {
    setIsLoggedIn(false);
    setUsername(undefined);

    return (
      <Navigate to="/" />
    )
  }

  return (
    <div>
      <Router>
        <TopBar username={username} isLoggedIn={isLoggedIn} onLogoutSuccess={onLogoutSuccess} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          { !isLoggedIn && <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess}/>} />}
          <Route path="/signup" element={<SignUpPage />} /> 
          <Route path="/user/:username" element={<UserPage/>} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </Router>
    </div>   
  )
  
}

export default App;
