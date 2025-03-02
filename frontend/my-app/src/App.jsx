import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar component

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import "./styles/App.css";
import AddRecipe from "./components/AddRecipe";
import RecipesList from "./components/RecipesList";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <Router>
      <Navbar />{/* Render the Navbar component */}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} /> {/* New Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<><AddRecipe /><RecipesList /></>} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
