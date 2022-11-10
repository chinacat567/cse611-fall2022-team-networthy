import {
  Box,
  Button,
  Modal,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addClientComments,
  getClientComments,
} from "../../redux/slices/commentSlice";
import CommentIcon from "@mui/icons-material/Comment";

import { showLoader } from "../../redux/slices/loaderSlice";

import "../../styles/comments.scss";

const INIT_VALUES = {
  comment: "",
};

const ValidationSchema = Yup.object().shape({
  comment: Yup.string().required("Comment cannot be empty."),
});

const round2 = (num) => {
  return num.toString().padStart(2, "0");
};

const formatDate = (date) => {
  return [
    date.getFullYear(),
    round2(date.getMonth() + 1),
    round2(date.getDate()),
  ].join("-");
};

const getDate = (date) => {
  return (
    date.split("-")[1] + "-" + date.split("-")[0] + "-" + date.split("-")[2]
  );
};

const Comments = ({ clientId, isOpen, onClose, goal, coachId }) => {
  const dispatch = useDispatch();
  const clientComments = useSelector((state) => state?.comment?.clientComments);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    dispatch(
      getClientComments({
        clientId,
      })
    );
  }, []);

  const onSubmit = async (values, cb) => {
    values = {
      ...values,
      clientId,
      coachId,
      goalId: goal?.goalId || "",
      goalTitle: goal?.goalTittle || "",
      commentDate: formatDate(new Date()),
    };

    await dispatch(showLoader(true));
    await dispatch(addClientComments(values));
    await dispatch(getClientComments({ clientId }));
    setFormVisible(false);
    await dispatch(showLoader(false));

    cb();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="comments">
        <Typography id="modal-modal-title" variant="h6" component="h6">
          Comments
        </Typography>
        <div className="commentsGoalTitle">
          <Typography id="modal-modal-description">
            {goal?.goalTittle}
          </Typography>
          <Button variant="text" onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? "View Comments" : "Add Comment"}
          </Button>
        </div>
        {formVisible ? (
          <div className="commentsForm">
            <Formik
              initialValues={INIT_VALUES}
              validationSchema={ValidationSchema}
              onSubmit={(values, { resetForm }) => {
                onSubmit(values, () => {
                  resetForm({
                    ...INIT_VALUES,
                  });
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
                <Form>
                  <div>
                    <TextareaAutosize
                      aria-label="empty textarea"
                      name="comment"
                      placeholder="Comment here."
                      className="commentForm__textArea"
                      value={values.comment}
                      style={{ width: "100%" }}
                      onChange={({ target }) => {
                        setFieldTouched("comment", true);
                        setFieldValue("comment", target.value);
                      }}
                      minRows={12}
                    />
                    {errors.comment && touched.comment && (
                      <div style={{ color: "red" }}>{errors.comment}</div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="commentForm__button"
                    variant="contained"
                    disabled={false}
                    sx={{ width: 200, marginTop: "12px" }}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="commentsList">
            {!!clientComments.filter((x) => x.goalTitle === goal?.goalTittle)
              .length
              ? clientComments
                  .filter((x) => x.goalTitle === goal?.goalTittle)
                  .map((x) => (
                    <div key={x.id} className="commentsList__comment">
                      <CommentIcon sx={{ marginTop: "2px" }} />
                      <div className="commentsList__commentWrapper">
                        {x.comment}
                        <div className="commentBy">
                          <p>
                            <i>By {x?.coachId || ""}</i>
                          </p>
                          <p>
                            <i>Goal: {x?.goalTitle || ""}</i>
                          </p>
                          <p>
                            <i>
                              {new Date(
                                getDate(x?.commentDate)
                              ).toLocaleDateString("en-us", {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }) || ""}
                            </i>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
              : "No comments yet for this goal!"}
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default Comments;
