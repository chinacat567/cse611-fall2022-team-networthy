import { Menu, MenuItem } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";

import logo from "../../assets/Images/NWlogo.webp";
import authService from "../../services/authService";

import "../../styles/header.scss";

import { ROUTES } from "../App/routeConfig";
import { ROLE_CONFIG } from "../AuthWizard/config";

export default function IconLabelTabs() {
  const { user, isLoggedIn } = useSelector((state) => state?.auth);
  const userRole = localStorage.getItem("USER_ROLE");

  return (
    <div className={`header ${user ? "header--solid" : "header--gradient"}`}>
      <div className="header__left">
        {/* <img src={logo} className="logo" /> */}
        <div className="header__title">
          Goally
          {isLoggedIn && (
            <div className="roleTitle">
              {userRole === ROLE_CONFIG.CLIENT
                ? " Client"
                : userRole === ROLE_CONFIG.COACH
                ? " Coach"
                : userRole === ROLE_CONFIG.ADMIN
                ? " Admin"
                : ""}
            </div>
          )}
        </div>
      </div>
      <div className="header__nav">
        {user ? (
          <>
            {/* {user?.roles[0]?.includes(ROLE_CONFIG.CLIENT) && (
              <>
                {!!user?.clientProfile ? (
                  <Link
                    className="navLink"
                    to={{ pathname: ROUTES.CLIENT_DASHBOARD }}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    className="navLink"
                    to={{ pathname: ROUTES.CLIENT_PROFILE_SURVEY }}
                  >
                    Profile Survey
                  </Link>
                )}
              </>
            )}
            {user?.roles[0]?.includes(ROLE_CONFIG.COACH) && (
              <Link
                className="navLink"
                to={{ pathname: ROUTES.COACH_DASHBOARD }}
              >
                Dashboard
              </Link>
            )} */}
            <Link className="navLink" onClick={authService.logoutService}>
              <Logout fontSize="small" sx={{ marginRight: "10px" }} /> Logout
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
