import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import logo from "../../assests/Images/NWlogo.webp";

import "../../styles/header.scss";
import { ROUTES } from "../App/routeConfig";

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(
    parseInt(localStorage.getItem("TAB"))
  );

  const handleChange = (event, newValue) => {
    localStorage.setItem("TAB", newValue);
    if (newValue == 1) window.location.href = ROUTES.ABOUT;
    if (newValue == 0) window.location.href = ROUTES.HOME;
  };

  return (
    <div className="header">
      <div className="header__left">
        <img src={logo} className="logo" />
        <div className="header__title"> NetWorthy</div>
      </div>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab label="Home" />
          <Tab label="About" />
        </Tabs>
      </div>
    </div>
  );
}
