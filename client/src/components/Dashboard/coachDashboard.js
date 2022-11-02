import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getAllCoachClients } from "../../redux/slices/coachSlice";

import "../../styles/dashboard.scss";
import CoachClients from "./coachClients";
import Profile from "./profile";

const TABS = {
  clients: "Your Clients",
  // meetingNotes: "Meeting Notes",
};

const getKeyFromURL = (iKey) => {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params.entries()) {
    if (key === iKey) return value;
  }
  return "";
};

const CoachDashboard = ({ user }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(getKeyFromURL("tab"));
  const [selectedClientId, setSelectedClientId] = useState(
    getKeyFromURL("clientId")
  );

  useEffect(() => {
    if (!tab) {
      setTab("clients");
    }
    if (user.username) {
      dispatch(getAllCoachClients({ coachUserName: user.username }));
    }
  }, []);

  useEffect(() => {
    if (selectedClientId) {
      setSearchParams({
        tab: "clients",
        clientId: selectedClientId,
      });
    }
  }, [selectedClientId]);

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
      <div className="dashboard__content">
        {tab === "clients" && (
          <CoachClients
            username={user?.username || ""}
            selectedClientId={selectedClientId}
            setSelectedClientId={(clientId) => {
              setSelectedClientId(clientId);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CoachDashboard;
