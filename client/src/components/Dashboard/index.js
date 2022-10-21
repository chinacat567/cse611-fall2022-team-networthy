import React from "react";

import DashboardGoal from "./dashboardGoal";
import Profile from "./profile";

import "../../styles/dashboard.scss";

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <div className="dashboard__userCenter">
        <Profile user={user} />
        <DashboardGoal />
      </div>
    </div>
  );
};

export default Dashboard;
