import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameLayout from "./pages/GameLayout";
import GameOne from "./pages/GameOne";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes path="/">
        <Route index element={<GameLayout />} />
        <Route path="gameOne" element={<GameOne />} />
      </Routes>
    </Router>
  );
}

export default App;
