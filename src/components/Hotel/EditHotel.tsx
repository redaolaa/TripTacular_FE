import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../config";

function EditHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    stars: "",
    location: "",
    image_url: "",
    owner: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseUrl}/hotels/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hotel:", err);
        setError("Failed to fetch hotel");
        setLoading(false);
      }
    };
    fetchHotel();
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
        name: formData.name,
        stars: formData.stars,
        location: formData.location,
        image_url: formData.image_url,
        owner: formData.owner,
      };
      console.log("Sending data:", dataToSend);
      const response = await axios.put(`${baseUrl}/hotels/${id}/`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Server response:", response.data);
      navigate("/hotels");
    } catch (err) {
      console.error("Error updating hotel:", err);
      setError("Failed to update hotel");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Edit Hotel</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Stars</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="stars"
                value={formData.stars}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="location"
                value={formData.location}
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
                Update Hotel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHotel;
