import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import DashBoard from "./components/DashBoard";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Router>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/" component={DashBoard} />
      </Router>
    </div>
  );
};

export default App;
