import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClientGoals,
  updateGoalStatus,
} from "../../redux/slices/goalSlice";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import "../../styles/goalDashboard.scss";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const GoalDashboard = ({ username }) => {
  const [selectedGoal, setSelectedGoal] = useState({});
  const dispatch = useDispatch();
  const clientGoals = useSelector((state) => state?.goal?.goalList);

  useEffect(() => {
    if (clientGoals.length) {
      setSelectedGoal(clientGoals[4]);
    }
  }, [clientGoals]);

  return (
    <div className="goalDashboard">
      <div className="goalDashboard__goalList">
        {!!clientGoals.length &&
          clientGoals.map((goal) => (
            <div
              key={goal.goalId}
              className={`goalTab ${
                selectedGoal.goalId === goal.goalId && "goalTab--selected"
              }`}
              onClick={() => {
                setSelectedGoal(goal);
              }}
            >
              <BookmarkIcon className="icon" />
              {goal.goalTittle}
            </div>
          ))}
        <Button
          className="addGoalBtn"
          variant="contained"
          disabled={false}
          sx={{ width: 200 }}
        >
          Add Goal
        </Button>
      </div>
      {!!selectedGoal?.goalId && (
        <div className="goalDashboard__goalContent goalContent">
          <div className="goalContent__header">
            <div style={{ display: "flex" }}>
              <h2 style={{ flexGrow: "1" }}>{selectedGoal.goalTittle}</h2>
              <FormControl sx={{ width: "200px" }}>
                <InputLabel id="goal-status">Status</InputLabel>
                <Select
                  labelId="goal-status"
                  value={selectedGoal.goalStatus}
                  label="Status"
                  onChange={(e) => {
                    dispatch(
                      updateGoalStatus({
                        clientId: username,
                        goalId: selectedGoal.goalId,
                        updatedStatus: e.target.value,
                      })
                    );
                  }}
                >
                  <MenuItem value={"NOT_STARTED"}>Not Started</MenuItem>
                  <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                  <MenuItem value={"IN_REVIEW"}>In Review</MenuItem>
                  <MenuItem value={"FINISHED"} disabled>
                    Finished
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            {selectedGoal.goalTags?.map((tag) => (
              <Chip label={tag} key={tag} style={{ marginRight: "5px" }} />
            ))}
            <p style={{ marginTop: "12px" }}>{selectedGoal.goalDescription}</p>
          </div>
          <div className="goalContent__details">
            <div className="goalContent__smart">
              <div className="smartTag">
                <div>Specific</div>
              </div>
              <p>{selectedGoal.goalSpecific}</p>
            </div>
            <div className="goalContent__smart">
              <div className="smartTag">
                <div>Measurable</div>
              </div>
              <p>{selectedGoal.goalMeasurable}</p>
            </div>
            <div className="goalContent__smart">
              <div className="smartTag">
                <div>Attainable</div>
              </div>
              <p>{selectedGoal.goalAttainable}</p>
            </div>
            <div className="goalContent__smart">
              <div className="smartTag">
                <div>Relevant</div>
              </div>
              <p>{selectedGoal.goalRelevant}</p>
            </div>
            <div className="goalContent__smart">
              <div className="smartTag">
                <div>Time Based</div>
              </div>
              <p>{selectedGoal.goalTimeBased}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalDashboard;
