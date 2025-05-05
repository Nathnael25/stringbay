import React from "react";
import useAuth from "../hooks/useAuth";

const SellerDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <p>Welcome, {user.fullName}!</p>
      <p>
        You are logged in as a <strong>{user.role}</strong>.
      </p>
    </div>
  );
};

export default SellerDashboard;
