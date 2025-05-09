import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddInstrumentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shops, setShops] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    image: "",
    shopId: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get("/api/shops");
        const owned = res.data.filter((shop) => shop.owner._id === user._id);
        setShops(owned);
      } catch (err) {
        console.error(err);
      }
    };
    fetshShops();
  }, [user._id]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/api/instruments", {
        ...form,
        price: parseFloat(form.price),
      });
      navigate("dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to add instrument");
    }
  };

  return (
    <div>
      <h2>Add New Instrument</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Type (e.g. Guitar)"
          value={form.type}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <select
          name="shopId"
          value={form.shopId}
          onChange={handleChange}
          required
        >
          <option value="">Select Shop</option>
          {shops.map((shop) => (
            <option key={shop._id} value={shop._id}>
              {shop.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Instrument</button>
      </form>
    </div>
  );
};
