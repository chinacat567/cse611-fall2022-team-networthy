import React, { useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import countryList from "react-select-country-list";
import SelectUSState from "react-select-us-states";

import "../../styles/surveyForm.scss";
import { height } from "@mui/system";

const clientSurvey = ({ state }) => {
  // const dispatch = useDispatch();
  const options = countryList().getData();

  console.log(options);

  const getInitialValues = (state) => {
    return {
      firstname: "",
      lastname: "",
      gender: "male",
    };
  };

  const submitForm = (data) => {
    // if (isSignup || isCoachSignup) {
    //   // Signup
    //   dispatch(
    //     signup({
    //       ...data,
    //       roles: [getUserRole(state)],
    //     })
    //   );
    // }
    // if (isLogin || isCoachLogin) {
    //   // Login
    //   dispatch(
    //     signin({
    //       ...data,
    //       roles: [getUserRole(state)],
    //     })
    //   );
    // }
  };

  return (
    <div className="surveyWizard">
      <p className="surveyText">SURVEY FORM</p>
      <Formik
        initialValues={getInitialValues(state)}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm();
        }}
      >
        {({ values, errors, setFieldValue, handleChange, resetForm }) => (
          <>
            <Form>
              <div className="surveyWizard__name">
                <TextField
                  name="firstname"
                  placeholder="First Name"
                  className="surveyWizard__firstName"
                  value={values.firstname}
                  onChange={handleChange}
                  error={Boolean(errors.firstname)}
                  helperText={errors.username}
                />

                <TextField
                  name="lastname"
                  placeholder="Last Name"
                  className="surveyWizard__lastName"
                  value={values.lastname}
                  onChange={handleChange}
                  error={Boolean(errors.lastname)}
                  helperText={errors.lastname}
                />

                <TextField
                  id="dob"
                  label="Date Of Birth"
                  type="date"
                  className="surveyWizard__lastName"
                  defaultValue="2000-01-01"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className="surveyWizard__name">
                <ToggleButtonGroup
                  color="primary"
                  value={values.gender}
                  onChange={({ target: { value } }) => {
                    setFieldValue("gender", value);
                  }}
                  className="surveyWizard__gender"
                  aria-label="Platform"
                >
                  <ToggleButton value="male">Male</ToggleButton>
                  <ToggleButton value="female">Female</ToggleButton>
                  <ToggleButton value="transgender">Transgender</ToggleButton>
                  <ToggleButton value="nonbinary">Non-Binary</ToggleButton>
                </ToggleButtonGroup>

                <TextField
                  name="occupation"
                  placeholder="Occupation"
                  className="surveyWizard__lastName"
                  value={values.occupation}
                  onChange={handleChange}
                  error={Boolean(errors.occupation)}
                  helperText={errors.occupation}
                />
              </div>

              <div className="surveyWizard__name">
                <div>
                  <InputLabel
                    className="surveyWizard__education"
                    id="highestEducation"
                  >
                    Higest Education Completed
                  </InputLabel>
                  <Select
                    labelId="highestEducation"
                    id="highestEducation"
                    value={values.highestEducation}
                    className="surveyWizard__education"
                    label="Higest Education Completed"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>
                      Doctorate degree (for example, PhD, EdD)
                    </MenuItem>
                    <MenuItem value={20}>
                      Professional degree beyond bachelor’s degree (for example:
                      MD, DDS, DVM, LLB, JD)
                    </MenuItem>
                    <MenuItem value={30}>
                      Master’s degree (for example: MA, MS, MEng, MEd, MSW, MBA)
                    </MenuItem>
                    <MenuItem value={40}>
                      Bachelor’s degree (for example: BA. BS)
                    </MenuItem>
                    <MenuItem value={50}>
                      Associates degree (for example: AA, AS)
                    </MenuItem>
                    <MenuItem value={60}>
                      GED or alternative credential
                    </MenuItem>
                    <MenuItem value={70}>Regular high school diploma</MenuItem>
                    <MenuItem value={80}>12th grade—no diploma</MenuItem>
                    <MenuItem value={90}>No schooling completed</MenuItem>
                  </Select>
                </div>

                <TextField
                  name="university"
                  placeholder="University"
                  className="surveyWizard__university"
                  value={values.university}
                  onChange={handleChange}
                  error={Boolean(errors.university)}
                  helperText={errors.university}
                />
              </div>
              <div className="surveyWizard__location">
                <div>
                  <InputLabel className="surveyWizard__country" id="country">
                    Country
                  </InputLabel>
                  <Select
                    className="surveyWizard__country"
                    value={values.country}
                    onChange={() => {}}
                  >
                    {options.map(({ label, value }) => (
                      <MenuItem value={label} key={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="surveyWizard__state">
                  <InputLabel id="state">State</InputLabel>
                  <SelectUSState id="state" onChange={() => {}} />
                </div>
                <div>
                  <Typography gutterBottom>
                    Level of financial Literacy
                  </Typography>
                  <Slider
                    aria-label="Temperature"
                    defaultValue={0}
                    getAriaValueText={values.financialLiteracy}
                    className="surveyWizard__scroller"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                  />
                </div>
              </div>

              <div className="surveyWizard__name">
                <div>
                  <InputLabel
                    className="surveyWizard__learningMethod"
                    id="learningMethod"
                  >
                    Preferred learning method
                  </InputLabel>
                  <Select
                    labelId="learningMethod"
                    id="learningMethod"
                    value={values.preferredLearningMethod}
                    className="surveyWizard__learningMethod"
                    label="Preferred learning method"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Books"}>Books</MenuItem>
                    <MenuItem value={"Articles"}>Articles</MenuItem>
                    <MenuItem value={"Videos"}>Videos</MenuItem>
                    <MenuItem value={"Podcast"}>Podcast</MenuItem>
                  </Select>
                </div>

                <div>
                  <InputLabel className="surveyWizard__income" id="income">
                    Annual Income
                  </InputLabel>
                  <Select
                    labelId="income"
                    id="income"
                    value={values.annualincome}
                    className="surveyWizard__income"
                    label="Annual Income"
                    onChange={handleChange}
                  >
                    <MenuItem value={"0-$20k"}>0-$20k</MenuItem>
                    <MenuItem value={"$21-$40k"}>$21-$40k</MenuItem>
                    <MenuItem value={"$41-$60k"}>$41-$60k</MenuItem>
                    <MenuItem value={"$61-$80k"}>$61-$80k</MenuItem>
                    <MenuItem value={"$81-$100k"}>$81-$100k</MenuItem>
                    <MenuItem value={"$101-$125k"}>$101-$125k</MenuItem>
                    <MenuItem value={"$126-$150k"}>$126-$150k</MenuItem>
                    <MenuItem value={"$150k+"}>$150k+</MenuItem>
                  </Select>
                </div>
                <div>
                  <InputLabel className="surveyWizard__income" id="debt">
                    Approximate Debt
                  </InputLabel>
                  <Select
                    labelId="debt"
                    id="debt"
                    value={values.debt}
                    className="surveyWizard__income"
                    label="Approximate Debt"
                    onChange={handleChange}
                  >
                    <MenuItem value={"0-$20k"}>0-$20k</MenuItem>
                    <MenuItem value={"$21-$40k"}>$21-$40k</MenuItem>
                    <MenuItem value={"$41-$60k"}>$41-$60k</MenuItem>
                    <MenuItem value={"$61-$80k"}>$61-$80k</MenuItem>
                    <MenuItem value={"$81-$100k"}>$81-$100k</MenuItem>
                    <MenuItem value={"$101-$125k"}>$101-$125k</MenuItem>
                    <MenuItem value={"$126-$150k"}>$126-$150k</MenuItem>
                    <MenuItem value={"$150k+"}>$150k+</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="surveyWizard__name">
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="What is your why ?"
                  className="surveyWizard__textbox"
                  style={{ width: 1000, height: 100 }}
                />
              </div>
              <div className="surveyWizard__name">
                <Button
                  type="submit"
                  className="surveyWizard_button"
                  variant="contained"
                  disabled={Boolean(errors.password) || Boolean(errors.email)}
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

export default clientSurvey;
