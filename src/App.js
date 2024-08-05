import "./App.css";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import ChatPage from "./components/ChatPage";
import Vee from "./components/Vee";


function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/vee" element={<Vee />} />
      </Routes>
    </div>
  );
}

export default App;
