import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientGoals } from "../../redux/slices/goalSlice";

import "../../styles/goalDashboard.scss";

const GoalDashboard = ({ username }) => {
  const dispatch = useDispatch();
  const clientGoals = useSelector((state) => state?.goal?.goalList);

  console.log(username);

  useEffect(() => {
    if (username) {
      dispatch(getAllClientGoals({ username }));
    }
  }, []);

  console.log("CLIENT GOALS");
  console.log(clientGoals);

  return (
    <div className="goalDashboard">
      <div className="goalDashboard__goalList"></div>
    </div>
  );
};

export default GoalDashboard;
