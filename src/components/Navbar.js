import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext  from "../context/AuthContext";
import "../styles/Navbar.css";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : null}
    </nav>
  );
};

export default Navbar;
