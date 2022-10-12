import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import "../../styles/footer.scss";

export default function App() {
  return (
    <footer class="footer-distributed">
      <div class="footer-right">
        <Tabs>
          <Tab icon={<FacebookRoundedIcon />}></Tab>
          <Tab icon={<LinkedInIcon />}></Tab>
          <Tab icon={<TwitterIcon />}></Tab>
          <Tab icon={<InstagramIcon />}></Tab>
        </Tabs>
      </div>

      <div class="footer-left">
        <Tabs>
          <Tab icon={<LocationOnIcon />} label="Company Address"></Tab>

          <Tab icon={<PhoneIcon />} label="(716)-481-4091"></Tab>
          <Tab icon={<MarkunreadIcon />} label="siblum@buffalo.edu"></Tab>
        </Tabs>
      </div>
    </footer>
  );
}
