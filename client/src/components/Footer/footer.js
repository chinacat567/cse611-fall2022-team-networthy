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
    <footer className="footer">
      <div className="footer__left">
        <div className="companyInfo">
          <LocationOnIcon className="companyInfo__icon" />
          <span>Company Address</span>
        </div>
        <div className="companyInfo">
          <PhoneIcon className="companyInfo__icon" />
          <span>+1 (716)-481-4091</span>
        </div>
        <div className="companyInfo">
          <MarkunreadIcon className="companyInfo__icon" />
          <span>siblum@buffalo.edu</span>
        </div>
      </div>

      <div className="footer__center">&copy; 2022 By Goally</div>

      <div className="footer__right">
        <FacebookRoundedIcon className="socialIcon" />
        <LinkedInIcon className="socialIcon" />
        <TwitterIcon className="socialIcon" />
        <InstagramIcon className="socialIcon" />
      </div>
    </footer>
  );
}
