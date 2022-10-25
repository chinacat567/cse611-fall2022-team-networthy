import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Styles
import "../../styles/app.scss";

// Components
import About from "../About";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import Home from "../Home";
import Dashboard from "../Dashboard";
import PrivateRoute from "./privateRoute";
import ClientSurvey from "../SurveyForm/clientSurvey";
import AuthWizard from "../AuthWizard";

import { LOGIN_CONFIG, ROLE_CONFIG } from "../AuthWizard/config";
import { ROUTES } from "./routeConfig";
import { useSelector } from "react-redux";

import Loader from "../Loading";

const App = () => {
  const { user, isLoggedIn } = useSelector((state) => state?.auth);
  const { loaderVisible } = useSelector((state) => state?.loader);

  return (
    <div className="app">
      <Router>
        <Header />
        {loaderVisible && <Loader />}
        <div className="app__content">
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
              element={
                <PrivateRoute>
                  <Dashboard role={null} user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.CLIENT_PROFILE_SURVEY}
              element={
                <PrivateRoute>
                  <ClientSurvey user={user} />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
