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
import CardList from "./components/CardList";
import CardDetails from "./pages/CardDetails";
import Learn from "./components/Learn";
import Practice from "./components/Practice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/projects" element={<ProjectListPage />} /> */}
        {/* <Route path="/projects/:projectId" element={<ProjectDetailsPage />} /> */}
        {/* <Route path="/projects/edit/:projectId" element={<EditProjectPage />} /> */}
        <Route path="/practice" element={<Practice />} />
        <Route path="/learn" element={<Learn />} />
        <Route path={"/users/flashcards/:cardId"} element={<CardDetails />} />
        <Route path={"/users/flashcards"} element={<CardList />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route
          path={"/users/edit/flashcards/:cardId"}
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
