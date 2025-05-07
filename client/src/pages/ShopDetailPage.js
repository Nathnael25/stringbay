import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

const ShopDetailPage = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(`/api/shops/${id}`);
        setShop(res.data.shop);
        setInstruments(res.data.instruments);
      } catch (err) {
        console.error("Failed to load shop:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [id]);

  if (loading) return <p>Loading shop...</p>;
  if (!shop) return <p>Shop not found.</p>;

  return (
    <div>
      <h1>{shop.name}</h1>
      <p>{shop.description}</p>
      <p>
        <strong>Owner:</strong> {shop.owner?.fullName}
      </p>
      <p>
        <strong>Location:</strong> {shop.location}
      </p>

      <h2>Instruments</h2>
      {instruments.length === 0 ? (
        <p>No instruments listed yet.</p>
      ) : (
        <ul>
          {instruments.map((instrument) => (
            <li key={instrument._id}>
              <h4>{instrument.name}</h4>
              <p>{instrument.description}</p>
              <p>Type: {instrument.type}</p>
              <p>Price: ${instrument.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopDetailPage;
