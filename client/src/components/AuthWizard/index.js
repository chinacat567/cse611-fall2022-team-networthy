import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../App/routeConfig";
import { LOGIN_CONFIG, ROLE_CONFIG } from "./config";

import { signup, signin } from "../../redux/slices/authSlice";

import "../../styles/authWizard.scss";

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
    case LOGIN_CONFIG.COACH_LOGIN:
    case LOGIN_CONFIG.ADMIN:
      return {
        username: "",
        password: "",
      };
    case LOGIN_CONFIG.SIGNUP:
    case LOGIN_CONFIG.COACH_SIGNUP:
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

const getUserRole = (state) => {
  switch (state) {
    case LOGIN_CONFIG.LOGIN:
    case LOGIN_CONFIG.SIGNUP:
      return ROLE_CONFIG.CLIENT;
    case LOGIN_CONFIG.COACH_LOGIN:
    case LOGIN_CONFIG.COACH_SIGNUP:
      return ROLE_CONFIG.COACH;
    default:
      return ROLE_CONFIG.CLIENT;
  }
};

const AuthWizard = ({ state }) => {
  const dispatch = useDispatch();

  const isLogin = state == LOGIN_CONFIG.LOGIN,
    isSignup = state == LOGIN_CONFIG.SIGNUP,
    isCoachLogin = state == LOGIN_CONFIG.COACH_LOGIN,
    isCoachSignup = state == LOGIN_CONFIG.COACH_SIGNUP,
    isAdminLogin = state == LOGIN_CONFIG.ADMIN;

  const submitForm = (data) => {
    if (isSignup || isCoachSignup) {
      // Signup
      dispatch(
        signup({
          ...data,
          roles: [getUserRole(state)],
        })
      );
    }
    if (isLogin || isCoachLogin) {
      // Login
      dispatch(
        signin({
          ...data,
          roles: [getUserRole(state)],
        })
      );
    }
  };

  return (
    <div className="authWizard">
      <Formik
        initialValues={getInitialValues(state)}
        validationSchema={getValidationSchema(state)}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm();
        }}
      >
        {({ values, errors, setFieldValue, handleChange, resetForm }) => (
          <Form className="authWizard__form">
            {(isLogin || isCoachLogin || isAdminLogin) && (
              <>
                {isLogin && <p className="authWizard__title">Client Login</p>}
                {isCoachLogin && (
                  <p className="authWizard__title">Coach Login</p>
                )}
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
                  disabled={Boolean(errors.password) || Boolean(errors.email)}
                >
                  Login
                </Button>
                {isLogin && (
                  <div className="authWizard__redirection">
                    <Link to={ROUTES.SIGNUP} onClick={resetForm}>
                      Not a registered user?
                    </Link>
                    <Link to={ROUTES.COACH_LOGIN} onClick={resetForm}>
                      Are you a coach?
                    </Link>
                  </div>
                )}
                {isCoachLogin && (
                  <div className="authWizard__redirection">
                    <Link to={ROUTES.COACH_SIGNUP} onClick={resetForm}>
                      Not a registered coach?
                    </Link>
                    <Link to={ROUTES.LOGIN} onClick={resetForm}>
                      Are you a client?
                    </Link>
                  </div>
                )}
                {isAdminLogin && (
                  <div className="authWizard__redirection">
                    <Link to={ROUTES.LOGIN} onClick={resetForm}>
                      Are you a client?
                    </Link>
                    <Link to={ROUTES.COACH_LOGIN} onClick={resetForm}>
                      Are you a coach?
                    </Link>
                  </div>
                )}
              </>
            )}

            {(isSignup || isCoachSignup) && (
              <>
                {isSignup && <p className="authWizard__title">Client Signup</p>}
                {isCoachSignup && (
                  <p className="authWizard__title">Coach Signup</p>
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
                    values.password != values.confirmPassword ||
                    Boolean(errors.email)
                  }
                >
                  Signup
                </Button>
                {isSignup && (
                  <div className="authWizard__redirection">
                    <Link to={ROUTES.LOGIN} onClick={resetForm}>
                      Already registered?
                    </Link>
                    <Link to={ROUTES.COACH_SIGNUP} onClick={resetForm}>
                      Are you a coach?
                    </Link>
                  </div>
                )}
                {isCoachSignup && (
                  <div className="authWizard__redirection">
                    <Link to={ROUTES.COACH_LOGIN} onClick={resetForm}>
                      Already registered?
                    </Link>
                    <Link to={ROUTES.SIGNUP} onClick={resetForm}>
                      Are you a client?
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
