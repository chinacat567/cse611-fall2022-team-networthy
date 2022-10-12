import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import landingImg from "../../assests/Images/NWlanding.webp";

import "../../styles/home.scss";

const Home = ({ authWizard }) => {
  return (
    <div className="home">
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
            alumni achieve financial wellness. We forge close relationships with
            our clients and work with them throughout their journey towards
            achieving financial freedom.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      {authWizard}
    </div>
  );
};

export default Home;
