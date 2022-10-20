import React from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Slider from "@mui/material/Slider";
import countryList from "react-select-country-list";
import US_STATES from "./usStates.json";

import "../../styles/surveyForm.scss";
import clientService from "../../services/clientService";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../App/routeConfig";
import { addClientProfile } from "../../redux/slices/authSlice";

const GENDER = {
  MALE: "Male",
  FEMALE: "Female",
  TRANSGENDER: "Transgender",
  NONBINARY: "Non-Binary",
};

const HIGHEST_EDUCATION = [
  "Doctorate degree (for example, PhD, EdD)",
  "Professional degree beyond bachelor's degree (for example:MD, DDS, DVM, LLB, JD)",
  "Master's degree (for example: MA, MS, MEng, MEd, MSW, MBA)",
  "Bachelor's degree (for example: BA. BS)",
  "Associates degree (for example: AA, AS)",
  "GED or alternative credential",
  "Regular high school diploma",
  "12th grade—no diploma",
  "No schooling completed",
];

const LEARNING_METHODS = ["Books", "Articles", "Videos", "Podcasts"];

const ANNUAL_INCOMES = [
  "0-$20k",
  "$21-$40k",
  "$41-$60k",
  "$61-$80k",
  "$81-$100k",
  "$101-$125k",
  "$126-$150k",
  "$150k+",
];

const DEBTS = [
  "0-$20k",
  "$21-$40k",
  "$41-$60k",
  "$61-$80k",
  "$81-$100k",
  "$101-$125k",
  "$126-$150k",
  "$150k+",
];

const INIT_VALUES = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  occupation: "",
  education: "",
  university: "",
  country: "",
  state: "",
  financialLevel: 0,
  learningMethod: "",
  income: "",
  debt: "",
  general: "",
};

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name cannot be empty."),
  lastName: Yup.string().required("Last name cannot be empty."),
  dateOfBirth: Yup.string().required("Date of birth cannot be empty."),
  gender: Yup.string().required("Gender cannot be empty."),
  occupation: Yup.string().required("Occupation cannot be empty."),
  education: Yup.string().required("Highest education cannot be empty."),
  university: Yup.string().required("University name cannot be empty."),
  country: Yup.string().required("Country selection cannot be empty."),
  state: Yup.string().required("State selection cannot be empty."),
  financialLevel: Yup.number().optional(),
  learningMethod: Yup.string().required("Preferred learning cannot be empty."),
  income: Yup.string().required("Annual income cannot be empty."),
  debt: Yup.string().required("Debt cannot be empty."),
  general: Yup.string().optional(),
});

