import React from "react";
import HomePage from "../pages/HomePage"
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import TopBar from "../components/TopBar";
import SignUpPage from "../pages/SignUpPage";
import { useSelector } from "react-redux";
import { HashRouter as Router, Route, Navigate, Routes} from 'react-router-dom';

const App = () => {
  
  const state = useSelector((state) => state);
  const { isLoggedIn } = state.user;

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
