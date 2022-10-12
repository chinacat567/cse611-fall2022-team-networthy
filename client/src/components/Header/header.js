import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import logo from "../../assests/Images/NWlogo.webp";
import landingImg from "../../assests/Images/NWlanding.webp";

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div style={{ float: "left", paddingTop: "20px" }}>
        {/* <img style={{ height: "80px" }} src={logo} alt="Logo" /> */}
        <Avatar
          style={{ float: "left", height: "60px", width: "60px" }}
          alt="Logo"
          src={logo}
        />
        <div
          style={{ float: "right", paddingBottom: "0px", paddingLeft: "20px" }}
        >
          <span className="font-link"> NETWORTHY</span>
        </div>
      </div>
      <div style={{ float: "right" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab
            style={{ paddingRight: "100px" }}
            icon={<HomeIcon />}
            label="Home"
          />
          <Tab
            style={{ paddingRight: "100px" }}
            icon={<InfoIcon />}
            label="About"
          />
          <Tab
            style={{ paddingRight: "20px" }}
            icon={<LoginIcon />}
            label="Login"
          />
        </Tabs>
      </div>

      <div style={{ paddingTop: "180px", paddingLeft: "40px" }}>
        <Card sx={{ maxWidth: 600, minHeight: 400 }}>
          <CardMedia
            component="img"
            height="350"
            src={landingImg}
            alt="NWlanding"
          />
          <CardContent>
            <Typography
              textAlign="center"
              gutterBottom
              variant="body1"
              component="div"
            >
              Making Personal Finance
            </Typography>
            <Typography
              textAlign="center"
              gutterBottom
              variant="body1"
              component="div"
            >
              Personal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are a University at Buffalo Startup dedicated to helping young
              alumni achieve financial wellness. We forge close relationships
              with our clients and work with them throughout their journey
              towards achieving financial freedom.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
