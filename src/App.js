import "./App.css";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import ChatPage from "./components/ChatPage";


import { GoogleOAuthProvider } from "@react-oauth/google"



function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Search" element={<Search />} />

      </Routes>
    </div>
  )
}

export default App;
