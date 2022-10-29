import React, { useEffect, useState } from "react";

import GoalSummary from "./goalSummary";
import Profile from "./profile";

import "../../styles/dashboard.scss";
import { useSearchParams } from "react-router-dom";
import GoalDashboard from "./goalDashboard";
import { getAllClientGoals } from "../../redux/slices/goalSlice";
import { useDispatch, useSelector } from "react-redux";
import ClientCoach from "./clientCoach";

const TABS = {
  goals: "Goal Updates",
  content: "Personalised Content",
  coaches: "View Coaches",
};

const getKeyFromURL = (iKey) => {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params.entries()) {
    if (key === iKey) return value;
  }
  return "";
};

const Dashboard = ({ user }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(getKeyFromURL("tab"));
  const [selectedGoalId, setSelectedGoalId] = useState(getKeyFromURL("goalId"));

  useEffect(() => {
    if (!tab) {
      setTab("goals");
    }
    if (user.username) {
      dispatch(getAllClientGoals({ username: user.username }));
    }
  }, []);

  useEffect(() => {
    if (selectedGoalId) {
      setSearchParams({
        tab: "goals",
        goalId: selectedGoalId,
      });
    }
  }, [selectedGoalId]);

  return (
    <div className="dashboard">
      <div className="dashboard__userCenter">
        <Profile user={user} isClient={true} />
        <GoalSummary selectedGoalId={selectedGoalId} />
      </div>
      <div className="dashboard__tabs">
        {Object.entries(TABS).map(([k, v]) => (
          <div
            key={k}
            onClick={() => {
              setSearchParams({ tab: k });
              setTab(k);
            }}
            className={`tab ${k === tab && "tab--selected"}`}
          >
            {v}
          </div>
        ))}
      </div>
      <div className="dashboard__content">
        {tab === "goals" && (
          <GoalDashboard
            username={user?.username || ""}
            selectedGoalId={selectedGoalId}
            setSelectedGoalId={(goalId) => {
              setSelectedGoalId(goalId);
            }}
          />
        )}
        {tab === "coaches" && <ClientCoach username={user?.username || ""} />}
      </div>
    </div>
  );
};

export default Dashboard;
