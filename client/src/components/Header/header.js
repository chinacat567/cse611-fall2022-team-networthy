import { Menu, MenuItem } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../../assets/Images/NWlogo.webp";
import authService from "../../services/authService";

import "../../styles/header.scss";

import { ROUTES } from "../App/routeConfig";
import { ROLE_CONFIG } from "../AuthWizard/config";

export default function IconLabelTabs() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="header">
      <div className="header__left">
        <img src={logo} className="logo" />
        <div
          className="header__title"
          onClick={() => (window.location.href = ROUTES.HOME)}
        >
          NetWorthy
        </div>
      </div>
      <div className="header__nav">
        {user ? (
          <>
            {user?.roles[0]?.includes(ROLE_CONFIG.CLIENT) && (
              <Link
                className="navLink"
                to={{ pathname: ROUTES.CLIENT_DASHBOARD }}
              >
                Dashboard
              </Link>
            )}
            {user?.roles[0]?.includes(ROLE_CONFIG.COACH) && (
              <Link
                className="navLink"
                to={{ pathname: ROUTES.COACH_DASHBOARD }}
              >
                Dashboard
              </Link>
            )}
            <Link className="navLink" onClick={authService.logoutService}>
              Logout
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link className="navLink" to={{ pathname: ROUTES.HOME }}>
              Home
            </Link>
            <Link className="navLink" to={{ pathname: ROUTES.ABOUT }}>
              About
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
