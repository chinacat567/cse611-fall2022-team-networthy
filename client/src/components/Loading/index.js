import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        opacity: 0.7,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
};

export default Loader;
