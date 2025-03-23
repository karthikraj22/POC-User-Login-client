import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../styles/dashboard.css"; 


const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user) return <h2>Loading...</h2>;

    return (
        <div className="dashboard-container">
            <h2>Welcome, {user.username}!</h2>
            <p>You have <strong>Admin</strong> access.</p>
            <div className="dashboard-content">
                <h3>Admin Dashboard</h3>
                <p>Manage users, view reports, and configure settings.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
