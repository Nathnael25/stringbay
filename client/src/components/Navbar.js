import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link>
      {user ? (
        <>
          {user.role === "seller" && (
            <Link to="/dashboard" style={{ marginLeft: "1rem" }}>
              Dashboard
            </Link>
          )}
          <span style={{ marginLeft: "1rem" }}>Hello, {user.fullName}</span>
          <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/LoginOrRegisterPage" style={{ marginLeft: "1rem" }}>
            Login
          </Link>
          <Link to="/register" style={{ marginLeft: "1rem" }}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
