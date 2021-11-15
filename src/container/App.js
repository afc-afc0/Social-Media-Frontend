import React from "react";
import UserSignUpPage from "../pages/UserSignUpPage";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
  <div className="row">
    <div className="col">
      <UserSignUpPage />
    </div>
    <div className="col">
      <LoginPage />
    </div>
  </div>
  );
}

export default App;
