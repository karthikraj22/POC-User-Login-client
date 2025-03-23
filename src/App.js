import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AuthContext  from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            {user && <Navbar />}

            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route element={<PrivateRoute />}>
                    <Route 
                        path="/dashboard" 
                        element={user?.role === "admin" ? <AdminDashboard /> : <Dashboard />} 
                    />
                </Route>

                <Route path="*" element={<h2>404 Page Not Found</h2>} />
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} />
        </Router>
    );
};

export default App;
