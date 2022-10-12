import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Paper from "@mui/material/Paper";

// Styles
import "../../styles/app.scss";

// Components
import About from "../About";
// import { Counter } from "../Test/counter";
import Header from "../Header/header";
import AuthWizard from "../AuthWizard";
import { LOGIN_CONFIG } from "../AuthWizard/config";

const App = () => {
  return (
    <div className="app">
      {/* <Paper className="app__title">NetWorthy-App</Paper> */}
      {/* <Counter /> */}
      <Header />
      <br />
      <Router>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={<AuthWizard state={LOGIN_CONFIG.LOGIN} />}
          />
          <Route
            path="/signup"
            element={<AuthWizard state={LOGIN_CONFIG.SIGNUP} />}
          />
          <Route
            path="/coach/login"
            element={<AuthWizard state={LOGIN_CONFIG.COACH_LOGIN} />}
          />
          <Route
            path="/coach/signup"
            element={<AuthWizard state={LOGIN_CONFIG.COACH_SIGNUP} />}
          />
          <Route
            path="/admin"
            element={<AuthWizard state={LOGIN_CONFIG.ADMIN} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
