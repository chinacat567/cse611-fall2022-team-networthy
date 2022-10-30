import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { PopupButton } from "react-calendly";

import {
  assignCoach,
  getAllCoaches,
  getAssignedCoach,
} from "../../redux/slices/coachSlice";

import BoyIcon from "../../assets/Icons/boy.png";
import GirlIcon from "../../assets/Icons/girl.png";
import UserIcon from "../../assets/Icons/user.png";

import "../../styles/clientCoach.scss";

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

const ClientCoach = ({ username }) => {
  const dispatch = useDispatch();
  const { allCoaches, assignedCoach } = useSelector((state) => state?.coach);

  useEffect(() => {
    dispatch(getAllCoaches());
    dispatch(getAssignedCoach({ clientUserName: username }));
  }, []);

  const onAssignCoach = (coach) => {
    console.log(coach);
    dispatch(
      assignCoach({
        newCoach: coach,
        assignedCoach,
        clientUserName: username,
      })
    );
  };

  return (
    <div className="clientCoach">
      <div className="clientCoach__assignedCoach">
        <div>
          <img src={getIcon(assignedCoach?.gender)} className="pic" />
          <p className="coachName">
            {assignedCoach.firstName
              ? assignedCoach?.firstName + " " + assignedCoach?.lastName
              : "Start by assigning a coach!"}
          </p>
          {assignedCoach.firstName && (
            <>
              <p className="details">{assignedCoach?.credentials}</p>
              <p className="details details--m">
                <LocationOnIcon fontSize="small" />
                {assignedCoach?.location}
              </p>
              <PopupButton
                url="https://calendly.com/rahulsharma24/15min"
                rootElement={document.getElementById("root")}
                text="Schedule Meet"
                className="calendlyBtn"
              />
            </>
          )}
        </div>
      </div>
      <div className="clientCoach__allCoaches">
        <h3>Coaches</h3>
        {allCoaches &&
          allCoaches?.map((coach, index) => {
            if (coach?.username === assignedCoach?.username) return <></>;
            return (
              <div className="individualCoach" key={index}>
                <div className="individualCoach__details">
                  <p className="name">
                    {coach?.firstName + " " + coach?.lastName}
                  </p>
                  <p className="detail">{coach?.occupation}</p>
                  <p className="detail detail--mbelow">{coach?.credentials}</p>
                  <div className="coachActionPanel">
                    <p className="detail">
                      <LocationOnIcon fontSize="small" />
                      {coach?.location}
                    </p>
                    <Button
                      type="button"
                      className="btn"
                      variant="contained"
                      color="inherit"
                      size="small"
                      onClick={() => onAssignCoach(coach)}
                    >
                      Assign Coach
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ClientCoach;
