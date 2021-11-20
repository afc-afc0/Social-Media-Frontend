import React from "react";
import UserSignUpPage from "../pages/UserSignUpPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage"
import UserPage from "../pages/UserPage";
import LoginPageFunctional from "../pages/LoginPageFunctional";
import TopBar from "../components/TopBar";
import {HashRouter as Router, Route, Navigate, Routes} from 'react-router-dom';
import SignUpPage from "../pages/SignUpPage";

class App extends React.Component {

  state = {
    isLoggedIn: false,
    username: 'Fatih'
  };

  onLoginSuccess = (username) => {
    this.setState({
      username,
      isLoggedIn: true
    })
  }

  render() {

    const {isLoggedIn, username} = this.state;

    return (
    <div>
      <Router>
        <TopBar username={username} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="loginfunctional" element={<LoginPageFunctional />} />
          <Route path="signupfunctional" element={<SignUpPage />} />
          <Route path="/signup" element={<UserSignUpPage />} />
          <Route path="/user/:username" element={<UserPage/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
    )
  }
}

export default App;
