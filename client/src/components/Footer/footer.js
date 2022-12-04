import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TikTokIcon from "../../assets/Icons/tiktok.svg";

import "../../styles/footer.scss";
import { Link } from "@mui/material";

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
          <span>seth.goally@gmail.com</span>
        </div>
      </div>

      <div className="footer__center">&copy; 2022 By Goally</div>

      <div className="footer__right">
        <Link href="https://www.instagram.com/goallyfinance/" target="_blank">
          <InstagramIcon className="socialIcon" />
        </Link>
        <Link
          href="https://www.tiktok.com/@goallyfinance?lang=en"
          target="_blank"
        >
          <img src={TikTokIcon} className="socialIcon" color="blue" />
        </Link>
        <Link
          href="https://www.youtube.com/channel/UCghUWvKFkF4ODVSlWiYqp3Q"
          target="_blank"
        >
          <YouTubeIcon className="socialIcon" />
        </Link>
        <Link href="https://twitter.com/GoallyFinance" target="_blank">
          <TwitterIcon className="socialIcon" />
        </Link>
        <Link href="#">
          <LinkedInIcon className="socialIcon" />
        </Link>
      </div>
    </footer>
  );
}
