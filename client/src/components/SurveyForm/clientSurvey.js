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

import { useDispatch } from "react-redux";
import {
  addClientProfile,
  updateClientProfile,
} from "../../redux/slices/authSlice";

import { ROUTES } from "../App/routeConfig";

import "../../styles/surveyForm.scss";

const GENDER = {
  MALE: "Male",
  FEMALE: "Female",
  TRANSGENDER: "Transgender",
  NONBINARY: "Non-Binary",
  OTHER: "Other",
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
  secondaryLearningMethod: "",
  income: "",
  debt: "",
  general: "",
};

const marks = [
  {
    value: 0,
    label: "Child",
  },
  // {
  //   value: 1,
  //   label: "1",
  // },
  // {
  //   value: 2,
  //   label: "2",
  // },
  // {
  //   value: 3,
  //   label: "3",
  // },
  // {
  //   value: 4,
  //   label: "4",
  // },
  // {
  //   value: 5,
  //   label: "5",
  // },
  // {
  //   value: 6,
  //   label: "6",
  // },
  // {
  //   value: 7,
  //   label: "7",
  // },
  // {
  //   value: 8,
  //   label: "8",
  // },
  // {
  //   value: 9,
  //   label: "9",
  // },
  {
    value: 10,
    label: "W. Buffet",
  },
];
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
  secondaryLearningMethod: Yup.string().required(
    "Secondary learning method cannot be empty."
  ),
  income: Yup.string().required("Annual income cannot be empty."),
  debt: Yup.string().required("Debt cannot be empty."),
  general: Yup.string().optional(),
});

const getDate = (date) => {
  let splitDate = date.split("-");
  let dob = new Date(splitDate[0], splitDate[1], splitDate[2]);
  let month = dob.getUTCMonth().toString(); //months from 1-12
  month = month.length > 1 ? month : "0" + month;
  let day = dob.getUTCDate().toString();
  day = day.length > 1 ? day : "0" + day;
  let year = dob.getUTCFullYear();
  return year + "-" + month + "-" + day;
};

const ClientSurvey = ({
  clientProfile,
  isAdmin,
  newClientEmailId,
  newClientUsername,
}) => {
  const dispatch = useDispatch();
  const countries = countryList().getData();
  const isEdit = !!clientProfile;

  const getInitValues = () => {
    if (isEdit) {
      let locationArr = clientProfile?.location?.split(", ") || "";
      let initProfile = {
        ...clientProfile,
        dateOfBirth: getDate(clientProfile?.dateOfBirth),
        country: locationArr[1],
        state: locationArr[0],
      };
      return initProfile;
    }
    return INIT_VALUES;
  };

  const submitForm = async (values) => {
    values = {
      ...values,
      username: isEdit ? clientProfile?.username : newClientUsername,
      emailId: isEdit ? clientProfile?.emailId : newClientEmailId,
      profileStatus: true,
      dateOfBirth: getDate(values?.dateOfBirth),
      location: values.state + ", " + values.country,
    };

    isEdit
      ? dispatch(updateClientProfile(values))
      : dispatch(addClientProfile(values));
  };

  const onCancel = () => {
    let url = isAdmin ? ROUTES.ADMIN_CLIENT_DASHBOARD : ROUTES.CLIENT_DASHBOARD;
    window.location.href = "/" + url;
  };

  return (
    <div className="surveyWizard">
      <p className="surveyText">CLIENT PROFILE</p>
      <Formik
        initialValues={getInitValues()}
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
                <div>
                  <InputLabel id="education">First Name</InputLabel>
                  <TextField
                    name="firstName"
                    className="surveyWizard__textField"
                    value={values.firstName}
                    onChange={handleChange}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                  />
                </div>
                <div>
                  <InputLabel id="education">Last Name</InputLabel>
                  <TextField
                    name="lastName"
                    className="surveyWizard__textField"
                    value={values.lastName}
                    onChange={handleChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                  />
                </div>
                <div>
                  <InputLabel id="education">Date of Birth</InputLabel>

                  <TextField
                    name="dateOfBirth"
                    type="date"
                    className="surveyWizard__textField"
                    defaultValue={values.dateOfBirth}
                    onChange={(e) => {
                      setFieldValue("dateOfBirth", e.target.value);
                    }}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors.dateOfBirth)}
                    helperText={errors.dateOfBirth}
                  />
                </div>
                <div>
                  <InputLabel id="education">Gender</InputLabel>

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
              </div>

              <div className="surveyWizard__sub">
                <div>
                  <InputLabel id="education">Occupation</InputLabel>

                  <TextField
                    name="occupation"
                    className="surveyWizard__textField"
                    value={values.occupation}
                    onChange={handleChange}
                    error={Boolean(errors.occupation)}
                    helperText={errors.occupation}
                  />
                </div>
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
                <div>
                  <InputLabel id="education">University</InputLabel>

                  <TextField
                    name="university"
                    className="surveyWizard__textField"
                    value={values.university}
                    onChange={handleChange}
                    error={Boolean(errors.university)}
                    helperText={errors.university}
                  />
                </div>
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
                    Financial Literacy Level
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
                    marks={marks}
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
                  <InputLabel id="secondaryLearningMethod">
                    Secondary learning method
                  </InputLabel>
                  <Select
                    labelId="secondaryLearningMethod"
                    name="secondaryLearningMethod"
                    value={values.secondaryLearningMethod}
                    className="surveyWizard__select"
                    sx={{ width: 220 }}
                    error={Boolean(errors.secondaryLearningMethod)}
                    onChange={({ target }) => {
                      setFieldValue("secondaryLearningMethod", target.value);
                    }}
                  >
                    {LEARNING_METHODS.map((x) => (
                      <MenuItem value={x} key={x}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                  <p className="errorText">
                    <ErrorMessage name="secondaryLearningMethod" />
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
                <div>
                  <InputLabel id="education">What is your Why?</InputLabel>

                  <TextareaAutosize
                    aria-label="empty textarea"
                    name="general"
                    placeholder="Why do you want to improve your finance?"
                    className="surveyWizard__textbox"
                    value={values.general}
                    style={{ width: "60vw", height: 100 }}
                    onChange={({ target }) => {
                      setFieldValue("general", target.value);
                    }}
                  />
                </div>
              </div>
              <div className="surveyWizard__sub">
                <Button
                  type="submit"
                  className="surveyWizard__button"
                  variant="contained"
                  disabled={false}
                  sx={{ width: 200 }}
                >
                  {isEdit ? "Update" : "Submit"}
                </Button>
                {isEdit && (
                  <Button
                    type="button"
                    className="surveyWizard__button--cancel"
                    variant="outlined"
                    disabled={false}
                    color="inherit"
                    sx={{ width: 200 }}
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ClientSurvey;
