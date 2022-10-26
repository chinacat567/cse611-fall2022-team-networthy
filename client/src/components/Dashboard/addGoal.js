import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import "../../styles/addGoal.scss";
import { fontWeight } from "@mui/system";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const addGoal = () => {
  const tagList = ["a", "b", "c"];

  const ValidationSchema = Yup.object().shape({});

  const getInitValues = () => {
    return INIT_VALUES;
  };

  const submitForm = async (values) => {};

  const INIT_VALUES = {
    title: "",
    description: "",
    s: "",
    m: "",
    a: "",
    r: "",
    t: "",
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
                    name="title"
                    className="addGoal__generic"
                    value={values.title}
                    style={{ width: "20vw", height: 50 }}
                    onChange={({ target }) => {
                      setFieldValue("title", target.value);
                    }}
                  />
                </div>
                <div className="addGoal__generic">
                  <InputLabel id="description">Goal Description</InputLabel>

                  <TextareaAutosize
                    aria-label="empty textarea"
                    name="description"
                    className="addGoal__smart"
                    value={values.description}
                    style={{ width: "40vw", height: 50 }}
                    onChange={({ target }) => {
                      setFieldValue("description", target.value);
                    }}
                  />
                </div>
              </div>
              <div className="addGoal__text">
                <InputLabel className="addGoal__smart" id="smart-s">
                  S :
                </InputLabel>

                <TextareaAutosize
                  aria-label="empty textarea"
                  name="smart-s"
                  placeholder="Specific"
                  className="addGoal__smart"
                  value={values.s}
                  style={{ width: "60vw", height: 25 }}
                  onChange={({ target }) => {
                    setFieldValue("s", target.value);
                  }}
                />
              </div>
              <div className="addGoal__text">
                <InputLabel className="addGoal__smart" id="smart-m">
                  M :
                </InputLabel>

                <TextareaAutosize
                  aria-label="empty textarea"
                  name="smart-m"
                  placeholder="Measurable"
                  className="addGoal__smart"
                  value={values.m}
                  style={{ width: "60vw", height: 25 }}
                  onChange={({ target }) => {
                    setFieldValue("m", target.value);
                  }}
                />
              </div>
              <div className="addGoal__text">
                <InputLabel className="addGoal__smart" id="smart-a">
                  A :
                </InputLabel>

                <TextareaAutosize
                  aria-label="empty textarea"
                  name="general"
                  placeholder="Attainable"
                  className="addGoal__smart"
                  value={values.a}
                  style={{ width: "60vw", height: 25 }}
                  onChange={({ target }) => {
                    setFieldValue("a", target.value);
                  }}
                  minRows={2}
                />
              </div>
              <div className="addGoal__text">
                <InputLabel className="addGoal__smart" id="smart-r">
                  R :
                </InputLabel>

                <TextareaAutosize
                  aria-label="empty textarea"
                  name="general"
                  placeholder="Relevant"
                  className="addGoal__smart"
                  value={values.r}
                  style={{ width: "60vw", height: 25 }}
                  onChange={({ target }) => {
                    setFieldValue("r", target.value);
                  }}
                />
              </div>
              <div className="addGoal__text">
                <InputLabel className="addGoal__smart" id="smart-t">
                  T :
                </InputLabel>

                <TextareaAutosize
                  aria-label="empty textarea"
                  name="general"
                  placeholder="Time-Bound"
                  className="addGoal__smart"
                  value={values.t}
                  style={{ width: "60vw", height: 25 }}
                  onChange={({ target }) => {
                    setFieldValue("t", target.value);
                  }}
                />
              </div>
              <div className="addGoal__text">
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  options={tagList}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  style={{ width: 300, height: 10 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Add more tags"
                    />
                  )}
                />
              </div>
              <div className="addGoal__text">
                <Button
                  type="submit"
                  className="addGoal__button"
                  variant="contained"
                  disabled={false}
                  sx={{ width: 200 }}
                >
                  Add
                </Button>

                <Button
                  type="button"
                  className="surveyWizard__button--cancel"
                  variant="outlined"
                  disabled={false}
                  color="inherit"
                  sx={{ width: 200 }}
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

export default addGoal;
