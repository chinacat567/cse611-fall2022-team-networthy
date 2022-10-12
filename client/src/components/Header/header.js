import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import logo from "../../assests/Images/NWlogo.webp";

import "../../styles/header.scss";

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(event);
    setValue(newValue);
  };

  React.useEffect(() => {
    console.log(value);
  }, [value]);

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
          <Tab label="Login" />
        </Tabs>
      </div>
    </div>
  );
}
