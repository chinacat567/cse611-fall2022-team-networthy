import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../App/routeConfig";
import { LOGIN_CONFIG, ROLE_CONFIG } from "./config";

import { signup, signin } from "../../redux/slices/authSlice";

import "../../styles/authWizard.scss";
import { showLoader } from "../../redux/slices/loaderSlice";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string()
    .required("Please provide a password")
    .min(8, "Password should have minimum 8 characters"),
});

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string()
    .required("Please provide a password")
    .min(8, "Password should have minimum 8 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords do not match"
  ),
});

const getValidationSchema = (state) => {
  if (state.includes("LOGIN") || state.includes("ADMIN")) return LoginSchema;
  else return SignupSchema;
};

const getInitialValues = (state) => {
  switch (state) {
    case LOGIN_CONFIG.LOGIN:
    case LOGIN_CONFIG.ADMIN:
      return {
        username: "",
        password: "",
      };
    case LOGIN_CONFIG.SIGNUP:
      return {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    default:
      return {};
  }
};

const TABS = {
  CLIENT: "Client",
  COACH: "Coach",
};

const getSignupUserRole = (tab) => {
  switch (tab) {
    case TABS.CLIENT:
      return ROLE_CONFIG.CLIENT;
    case TABS.COACH:
      return ROLE_CONFIG.COACH;
    default:
      return ROLE_CONFIG.CLIENT;
  }
};

const AuthWizard = ({ state }) => {
  const { user, isLoggedIn } = useSelector((state) => state?.auth);
  const [tab, setTab] = useState(TABS.CLIENT);
  const dispatch = useDispatch();

  const isLogin = state == LOGIN_CONFIG.LOGIN,
    isSignup = state == LOGIN_CONFIG.SIGNUP,
    isAdminLogin = state == LOGIN_CONFIG.ADMIN;

  useEffect(() => {
    if (isLoggedIn) {
      const userRole = localStorage.getItem("USER_ROLE");
      if (userRole === ROLE_CONFIG.CLIENT)
        window.location.href = "/" + ROUTES.CLIENT_DASHBOARD;
      else if (userRole === ROLE_CONFIG.COACH)
        window.location.href = "/" + ROUTES.COACH_DASHBOARD;
    }
  }, []);

  const submitForm = async (data) => {
    dispatch(showLoader(true));
    if (isSignup) {
      // Signup
      await dispatch(
        signup({
          ...data,
          roles: [getSignupUserRole(tab)],
        })
      );
    }
    if (isLogin || isAdminLogin) {
      // Login
      await dispatch(signin(data));
    }
    dispatch(showLoader(false));
  };

  return (
    <div className="authWizard">
      {isSignup && (
        <div className="formTabs">
          {Object.values(TABS)?.map((thisTab) => (
            <div
              className={`formTabs__tab ${
                tab == thisTab && "formTabs__tab--selected"
              }`}
              key={thisTab}
              onClick={() => setTab(thisTab)}
            >
              {thisTab}
            </div>
          ))}
        </div>
      )}

      <Formik
        initialValues={getInitialValues(state)}
        validationSchema={getValidationSchema(state)}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm({
            ...getInitialValues(state),
          });
        }}
      >
        {({ values, errors, setFieldValue, handleChange, resetForm }) => (
          <Form className="authWizard__form">
            {(isLogin || isAdminLogin) && (
              <>
                {isAdminLogin && (
                  <p className="authWizard__title">Admin Login</p>
                )}
                <TextField
                  name="username"
                  placeholder="Username"
                  className="authWizard__formField"
                  value={values.username}
                  onChange={handleChange}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />

                <TextField
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="authWizard__formField"
                  value={values.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
                <Button
                  type="submit"
                  className="authWizard_button"
                  variant="contained"
                  disabled={
                    Boolean(errors.password) || Boolean(errors.username)
                  }
                >
                  Login
                </Button>
                {isLogin && (
                  <div className="authWizard__redirection">
                    <Link
                      to={ROUTES.SIGNUP}
                      onClick={() => {
                        resetForm(...getInitialValues(state));
                      }}
                    >
                      Not registered?
                    </Link>
                  </div>
                )}
                {isAdminLogin && (
                  <div className="authWizard__redirection">
                    <Link
                      to={ROUTES.LOGIN}
                      onClick={() => {
                        resetForm(...getInitialValues(state));
                      }}
                    >
                      Are you a client / coach?
                    </Link>
                  </div>
                )}
              </>
            )}

            {isSignup && (
              <>
                <TextField
                  name="username"
                  placeholder="Username"
                  className="authWizard__formField"
                  value={values.username}
                  onChange={handleChange}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />
                <TextField
                  name="email"
                  placeholder="Email"
                  className="authWizard__formField"
                  value={values.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <TextField
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="authWizard__formField"
                  value={values.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
                <TextField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  className="authWizard__formField"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword}
                />
                <Button
                  type="submit"
                  className="authWizard_button"
                  variant="contained"
                  disabled={
                    Boolean(errors.password) ||
                    Boolean(errors.confirmPassword) ||
                    (values.password &&
                      values.password != values.confirmPassword) ||
                    Boolean(errors.email)
                  }
                >
                  Signup
                </Button>
                {isSignup && (
                  <div className="authWizard__redirection">
                    <Link
                      to={ROUTES.LOGIN}
                      onClick={() => {
                        resetForm({
                          ...getInitialValues(state),
                        });
                        document.body.scrollTop =
                          document.documentElement.scrollTop = 0;
                      }}
                    >
                      Already registered?
                    </Link>
                  </div>
                )}
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthWizard;