const ClientSurvey = () => {
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const countries = countryList().getData();

  const submitForm = async (values, callback) => {
    console.log(values.dateOfBirth);
    values = {
      ...values,
      username: user?.username,
      emailId: user?.email,
      profileStatus: true,
      location: values.state + ", " + values.country,
    };
    dispatch(addClientProfile(values));
  };

  return (
    <div className="surveyWizard">
      <p className="surveyText">CLIENT PROFILE</p>
      <Formik
        initialValues={INIT_VALUES}
        validationSchema={ValidationSchema}
        onSubmit={(values, { resetForm }) => {
          submitForm(values, () => {
            resetForm({ ...INIT_VALUES });
          });
        }}
      >
        {({
          values,
          errors,
          setFieldValue,
          handleChange,
          touched,
          resetForm,
        }) => (
          <>
            <Form>
              <div className="surveyWizard__sub">
                <TextField
                  name="firstName"
                  label="First Name"
                  className="surveyWizard__textField"
                  value={values.firstname}
                  onChange={handleChange}
                  error={Boolean(errors.firstname)}
                  helperText={errors.firstname}
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  className="surveyWizard__textField"
                  value={values.lastname}
                  onChange={handleChange}
                  error={Boolean(errors.lastname)}
                  helperText={errors.lastname}
                />
                <TextField
                  name="dateOfBirth"
                  label="Date Of Birth"
                  type="date"
                  className="surveyWizard__textField"
                  value={values.dateOfBirth}
                  onChange={handleChange}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={Boolean(errors.dateOfBirth)}
                  helperText={errors.dateOfBirth}
                />
              </div>

              <div className="surveyWizard__sub">
                <div>
                  <ToggleButtonGroup
                    color="primary"
                    name="gender"
                    value={values.gender}
                    onChange={({ target: { value } }) => {
                      setFieldValue("gender", value);
                    }}
                    className="surveyWizard__gender"
                    aria-label="Platform"
                  >
                    {Object.values(GENDER).map((x) => (
                      <ToggleButton
                        value={x}
                        key={x}
                        className="surveyWizard__gender--btn"
                      >
                        {x}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                  <p className="errorText">
                    <ErrorMessage name="gender" />
                  </p>
                </div>

                <TextField
                  name="occupation"
                  label="Occupation"
                  className="surveyWizard__textField"
                  value={values.occupation}
                  onChange={handleChange}
                  error={Boolean(errors.occupation)}
                  helperText={errors.occupation}
                />
              </div>

              <div className="surveyWizard__sub">
                <div>
                  <InputLabel id="education">
                    Higest Education Completed
                  </InputLabel>
                  <Select
                    labelId="education"
                    name="education"
                    value={values.education}
                    className="surveyWizard__select"
                    onChange={handleChange}
                    sx={{ width: 220 }}
                    error={Boolean(errors.education)}
                  >
                    {HIGHEST_EDUCATION.map((x) => (
                      <MenuItem value={x} key={x}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                  <p className="errorText">
                    <ErrorMessage name="education" />
                  </p>
                </div>

                <TextField
                  name="university"
                  label="University"
                  className="surveyWizard__textField"
                  value={values.university}
                  onChange={handleChange}
                  error={Boolean(errors.university)}
                  helperText={errors.university}
                />
              </div>

              <div className="surveyWizard__sub">
                <div>
                  <InputLabel id="country">Country</InputLabel>
                  <Select
                    labelId="country"
                    name="country"
                    className="surveyWizard__select"
                    value={values.country}
                    sx={{ width: 220 }}
                    error={Boolean(errors.country)}
                    onChange={({ target }) => {
                      setFieldValue("country", target.value);
                    }}
                  >
                    {countries.map(({ label, value }) => (
                      <MenuItem value={label} key={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                  <p className="errorText">
                    <ErrorMessage name="country" />
                  </p>
                </div>

                <div>
                  <InputLabel id="state">State</InputLabel>
                  <Select
                    labelId="state"
                    name="state"
                    className="surveyWizard__select"
                    value={values.state}
                    sx={{ width: 220 }}
                    error={Boolean(errors.state)}
                    onChange={({ target }) => {
                      setFieldValue("state", target.value);
                    }}
                  >
                    {Object.values(US_STATES).map((x) => (
                      <MenuItem value={x} key={x}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                  <p className="errorText">
                    <ErrorMessage name="state" />
                  </p>
                </div>

                <div>
                  <InputLabel id="literacy">
                    Financial Literacy Level (Optional)
                  </InputLabel>
                  <br />
                  <Slider
                    name="financialLevel"
                    onChange={({ target }) => {
                      setFieldValue("financialLevel", parseInt(target.value));
                    }}
                    value={parseInt(values.financialLevel)}
                    className="surveyWizard__scroller"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                  />
                </div>
              </div>

              <div className="surveyWizard__sub">
                <div>
                  <InputLabel id="learningMethod">
                    Preferred learning method
                  </InputLabel>
                  <Select
                    labelId="learningMethod"
                    name="learningMethod"
                    value={values.learningMethod}
                    className="surveyWizard__select"
                    sx={{ width: 220 }}
                    error={Boolean(errors.learningMethod)}
                    onChange={({ target }) => {
                      setFieldValue("learningMethod", target.value);
                    }}
                  >
                    {LEARNING_METHODS.map((x) => (
                      <MenuItem value={x} key={x}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                  <p className="errorText">
                    <ErrorMessage name="learningMethod" />
                  </p>
                </div>

                <div>
                  <InputLabel id="income">Annual Income</InputLabel>
                  <Select
                    labelId="income"
                    name="income"
                    value={values.income}
                    className="surveyWizard__select"
                    error={Boolean(errors.income)}
                    sx={{ width: 220 }}
                    onChange={({ target }) => {
                      setFieldValue("income", target.value);
                    }}
                  >
                    {ANNUAL_INCOMES.map((x) => (
                      <MenuItem value={x} key={x}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                  <p className="errorText">
                    <ErrorMessage name="income" />
                  </p>
                </div>

                <div>
                  <InputLabel id="debt">Approximate Debt</InputLabel>
                  <Select
                    labelId="debt"
                    name="debt"
                    value={values.debt}
                    className="surveyWizard__select"
                    sx={{ width: 220 }}
                    error={Boolean(errors.debt)}
                    onChange={({ target }) => {
                      setFieldValue("debt", target.value);
                    }}
                  >
                    {DEBTS.map((x) => (
                      <MenuItem value={x} key={x}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                  <p className="errorText">
                    <ErrorMessage name="debt" />
                  </p>
                </div>
              </div>

              <div className="surveyWizard__sub">
                <TextareaAutosize
                  aria-label="empty textarea"
                  name="general"
                  placeholder="What is your why ? (Optional)"
                  className="surveyWizard__textbox"
                  value={values.general}
                  style={{ width: "60vw", height: 100 }}
                  onChange={({ target }) => {
                    setFieldValue("general", target.value);
                  }}
                />
              </div>
              <div className="surveyWizard__sub">
                <Button
                  type="submit"
                  className="surveyWizard__button"
                  variant="contained"
                  disabled={false}
                  sx={{ width: 200 }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ClientSurvey;
