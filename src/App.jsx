import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Page from "./components/Page";
import Signup from "./components/Signup";
import Intro from "./components/Intro";
import Main from "./components/Main";
import Slide from "./components/Slide";
import Talent from "./components/Talent";
import Pr from "./components/Pr";
import Work from "./components/Work";
import Last from "./components/Last";
import Profile from "./components/Profile";
import MyJobs from "./components/Myjobs";
import Events from "./components/Events";
import Ef from "./components/Ef";
import Ab from "./components/Ab";
import LiveChat from "./components/LiveChat";

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<>
            <Intro />
            <Slide />
            <Main />
            <Last />
           
          </>} />
          <Route path="/page" element={<Page />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/talent" element={<Talent />} />
          <Route path="/work" element={<Work />} />
          <Route path="/edit" element={<Pr />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/temp" element={<MyJobs />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/form" element={<Ef />} />
          <Route path="/Ab" element={<Ab />} />
          <Route path="/login" element={<Page />} />
          <Route path="/livechat" element={<LiveChat />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
