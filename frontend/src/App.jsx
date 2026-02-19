import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home.jsx/Home";
import ClubDetails from "./pages/ClubDetails/ClubDetails";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Home Page */}
          <Route  path="/" element={<Home />} />
          
          {/* Club Details Page */}
          <Route path="/clubs/:id" element={<ClubDetails />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

