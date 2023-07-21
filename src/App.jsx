import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/projects" element={<ProjectListPage />} /> */}
        {/* <Route path="/projects/:projectId" element={<ProjectDetailsPage />} /> */}
        {/* <Route path="/projects/edit/:projectId" element={<EditProjectPage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
