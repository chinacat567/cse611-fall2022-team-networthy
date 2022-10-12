import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "@mui/material/Button";

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

const LOGIN = "LOGIN",
  SIGNUP = "SIGNUP";

// state: LOGIN/SIGNUP
const AuthWizard = ({ state }) => {
  const isLogin = state == LOGIN,
    isSignup = state == SIGNUP;
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
            <Field name="email" placeholder="Email*" />
            <ErrorMessage component="div" name="email" />
            <Field name="password" type="password" placeholder="Password*" />
            <ErrorMessage component="div" name="password" />
            {isSignup && (
              <>
                <Field
                  name="consifmPassword"
                  type="password"
                  placeholder="Confirm Password*"
                />
                <ErrorMessage component="div" name="confirmPassword" />
              </>
            )}
            <Button
              type="submit"
              disabled={!isValid || !touched.email || !touched.password}
            >
              {isLogin ? "Login" : isSignup ? "Signup" : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthWizard;
