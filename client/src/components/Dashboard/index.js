import React from "react";

import DashboardGoal from "./dashboardGoal";

import "../../styles/dashboard.scss";

const Dashboard = ({ role }) => {
  return (
    <div className="dashboard">
      <DashboardGoal />
    </div>
  );
};

export default Dashboard;
