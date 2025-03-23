import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; 

const Dashboard = () => {
    const { user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log(user);
        
        if (!storedUser) {
            navigate("/login");
        } else {
            setLoading(false);
        }
    }, [user, navigate]);

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="dashboard-container">
            <h2>Welcome, {user?.username || "User"}!</h2>
                <div className="user-dashboard">
                    <h3>User Dashboard</h3>
                    <p>View your profile, track progress, and explore features.</p>
                </div>

        </div>
    );
};

export default Dashboard;
