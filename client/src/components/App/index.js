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
import CoachSurvey from "../SurveyForm/coachSurvey";
import CoachDashboard from "../Dashboard/coachDashboard";
import AddGoal from "../Dashboard/addGoal";
import AdminDashboard from "../Dashboard/adminDashboard";

const App = () => {
  const { user, isLoggedIn } = useSelector((state) => state?.auth);
  const { loaderVisible } = useSelector((state) => state?.loader);

  const isAdmin = (!!user && user?.roles[0] === ROLE_CONFIG.ADMIN) || false;

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
              path={ROUTES.ADMIN}
              element={
                <Home authWizard={<AuthWizard state={LOGIN_CONFIG.ADMIN} />} />
              }
            />
            <Route
              path={ROUTES.CLIENT_DASHBOARD}
              element={
                <PrivateRoute>
                  <Dashboard user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.COACH_DASHBOARD}
              element={
                <PrivateRoute>
                  <CoachDashboard user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.CLIENT_PROFILE_SURVEY}
              element={
                <PrivateRoute>
                  <ClientSurvey
                    clientProfile={
                      isAdmin
                        ? JSON.parse(
                            localStorage.getItem("ADMIN_CLIENT_PROFILE_EDIT")
                          )
                        : user?.clientProfile
                    }
                    isAdmin={isAdmin}
                    newClientEmailId={user?.email}
                    newClientUsername={user?.username}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.COACH_PROFILE_SURVEY}
              element={
                <PrivateRoute>
                  <CoachSurvey user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.ADD_GOAL}
              element={
                <PrivateRoute>
                  <AddGoal user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_DASHBOARD}
              element={
                <PrivateRoute>
                  <AdminDashboard />
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
