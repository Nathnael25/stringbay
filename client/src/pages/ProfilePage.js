import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../services/api";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    fullName: user.fullName || "",
    avatar: user.avatar || "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/users/me", form);
      setMessage("Profile updated successfully.");
      setUser(res.data); // Update context
    } catch (err) {
      console.error(err);
      setMessage("Update failed.");
    }
  };

  return (
    <div>
      <h2>Your Profile</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleUpdate}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />
        <input
          name="avatar"
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>

      {form.avatar && <img src={form.avatar} alt="Avatar" width="100" />}
    </div>
  );
};

export default ProfilePage;
