import React, { useEffect, useState } from "react";

import GoalSummary from "./goalSummary";
import Profile from "./profile";

import "../../styles/dashboard.scss";
import { useSearchParams } from "react-router-dom";
import GoalDashboard from "./goalDashboard";

const TABS = {
  goals: "Goal Updates",
  content: "Personalised Content",
  coaches: "View Coaches",
};

const getTabFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params.entries()) {
    if (key === "tab") return value;
  }
  return "";
};

const Dashboard = ({ user }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(getTabFromURL());

  useEffect(() => {
    if (!tab) {
      setSearchParams({ tab: "goals" });
      setTab("goals");
    }
  }, []);

  console.log(user);

  return (
    <div className="dashboard">
      <div className="dashboard__userCenter">
        <Profile user={user} />
        <GoalSummary />
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
        {tab === "goals" && <GoalDashboard username={user?.username || ""} />}
      </div>
    </div>
  );
};

export default Dashboard;
