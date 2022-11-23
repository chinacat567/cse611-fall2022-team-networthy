import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NWBack from "../../assets/Images/NWBack.png";

import "../../styles/home.scss";

const Home = ({ authWizard }) => {
  return (
    <div className="home">
      <Card sx={{ maxWidth: 600, minHeight: 400 }} className="home__card">
        <CardMedia
          component="img"
          height="400"
          src={NWBack}
          alt="NWlanding"
          sx={{ transform: "scale(0.8)" }}
        />
        <CardContent>
          <Typography
            textAlign="center"
            gutterBottom
            fontWeight={500}
            component="div"
            marginTop={"16px"}
            marginBottom={"24px"}
          >
            Stop dreaming about financial freedom and start living it!
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign={"center"}
            fontSize={"15px"}
          >
            We are on a mission to help GenZ achieve its financial goals.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign={"center"}
            fontSize={"15px"}
            marginTop={"8px"}
          >
            Most people have a vision but don’t possess the financial education,
            guidance, or accountability needed to achieve it. Goally Coaches can
            help you achieve your most ambitious goals now.
          </Typography>
        </CardContent>
      </Card>
      {authWizard}
    </div>
  );
};

export default Home;
