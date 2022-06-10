import React from "react";
import Home from "./Home";
import Games from "./Games";
import Searched from "./Searched";
import GameInfo from "./GameInfo";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/gameFi-app/" element={<Home />} />
        <Route path="/games/:type" element={<Games />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/gameinfo/:name" element={<GameInfo />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
