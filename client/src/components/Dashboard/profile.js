import { Drawer } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

import BoyIcon from "../../assets/Icons/boy.png";
import GirlIcon from "../../assets/Icons/girl.png";
import UserIcon from "../../assets/Icons/user.png";

import { ROUTES } from "../App/routeConfig";

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

const truncateString = (str) => {
  if (str.length > 200) {
    return str.substring(0, 200) + "...";
  }
  return str;
};

const Profile = ({ user, isClient }) => {
  const userProfile = isClient ? user.clientProfile : user.coachProfile;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const Icon = getIcon(userProfile.gender);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const onEditClick = () => {
    let url = isClient
      ? ROUTES.CLIENT_PROFILE_SURVEY
      : ROUTES.COACH_PROFILE_SURVEY;
    window.location.href = "/" + url;
  };

  return (
    <div className="profileCard">
      <img src={Icon} className="profileCard__icon" />
      <div className="profileCard__details">
        <p className="profileCard__details--large">
          Hi {userProfile.firstName}!
        </p>
        {isClient && (
          <p className="profileCard__details--medium">
            Financial Literacy Level - {userProfile.financialLevel}
          </p>
        )}
        <p className="profileCard__details--small">
          {truncateString(userProfile.general)}
        </p>
        <p
          className="profileCard__details--small profileCard__details--link"
          onClick={toggleDrawer(true)}
        >
          View Profile
        </p>
      </div>
      <Drawer anchor={"left"} open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="profileCard__drawer drawer">
          <EditIcon className="drawer__editIcon" onClick={onEditClick} />
          <img src={Icon} className="drawer__icon drawer__icon--large" />
          <p className="drawer__details--large">
            {userProfile.firstName + " " + userProfile.lastName}
          </p>
          <p className="drawer__details--medium">{userProfile.emailId}</p>
          <p className="drawer__details--small">{userProfile.occupation}</p>
          <br />
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Username</p>
            <p className="drawer__specificDetails--value">
              {userProfile.username}
            </p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Date of Birth</p>
            <p className="drawer__specificDetails--value">
              {userProfile.dateOfBirth}
            </p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Gender</p>
            <p className="drawer__specificDetails--value">
              {userProfile.gender}
            </p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Education</p>
            <p className="drawer__specificDetails--value">
              {userProfile.education}
            </p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">University</p>
            <p className="drawer__specificDetails--value">
              {userProfile.university}
            </p>
          </div>
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">Location</p>
            <p className="drawer__specificDetails--value">
              {userProfile.location}
            </p>
          </div>
          {isClient && (
            <>
              <div className="drawer__specificDetails">
                <p className="drawer__specificDetails--label">
                  Financial Level
                </p>
                <p className="drawer__specificDetails--value">
                  {userProfile.financialLevel}
                </p>
              </div>
              <div className="drawer__specificDetails">
                <p className="drawer__specificDetails--label">
                  Learning Method
                </p>
                <p className="drawer__specificDetails--value">
                  {userProfile.learningMethod}
                </p>
              </div>
              <div className="drawer__specificDetails">
                <p className="drawer__specificDetails--label">Income</p>
                <p className="drawer__specificDetails--value">
                  {userProfile.income}
                </p>
              </div>
              <div className="drawer__specificDetails">
                <p className="drawer__specificDetails--label">Debt</p>
                <p className="drawer__specificDetails--value">
                  {userProfile.debt}
                </p>
              </div>
            </>
          )}
          <div className="drawer__specificDetails">
            <p className="drawer__specificDetails--label">What is your why?</p>
            <p className="drawer__specificDetails--value">
              {userProfile.general}
            </p>
          </div>
          {!isClient && (
            <div className="drawer__specificDetails">
              <p className="drawer__specificDetails--label">Credentials</p>
              <p className="drawer__specificDetails--value">
                {userProfile.credentials}
              </p>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Profile;
