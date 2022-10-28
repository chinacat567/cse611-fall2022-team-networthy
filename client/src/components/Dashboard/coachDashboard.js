import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import "../../styles/dashboard.scss";
import Profile from "./profile";

const TABS = {
  clients: "Your Clients",
};

const getTabFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params.entries()) {
    if (key === "tab") return value;
  }
  return "";
};

const CoachDashboard = ({ user }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(getTabFromURL());

  useEffect(() => {
    if (!tab) {
      setSearchParams({ tab: "clients" });
      setTab("clients");
    }
    if (user.username) {
      //   dispatch(getAllClientGoals({ username: user.username }));
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__userCenter">
        <Profile user={user} isClient={false} />
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
      <div className="dashboard__content"></div>
    </div>
  );
};

export default CoachDashboard;
