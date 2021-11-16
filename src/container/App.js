import React from "react";
import UserSignUpPage from "../pages/UserSignUpPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage"
import UserPage from "../pages/UserPage";
import TopBar from "../components/TopBar";
import {HashRouter as Router, Route, Navigate, Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<UserSignUpPage />} />
          <Route path="/user/:username" element={<UserPage/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
