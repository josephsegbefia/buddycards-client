import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateCard from "./components/CreateCard";
import EditCardPage from "./pages/EditCardPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/projects" element={<ProjectListPage />} /> */}
        {/* <Route path="/projects/:projectId" element={<ProjectDetailsPage />} /> */}
        {/* <Route path="/projects/edit/:projectId" element={<EditProjectPage />} /> */}
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route
          path={"/users/:userId/flashcards/:cardId/edit"}
          element={<EditCardPage />}
        />
        <Route path="/create-card" element={<CreateCard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
