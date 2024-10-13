import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../config";

function EditDestination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    date_from: "",
    date_to: "",
    image_url: "",
    owner: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseUrl}/destinations/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching destination:", err);
        setError("Failed to fetch destination");
        setLoading(false);
      }
    };
    fetchDestination();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const dataToSend = {
        country: formData.country,
        city: formData.city,
        date_from: formData.date_from,
        date_to: formData.date_to,
        image_url: formData.image_url,
        owner: formData.owner,
      };
      console.log("Sending data:", dataToSend);
      const response = await axios.put(
        `${baseUrl}/destinations/${id}/`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Server response:", response.data);
      navigate("/posts");
    } catch (err) {
      console.error("Error updating destination:", err);
      setError("Failed to update destination");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Edit Destination</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Country</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">City</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Date From</label>
            <div className="control">
              <input
                className="input"
                type="date"
                name="date_from"
                value={formData.date_from}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Date To</label>
            <div className="control">
              <input
                className="input"
                type="date"
                name="date_to"
                value={formData.date_to}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Image URL</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">
                Update Destination
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDestination;
