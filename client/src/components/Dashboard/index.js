import React from "react";

import DashboardGoal from "./dashboardGoal";

import "../../styles/dashboard.scss";
import Profile from "./profile";
import { useSelector } from "react-redux";

const Dashboard = ({ role }) => {
  const { user } = useSelector((state) => state?.auth);

  return (
    <div className="dashboard">
      <div className="dashboard__userCenter">
        {user && <Profile user={user} />}
        <DashboardGoal />
      </div>
    </div>
  );
};

export default Dashboard;
