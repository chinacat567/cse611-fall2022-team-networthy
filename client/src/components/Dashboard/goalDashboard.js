import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGoalStatus } from "../../redux/slices/goalSlice";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { ROUTES } from "../App/routeConfig";

import "../../styles/goalDashboard.scss";

const GoalDashboard = ({ username, selectedGoalId, setSelectedGoalId }) => {
  const [selectedGoal, setSelectedGoal] = useState({});
  const dispatch = useDispatch();
  const clientGoals = useSelector((state) => state?.goal?.goalList);

  useEffect(() => {
    if (clientGoals.length) {
      let existingGoal = clientGoals?.filter(
        (x) => x?.goalId == selectedGoalId
      )[0];
      if (existingGoal) {
        setSelectedGoal(existingGoal);
      } else {
        setSelectedGoal(clientGoals[0]);
        setSelectedGoalId(clientGoals[0]?.goalId);
      }
    }
  }, [clientGoals]);

  const onGoalClick = (goal) => {
    setSelectedGoalId(goal?.goalId);
    setSelectedGoal(goal);
  };

  const onEditClick = () => {
    localStorage.setItem("EDIT_GOAL", JSON.stringify(selectedGoal));
    window.location.href = "/" + ROUTES.ADD_GOAL;
  };

  return (
    <div className="goalDashboard">
      <div className="goalDashboard__goalList">
        {clientGoals &&
          clientGoals.map((goal) => (
            <div
              key={goal.goalId}
              className={`goalTab ${
                selectedGoal?.goalId === goal.goalId && "goalTab--selected"
              }`}
              onClick={() => onGoalClick(goal)}
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
          onClick={() => {
            localStorage.removeItem("EDIT_GOAL");
            window.location.href = "/" + ROUTES.ADD_GOAL;
          }}
        >
          Add Goal
        </Button>
      </div>
      {!!selectedGoal?.goalId && (
        <div className="goalDashboard__goalContent goalContent">
          <div className="goalContent__header">
            <div style={{ display: "flex" }}>
              <h2 style={{ flexGrow: "1" }}>
                {selectedGoal.goalTittle}{" "}
                <EditIcon
                  className="editIcon"
                  onClick={onEditClick}
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                />
              </h2>
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
