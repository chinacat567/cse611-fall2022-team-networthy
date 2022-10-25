import { Box, MenuItem, TextField, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

import "../../styles/dashboardGoal.scss";

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

const goals = [
  {
    value: "Goal A",
    label: "Goal A",
  },
  {
    value: "Goal B",
    label: "Goal B",
  },
  {
    value: "Goal C",
    label: "Goal C",
  },
  {
    value: "Goal D",
    label: "Goal D",
  },
];

const DashboardGoal = () => {
  const [goal, setGoal] = useState(goals[0].value);
  const value = 7,
    total = 10;

  const handleChange = (e) => {
    setGoal(e?.target?.value);
  };

  return (
    <div className="dashboardGoal">
      <div className="dashboardGoal__summary">
        <CssTextField
          select
          className="selectGoal"
          value={goal}
          onChange={handleChange}
          variant="standard"
        >
          {goals.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CssTextField>
        <p className="selectGoal__stage">In Progress</p>
        <BorderLinearProgress variant="determinate" value={50} />
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

export default DashboardGoal;
