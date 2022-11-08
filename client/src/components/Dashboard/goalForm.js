import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Chip } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { ROUTES } from "../App/routeConfig";
import goalService from "../../services/goalService";

import "../../styles/goalForm.scss";

const INIT_VALUES = {
  goalTittle: "",
  goalDescription: "",
  goalSpecific: "",
  goalMeasurable: "",
  goalAttainable: "",
  goalRelevant: "",
  goalTimeBased: "",
  goalTags: [],
};

const ValidationSchema = Yup.object().shape({
  goalTittle: Yup.string().required("Goal title cannot be empty."),
  goalDescription: Yup.string().required("Goal description cannot be empty."),
  goalSpecific: Yup.string().required("Specific goal cannot be empty."),
  goalMeasurable: Yup.string().required("Measurable goal cannot be empty."),
  goalAttainable: Yup.string().required("Attainable goal cannot be empty."),
  goalRelevant: Yup.string().required("Relevant goal cannot be empty."),
  goalTimeBased: Yup.string().required("Time based goal cannot be empty."),
});

const GoalForm = ({ user }) => {
  const [showTagErr, setShowTagErr] = useState(false);
  const editGoal = JSON.parse(localStorage.getItem("EDIT_GOAL"));
  const tagList = [
    "Budgeting",
    "Debt",
    "Net Worth",
    "Investing",
    "Real Estate",
    "Taxes",
    "Insurance",
    "Crypto Currency",
    "Mindset",
    "Entrepreneruship",
    "Credit",
    "Financial Freedom",
    "Automating your financial life",
    "Cutting Expenses",
    "Student Loans",
    "Mortgages",
    "Stock Market",
    "Passive Income Ideas",
    "Savings",
  ];

  const getInitValues = () => {
    return editGoal ? editGoal : INIT_VALUES;
  };

  const submitForm = async (values) => {
    if (values?.goalTags?.length == 0) {
      setShowTagErr(true);
      return;
    }
    values = {
      ...values,
      clientUsername: user?.username || "",
    };

    if (!editGoal) {
      // New Goal
      values = {
        ...values,
        goalStatus: "NOT_STARTED",
        goalReviewCoachId: "",
      };
      goalService._addGoal(values).then((res) => {
        window.location.href = "/" + ROUTES.CLIENT_DASHBOARD + "?tab=goals";
      });
    } else {
      // Existing Goal
      values = {
        ...values,
        goalId: editGoal.goalId,
      };
      goalService._updateGoal(values).then((res) => {
        window.location.href =
          "/" +
          ROUTES.CLIENT_DASHBOARD +
          "?tab=goals&goalId=" +
          editGoal?.goalId;
      });
    }
  };

  const onCancel = () => {
    if (editGoal) {
      window.location.href =
        "/" + ROUTES.CLIENT_DASHBOARD + "?tab=goals&goalId=" + editGoal?.goalId;
    } else {
      window.location.href = "/" + ROUTES.CLIENT_DASHBOARD + "?tab=goals";
    }
  };

  return (
    <div className="addGoal">
      <p className="addGoalText">Add Goal</p>
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
          setFieldTouched,
          handleChange,
          touched,
          resetForm,
        }) => (
          <>
            <Form>
              <div className="addGoal__text">
                <div className="addGoal__generic">
                  <InputLabel id="title">Goal Title</InputLabel>
                  <TextareaAutosize
                    aria-label="empt"
                    name="goalTittle"
                    className="addGoal__generic"
                    value={values.goalTittle}
                    style={{ width: "400px" }}
                    onChange={({ target }) => {
                      setFieldTouched("goalTittle", true);
                      setFieldValue("goalTittle", target.value);
                    }}
                    minRows={4}
                  />

                  {errors.goalTittle && touched.goalTittle && (
                    <div style={{ color: "red" }}>{errors.goalTittle}</div>
                  )}
                </div>
                <div className="addGoal__generic">
                  <InputLabel id="goalDescription">Goal Description</InputLabel>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    name="goalDescription"
                    className="addGoal__smart"
                    value={values.goalDescription}
                    style={{ width: "430px" }}
                    onChange={({ target }) => {
                      setFieldTouched("goalDescription", true);
                      setFieldValue("goalDescription", target.value);
                    }}
                    minRows={4}
                  />
                  {errors.goalDescription && touched.goalDescription && (
                    <div style={{ color: "red" }}>{errors.goalDescription}</div>
                  )}
                </div>
              </div>
              <div className="addGoal__text">
                <InputLabel className="addGoal__smart" id="smart-s">
                  S :
                </InputLabel>

                <TextareaAutosize
                  aria-label="empty textarea"
                  name="goalSpecific"
                  placeholder="Specific"
                  className="addGoal__smart"
                  value={values.goalSpecific}
                  style={{ width: "60vw" }}
                  onChange={({ target }) => {
                    setFieldTouched("goalSpecific", true);
                    setFieldValue("goalSpecific", target.value);
                  }}
                  minRows={4}
                />
                {errors.goalSpecific && touched.goalSpecific && (
                  <div style={{ color: "red" }}>{errors.goalSpecific}</div>
                )}
              </div>
              <div className="addGoal__text">
                <InputLabel className="addGoal__smart" id="smart-m">
                  M :
                </InputLabel>

                <TextareaAutosize
                  aria-label="empty textarea"
                  name="goalMeasurable"
                  placeholder="Measurable"
                  className="addGoal__smart"
                  value={values.goalMeasurable}
                  style={{ width: "60vw" }}
                  onChange={({ target }) => {
                    setFieldTouched("goalMeasurable", true);
                    setFieldValue("goalMeasurable", target.value);
                  }}
                  minRows={4}
                />
                {errors.goalMeasurable && touched.goalMeasurable && (
                  <div style={{ color: "red" }}>{errors.goalMeasurable}</div>
                )}
              </div>
              <div className="addGoal__text">
                <InputLabel className="addGoal__smart" id="smart-a">
                  A :
                </InputLabel>

                <TextareaAutosize
                  aria-label="empty textarea"
                  name="goalAttainable"
                  placeholder="Attainable"
                  className="addGoal__smart"
                  value={values.goalAttainable}
                  style={{ width: "60vw" }}
                  onChange={({ target }) => {
                    setFieldTouched("goalAttainable", true);
                    setFieldValue("goalAttainable", target.value);
                  }}
                  minRows={4}
                />
                {errors.goalAttainable && touched.goalAttainable && (
                  <div style={{ color: "red" }}>{errors.goalAttainable}</div>
                )}
              </div>
              <div className="addGoal__text">
                <InputLabel className="addGoal__smart" id="smart-r">
                  R :
                </InputLabel>

                <TextareaAutosize
                  aria-label="empty textarea"
                  name="goalRelevant"
                  placeholder="Relevant"
                  className="addGoal__smart"
                  value={values.goalRelevant}
                  style={{ width: "60vw" }}
                  onChange={({ target }) => {
                    setFieldTouched("goalRelevant", true);
                    setFieldValue("goalRelevant", target.value);
                  }}
                  minRows={4}
                />
                {errors.goalRelevant && touched.goalRelevant && (
                  <div style={{ color: "red" }}>{errors.goalRelevant}</div>
                )}
              </div>
              <div className="addGoal__text">
                <InputLabel className="addGoal__smart" id="smart-t">
                  T :
                </InputLabel>

                <TextareaAutosize
                  aria-label="empty textarea"
                  name="goalTimeBased"
                  placeholder="Time-Bound"
                  className="addGoal__smart"
                  value={values.goalTimeBased}
                  style={{ width: "60vw" }}
                  onChange={({ target }) => {
                    setFieldTouched("goalTimeBased", true);
                    setFieldValue("goalTimeBased", target.value);
                  }}
                  minRows={4}
                />
                {errors.goalTimeBased && touched.goalTimeBased && (
                  <div style={{ color: "red" }}>{errors.goalTimeBased}</div>
                )}
              </div>
              <div className="addGoal__text">
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  value={values.goalTags}
                  onChange={(event, newValue) => {
                    if (values?.goalTags?.length == 3) {
                      setShowTagErr(true);
                    } else {
                      setShowTagErr(false);
                      setFieldValue("goalTags", [
                        ...new Set([...values.goalTags, ...newValue]),
                      ]);
                    }
                  }}
                  options={tagList}
                  disableCloseOnSelect
                  clearIcon={<></>}
                  getOptionLabel={(option) => option}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        onDelete={(e) => {
                          setShowTagErr(false);
                          setFieldValue(
                            "goalTags",
                            values.goalTags.filter((x) => x !== option)
                          );
                        }}
                      />
                    ))
                  }
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Add more tags"
                    />
                  )}
                />
                {showTagErr && (
                  <div style={{ color: "blue" }}>
                    &nbsp;&nbsp;Please select upto 3 tags per goal.
                  </div>
                )}
              </div>
              <div className="addGoal__text">
                <Button
                  type="submit"
                  className="addGoal__button"
                  variant="contained"
                  disabled={false}
                  sx={{ width: 200 }}
                >
                  {editGoal ? "Update" : "Add"}
                </Button>

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
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default GoalForm;
