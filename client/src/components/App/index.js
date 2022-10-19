import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Paper from "@mui/material/Paper";

// Styles
import "../../styles/app.scss";

// Components
import About from "../About";
// import { Counter } from "../Test/counter";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import AuthWizard from "../AuthWizard";
import { LOGIN_CONFIG } from "../AuthWizard/config";
import { ROUTES } from "./routeConfig";
import Home from "../Home";
import Dashboard from "../Dashboard";

const App = () => {
  return (
    <div className="app">
      {/* <Paper className="app__title">NetWorthy-App</Paper> */}
      {/* <Counter /> */}
      <Header />
      <div className="app__content">
        <Router>
          <Routes>
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route
              path={ROUTES.LOGIN}
              element={
                <Home authWizard={<AuthWizard state={LOGIN_CONFIG.LOGIN} />} />
              }
            />
            <Route
              path={ROUTES.SIGNUP}
              element={
                <Home authWizard={<AuthWizard state={LOGIN_CONFIG.SIGNUP} />} />
              }
            />
            <Route
              path={ROUTES.COACH_LOGIN}
              element={
                <Home
                  authWizard={<AuthWizard state={LOGIN_CONFIG.COACH_LOGIN} />}
                />
              }
            />
            <Route
              path={ROUTES.COACH_SIGNUP}
              element={
                <Home
                  authWizard={<AuthWizard state={LOGIN_CONFIG.COACH_SIGNUP} />}
                />
              }
            />
            <Route
              path={ROUTES.ADMIN}
              element={
                <Home authWizard={<AuthWizard state={LOGIN_CONFIG.ADMIN} />} />
              }
            />
            <Route
              path={ROUTES.CLIENT_DASHBOARD}
              element={<Dashboard role={null} />}
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default App;
