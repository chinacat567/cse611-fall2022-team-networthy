import React, { useRef } from "react";
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
import countryList from "react-select-country-list";
import US_STATES from "./usStates.json";
import useFileUpload from "react-use-file-upload";

import { useDispatch } from "react-redux";
import {
  addCoachProfile,
  updateCoachProfile,
} from "../../redux/slices/authSlice";

import "../../styles/surveyForm.scss";
import { ROUTES } from "../App/routeConfig";

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
  general: Yup.string().optional(),
});

const getDate = (date) => {
  let dob = new Date(date?.split("-") || "");
  let month = dob.getUTCMonth() + 1; //months from 1-12
  let day = dob.getUTCDate();
  let year = dob.getUTCFullYear();
  return year + "-" + month + "-" + day;
};

const CoachSurvey = ({ user }) => {
  const dispatch = useDispatch();
  const countries = countryList().getData();
  const isEdit = !!user?.clientProfile;

  const getInitValues = () => {
    if (isEdit) {
      let locationArr = user?.clientProfile?.location?.split(", ") || "";
      let initProfile = {
        ...user.clientProfile,
        dateOfBirth: getDate(user?.clientProfile?.dateOfBirth),
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
      username: user?.username,
      emailId: user?.email,
      profileStatus: true,
      dateOfBirth: getDate(values?.dateOfBirth),
      location: values.state + ", " + values.country,
    };

    isEdit
      ? dispatch(updateCoachProfile(values))
      : dispatch(addCoachProfile(values));
  };

  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();

  const inputRef = useRef();

  const onCancel = () => (window.location.href = "/" + ROUTES.CLIENT_DASHBOARD);

  return (
    <div className="surveyWizard">
      <p className="surveyText">COACH PROFILE</p>
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
                    label="University"
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
              </div>

              <div className="surveyWizard__sub">
                <div>
                  <InputLabel id="state">
                    Resume and 2 Letter of Recommendations
                  </InputLabel>
                  <div>
                    <ul>
                      {fileNames.map((name) => (
                        <li key={name}>
                          <span>{name}</span>

                          <span onClick={() => removeFile(name)}>
                            <i className="fa fa-times" />
                          </span>
                        </li>
                      ))}
                    </ul>

                    {files.length > 0 && (
                      <ul>
                        {/* <li>File types found: {fileTypes.join(", ")}</li> */}
                        {/* <li>Total Size: {totalSize}</li>
                        <li>Total Bytes: {totalSizeInBytes}</li> */}

                        <p className="clear-all">
                          <button onClick={() => clearAllFiles()}>
                            Clear All
                          </button>
                        </p>
                      </ul>
                    )}
                  </div>
                  <Button
                    className="surveyWizard__buttonUpload"
                    onClick={() => inputRef.current.click()}
                  >
                    Upload
                  </Button>
                  <input
                    ref={inputRef}
                    type="file"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setFiles(e, "a");
                      inputRef.current.value = null;
                    }}
                  />
                </div>
              </div>

              <div className="surveyWizard__sub">
                <div>
                  <InputLabel id="state">What is your Why?</InputLabel>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    name="general"
                    placeholder="Why do you want to help people improve their finance?"
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
                <div>
                  <InputLabel id="state">Credentials</InputLabel>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    name="general"
                    placeholder="This is your time to sell yourself to the users, think of it as an elevator pitch."
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

export default CoachSurvey;
