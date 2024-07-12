import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameLayout from "./pages/GameLayout";
import GameOne from "./pages/GameOne";
import GameTwo from "./pages/GameTwo";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes path="/">
        <Route index element={<GameLayout />} />
        <Route path="gameOne" element={<GameOne />} />
        <Route path="gameTwo" element={<GameTwo />} />
      </Routes>
    </Router>
  );
}

export default App;
