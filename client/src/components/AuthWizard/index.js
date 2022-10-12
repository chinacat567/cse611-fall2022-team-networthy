import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../App/routeConfig";
import { LOGIN_CONFIG } from "./config";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string()
    .required("Please provide a password")
    .min(8, "Password should have minimum 8 characters"),
});

const SignupSchema = Yup.object().shape({
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

const VAILDATION_SCHEMA = {
  [LOGIN_CONFIG.LOGIN || LOGIN_CONFIG.COACH_LOGIN || LOGIN_CONFIG.ADMIN]:
    LoginSchema,
  [LOGIN_CONFIG.SIGNUP || LOGIN_CONFIG.COACH_SIGNUP]: SignupSchema,
};

const getInitialValues = (state) => {
  switch (state) {
    case LOGIN_CONFIG.LOGIN || LOGIN_CONFIG.COACH_LOGIN || LOGIN_CONFIG.ADMIN:
      return {
        email: "",
        password: "",
      };
    case LOGIN_CONFIG.SIGNUP || LOGIN_CONFIG.COACH_SIGNUP:
      return {
        email: "",
        password: "",
        confirmPassword: "",
      };
    default:
      return {};
  }
};

const AuthWizard = ({ state }) => {
  const isLogin = state == LOGIN_CONFIG.LOGIN,
    isSignup = state == LOGIN_CONFIG.SIGNUP,
    isCoachLogin = state == LOGIN_CONFIG.COACH_LOGIN,
    isCoachSignup = state == LOGIN_CONFIG.COACH_SIGNUP,
    isAdminLogin = state == LOGIN_CONFIG.ADMIN;

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Formik
        initialValues={getInitialValues(state)}
        validationSchema={VAILDATION_SCHEMA[state]}
        onSubmit={(values) => {
          submitForm(values);
        }}
      >
        {({ touched, values, errors, handleChange }) => (
          <Form>
            {(isLogin || isCoachLogin || isAdminLogin) && (
              <>
                {isCoachLogin && <p>Coach Login</p>}
                {isAdminLogin && <p>Admin Login</p>}
                <TextField
                  name="email"
                  placeholder="Email*"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  name="password"
                  placeholder="Password*"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button type="submit">Login</Button>
                {isLogin && (
                  <>
                    <Link to={ROUTES.SIGNUP}>Not a registered user?</Link>
                    <Link to={ROUTES.COACH_LOGIN}>Are you a coach?</Link>
                  </>
                )}
                {isCoachLogin && (
                  <>
                    <Link to={ROUTES.COACH_SIGNUP}>
                      Not a registered coach?
                    </Link>
                    <Link to={ROUTES.LOGIN}>Are you a client?</Link>
                  </>
                )}
                {isAdminLogin && (
                  <>
                    <Link to={ROUTES.LOGIN}>Are you a client?</Link>
                    <Link to={ROUTES.COACH_LOGIN}>Are you a coach?</Link>
                  </>
                )}
              </>
            )}

            {(isSignup || isCoachSignup) && (
              <>
                {isCoachSignup && <p>Coach Signup</p>}
                <TextField
                  name="email"
                  placeholder="Email*"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  name="password"
                  placeholder="Password*"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  name="confirmPassword"
                  placeholder="Confirm Password*"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <Button type="submit">Signup</Button>
                {isSignup && (
                  <>
                    <Link to={ROUTES.LOGIN}>Already registered?</Link>
                    <Link to={ROUTES.COACH_SIGNUP}>Are you a coach?</Link>
                  </>
                )}
                {isCoachSignup && (
                  <>
                    <Link to={ROUTES.COACH_LOGIN}>Already registered?</Link>
                    <Link to={ROUTES.SIGNUP}>Are you a client?</Link>
                  </>
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
