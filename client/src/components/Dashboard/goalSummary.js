import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

import "../../styles/goalSummary.scss";

const CssTextField = styled(TextField)({
  "& .MuiInput-input": {
    border: "0px",
  },
  "& .MuiInput-root:before": {
    display: "none",
  },
  "& .MuiInput-underline:after": {
    display: "none",
  },
});

const truncateString = (str) => {
  if (str.length > 20) {
    return str.substring(0, 20) + "...";
  }
  return str;
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#415d32" : "#d2d2d2",
  },
}));

const GOAL_STATUSES = {
  NOT_STARTED: {
    title: "Not Started",
    value: 0,
  },
  IN_PROGRESS: {
    title: "In Progress",
    value: 50,
  },
  IN_REVIEW: {
    title: "In Review",
    value: 80,
  },
  FINISHED: {
    title: "Finished",
    value: 100,
  },
};

const GoalSummary = ({ selectedGoalId, setSelectedGoal }) => {
  const clientGoals = useSelector((state) => state?.goal?.goalList);
  const [goal, setGoal] = useState({});

  useEffect(() => {
    if (clientGoals.length && selectedGoalId) {
      // all goals exists
      let existingGoal = clientGoals?.filter(
        (x) => x?.goalId == selectedGoalId
      )[0];
      if (existingGoal) {
        setGoal(existingGoal);
        if (setSelectedGoal && typeof setSelectedGoal == "function")
          setSelectedGoal(existingGoal);
      } else {
        setGoal(clientGoals[0]);
        if (setSelectedGoal && typeof setSelectedGoal == "function")
          setSelectedGoal(clientGoals[0]);
      }
    } else if (clientGoals.length && !selectedGoalId) {
      setGoal(clientGoals[0]);
      if (setSelectedGoal && typeof setSelectedGoal == "function")
        setSelectedGoal(clientGoals[0]);
    }
  }, [clientGoals, selectedGoalId]);

  const value = clientGoals.filter((x) => x.goalStatus === "FINISHED").length,
    total = clientGoals.length;

  const handleChange = (e) => {
    setGoal(e?.target?.value);
    if (setSelectedGoal && typeof setSelectedGoal == "function") {
      setSelectedGoal(e?.target?.value);
    }
  };

  if (clientGoals.length < 1) return <></>;

  return (
    <div className="goalSummary">
      <div className="goalSummary__summary">
        <CssTextField
          select
          className="selectGoal"
          value={goal}
          onChange={handleChange}
          variant="standard"
        >
          {clientGoals.map((goalEle) => (
            <MenuItem key={goalEle.goalId} value={goalEle}>
              {truncateString(goalEle.goalTittle)}
            </MenuItem>
          ))}
        </CssTextField>
        {goal && goal.goalStatus && (
          <>
            <p className="selectGoal__stage">
              {GOAL_STATUSES[goal.goalStatus].title}
            </p>
            <BorderLinearProgress
              variant="determinate"
              value={GOAL_STATUSES[goal.goalStatus].value}
            />
          </>
        )}
      </div>

      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={(value / total) * 100}
          total={total}
          size={70}
          sx={{ color: "#415d32" }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${value} / ${total}`}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default GoalSummary;
