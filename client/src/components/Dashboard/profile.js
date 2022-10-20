import { Drawer } from "@mui/material";
import React, { useState } from "react";
import BoyIcon from "../../assets/Icons/boy.png";
import GirlIcon from "../../assets/Icons/girl.png";
import UserIcon from "../../assets/Icons/user.png";

import "../../styles/profileCard.scss";

const getIcon = (gender) => {
  switch (gender) {
    case "Male":
      return BoyIcon;
    case "Female":
      return GirlIcon;
    default:
      return UserIcon;
  }
};

const Profile = ({
  user: {
    clientProfile: {
      gender,
      firstName,
      lastName,
      emailId,
      occupation,
      username,
      dateOfBirth,
      education,
      university,
      location,
      financialLevel,
      learningMethod,
      income,
      debt,
      general,
    },
  },
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const Icon = getIcon(gender);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div className="profileCard">
      <img src={Icon} className="profileCard__icon" />
      <div className="profileCard__details">
        <p className="profileCard__details--large">
          {firstName + " " + lastName}
        </p>
        <p className="profileCard__details--medium">{emailId}</p>
        <p className="profileCard__details--small">{occupation}</p>
        <p
          className="profileCard__details--small profileCard__details--link"
          onClick={toggleDrawer(true)}
        >
          View Profile
        </p>
      </div>
      <Drawer anchor={"left"} open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="profileCard__drawer drawer">
          <img src={Icon} className="drawer__icon drawer__icon--large" />
          <p className="drawer__details--large">{firstName + " " + lastName}</p>
          <p className="drawer__details--medium">{emailId}</p>
          <p className="drawer__details--small">{occupation}</p>
          <br />
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Username</p>
            <p className="drawer__specificDetails--value">{username}</p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Date of Birth</p>
            <p className="drawer__specificDetails--value">{dateOfBirth}</p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Gender</p>
            <p className="drawer__specificDetails--value">{gender}</p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Education</p>
            <p className="drawer__specificDetails--value">{education}</p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">University</p>
            <p className="drawer__specificDetails--value">{university}</p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Location</p>
            <p className="drawer__specificDetails--value">{location}</p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Financial Level</p>
            <p className="drawer__specificDetails--value">{financialLevel}</p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Learning Method</p>
            <p className="drawer__specificDetails--value">{learningMethod}</p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Income</p>
            <p className="drawer__specificDetails--value">{income}</p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Debt</p>
            <p className="drawer__specificDetails--value">{debt}</p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Other</p>
            <p className="drawer__specificDetails--value">{general}</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Profile;
