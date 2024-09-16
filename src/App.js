import "./App.css";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import ChatPage from "./components/ChatPage";
import Vee from "./components/Vee";



function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/vee" element={<Vee />} />
      </Routes>
    </div>
  );
}

export default App;
