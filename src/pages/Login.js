import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/auth.css";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await loginUser(formData.email, formData.password);
    
            console.log("Received Response:", response); 
    
            if (response && response.status === 200 && response.data) {
                const { token, user } = response.data.data; 
                
                console.log("Extracted Token:", token);
                console.log("Extracted User:", user);
    
                if (token && user) {
                    toast.success("Login successful! Redirecting...", { autoClose: 2000 });
    
                    login(token, user); 
    
                    setTimeout(() => {
                        toast.dismiss();
                        navigate("/dashboard");
                    }, 2000);
                } else {
                    toast.error("Unexpected response format. Please try again.");
                }
            } else {
                toast.error("Login failed! Please check your credentials.");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid credentials! Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
};

export default Login;
