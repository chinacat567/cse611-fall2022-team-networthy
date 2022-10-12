import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
  LOGIN: LoginSchema,
  SIGNUP: SignupSchema,
};

const INITIAL_VALUES = {
  LOGIN: {
    email: "",
    password: "",
  },
  SIGNUP: {
    email: "",
    password: "",
    confirmPassword: "",
  },
};

// state: LOGIN/SIGNUP
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
        initialValues={INITIAL_VALUES[state]}
        validationSchema={VAILDATION_SCHEMA[state]}
        onSubmit={(values) => {
          submitForm(values);
        }}
      >
        {({ touched, isValid }) => (
          <Form>
            {(isLogin || isCoachLogin || isAdminLogin) && (
              <>
                {isCoachLogin && <p>Coach Login</p>}
                {isAdminLogin && <p>Admin Login</p>}
                <Field name="email" placeholder="Email*" />
                <ErrorMessage component="div" name="email" />
                <Field
                  name="password"
                  type="password"
                  placeholder="Password*"
                />
                <ErrorMessage component="div" name="password" />
                <Button
                  type="submit"
                  disabled={!isValid || !touched.email || !touched.password}
                >
                  Login
                </Button>
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
                <Field name="email" placeholder="Email*" />
                <ErrorMessage component="div" name="email" />
                <Field
                  name="password"
                  type="password"
                  placeholder="Password*"
                />
                <ErrorMessage component="div" name="password" />
                <Field
                  name="consifmPassword"
                  type="password"
                  placeholder="Confirm Password*"
                />
                <ErrorMessage component="div" name="confirmPassword" />
                <Button
                  type="submit"
                  disabled={
                    !isValid ||
                    !touched.email ||
                    !touched.password ||
                    !touched.confirmPassword
                  }
                >
                  Signup
                </Button>
                {isSignup && (
                  <Link to={ROUTES.COACH_SIGNUP}>Are you a coach?</Link>
                )}
                {isCoachSignup && (
                  <Link to={ROUTES.SIGNUP}>Are you a client?</Link>
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
