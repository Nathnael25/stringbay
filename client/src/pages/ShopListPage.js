import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api"; // uses token-aware Axios instance

const ShopListPage = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get("/api/shops");
        setShops(res.data);
      } catch (err) {
        console.error("Error fetching shops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  if (loading) return <p>Loading shops...</p>;

  return (
    <div>
      <h1>All Shops</h1>
      {shops.length === 0 ? (
        <p>No shops available yet.</p>
      ) : (
        <ul>
          {shops.map((shop) => (
            <li key={shop._id}>
              <h3>
                <Link to={`/shops/${shop._id}`}>{shop.name}</Link>
              </h3>
              <p>{shop.description}</p>
              <p>
                <strong>Owner:</strong> {shop.owner?.fullName}
              </p>
              <p>
                <strong>Location:</strong> {shop.location}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopListPage;
