import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Paper from "@mui/material/Paper";

// Styles
import "../../styles/app.scss";

// Components
import About from "../About";
import { Counter } from "../Test/counter";
import Header from "../Header/header";
import Footer from "../Footer/footer";

const App = () => {
  return (
    <div className="app">
      {/* <Paper className="app__title">NetWorthy-App</Paper> */}
      {/* <Counter /> */}
      <Header />
      <Footer />
      <br />
      <Router>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
