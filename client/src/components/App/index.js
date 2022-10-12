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
import { ROUTES } from "./routeConfig";

const App = () => {
  return (
    <div className="app">
      {/* <Paper className="app__title">NetWorthy-App</Paper> */}
      {/* <Counter /> */}
      <Header />
      <br />
      <Router>
        <Routes>
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route
            path={ROUTES.LOGIN}
            element={<AuthWizard state={LOGIN_CONFIG.LOGIN} />}
          />
          <Route
            path={ROUTES.SIGNUP}
            element={<AuthWizard state={LOGIN_CONFIG.SIGNUP} />}
          />
          <Route
            path={ROUTES.COACH_LOGIN}
            element={<AuthWizard state={LOGIN_CONFIG.COACH_LOGIN} />}
          />
          <Route
            path={ROUTES.COACH_SIGNUP}
            element={<AuthWizard state={LOGIN_CONFIG.COACH_SIGNUP} />}
          />
          <Route
            path={ROUTES.ADMIN}
            element={<AuthWizard state={LOGIN_CONFIG.ADMIN} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
