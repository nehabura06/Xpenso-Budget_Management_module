import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";  // Ensure correct case
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import BudgetPage from "./pages/budgetPage";

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    if (token === null) {
        console.warn("No token found, redirecting to login...");
        return <Navigate to="/login" replace />;
    }
    return element;
};
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/budgetPage" element={<ProtectedRoute element={<BudgetPage />} />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
