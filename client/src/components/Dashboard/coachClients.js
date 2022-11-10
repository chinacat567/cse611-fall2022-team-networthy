import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";

import {
  getAllClientGoals,
  updateGoalStatus,
} from "../../redux/slices/goalSlice";

import GoalSummary from "./goalSummary";

import "../../styles/coachClients.scss";
import Comments from "../Comments";

const CoachClients = ({
  username,
  profileStatus,
  selectedClientId,
  setSelectedClientId,
}) => {
  const [selectedClient, setSelectedClient] = useState({});
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const coachClients = useSelector((state) => state?.coach?.coachClients);

  useEffect(() => {
    if (coachClients.length) {
      let existingClient = coachClients?.filter(
        (x) => x?.username == selectedClientId
      )[0];
      if (existingClient) {
        setSelectedClient(existingClient);
        dispatch(getAllClientGoals({ username: existingClient?.username }));
      } else {
        setSelectedClient(coachClients[0]);
        setSelectedClientId(coachClients[0]?.username);
        dispatch(getAllClientGoals({ username: coachClients[0]?.username }));
      }
    }
  }, [coachClients]);

  const onClientClick = (client) => {
    setSelectedClientId(client?.username);
    setSelectedClient(client);
    dispatch(getAllClientGoals({ username: client?.username }));
  };

  return (
    <div className="coachClients">
      <div className="coachClients__clientList">
        {coachClients.length ? (
          coachClients.map((client) => (
            <div
              key={client.username}
              className={`clientTab ${
                selectedClient?.username === client.username &&
                "clientTab--selected"
              }`}
              onClick={() => onClientClick(client)}
            >
              <PermIdentityIcon className="icon" />
              {client?.firstName + " " + client?.lastName}
            </div>
          ))
        ) : (
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            {profileStatus === false ? (
              <p>Profile sent for admin approval.</p>
            ) : profileStatus === true ? (
              <>
                <p>Profile approved by admin.</p>
                <p>You don't have any clients as of now!</p>
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </div>

      {!!selectedClient?.username && (
        <div className="coachClients__clientContent">
          {showComments && (
            <Comments
              clientId={selectedClient.username}
              isOpen={showComments}
              onClose={() => {
                setShowComments(false);
              }}
              goal={selectedGoal ?? {}}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "40px",
              marginTop: "32px",
            }}
          >
            <GoalSummary
              selectedGoalId={null}
              setSelectedGoal={(goal) => {
                setSelectedGoal(goal);
              }}
            />
          </div>

          {!!selectedGoal?.goalId && (
            <div className="clientGoalContent">
              <div className="clientGoalContent__header">
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
                            clientId: selectedClient?.username,
                            goalId: selectedGoal.goalId,
                            updatedStatus: e.target.value,
                          })
                        );
                      }}
                    >
                      <MenuItem value={"NOT_STARTED"}>Not Started</MenuItem>
                      <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                      <MenuItem value={"IN_REVIEW"}>In Review</MenuItem>
                      <MenuItem value={"FINISHED"}>Finished</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {selectedGoal.goalTags?.map((tag) => (
                  <Chip label={tag} key={tag} style={{ marginRight: "5px" }} />
                ))}
                <p style={{ marginTop: "12px" }}>
                  {selectedGoal.goalDescription}
                </p>
                <Button
                  type="button"
                  className="showCommentsBtn"
                  variant="outlined"
                  sx={{ width: 200, marginTop: "20px" }}
                  onClick={() => {
                    setShowComments(true);
                  }}
                >
                  Add / View Comments
                </Button>
              </div>
              <div className="clientGoalContent__details">
                <div className="clientGoalContent__smart">
                  <div className="smartTag">
                    <div>Specific</div>
                  </div>
                  <p>{selectedGoal.goalSpecific}</p>
                </div>
                <div className="clientGoalContent__smart">
                  <div className="smartTag">
                    <div>Measurable</div>
                  </div>
                  <p>{selectedGoal.goalMeasurable}</p>
                </div>
                <div className="clientGoalContent__smart">
                  <div className="smartTag">
                    <div>Attainable</div>
                  </div>
                  <p>{selectedGoal.goalAttainable}</p>
                </div>
                <div className="clientGoalContent__smart">
                  <div className="smartTag">
                    <div>Relevant</div>
                  </div>
                  <p>{selectedGoal.goalRelevant}</p>
                </div>
                <div className="clientGoalContent__smart">
                  <div className="smartTag">
                    <div>Time Based</div>
                  </div>
                  <p>{selectedGoal.goalTimeBased}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoachClients;
