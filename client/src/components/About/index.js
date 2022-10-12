import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import aboutImg from "../../assests/Images/NWabout.webp";

const About = () => {
  return (
    <div className="home">
      <Card sx={{ maxWidth: 800, minHeight: 700 }}>
        <CardMedia component="img" height="450" src={aboutImg} alt="NWabout" />
        <CardContent>
          <Typography
            textAlign="center"
            gutterBottom
            variant="h4"
            component="div"
          >
            Who We Are
          </Typography>
          <br></br>
          <Typography variant="body2" color="text.secondary">
            We are a University at Buffalo Startup dedicated to helping young
            alumni achieve financial wellness. We forge close relationships with
            our clients and work with them throughout their journey towards
            achieving financial freedom.
          </Typography>
          <br></br>
          <Typography variant="body2" color="text.secondary">
            At NetWorthy we help young alumni begin their journey towards
            achieving financial wellness. Our clients receive personalized
            coaching and engaging content. Our mission is to educate and empower
            the next generation through financial literacy
          </Typography>
        </CardContent>
        <CardActions></CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Connect</Button>
      </Card>
    </div>
  );
};

export default About;
