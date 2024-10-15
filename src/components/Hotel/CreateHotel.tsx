import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { IUser } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";

function CreateHotel({ user }: { user: null | IUser }) {
  const [formData, setFormData] = useState({
    name: "",
    stars: "",
    location: "",
    image_url: "",
  });

  const [errorData, setErrorData] = useState({
    name: "",
    stars: "",
    location: "",
    image_url: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const ownerId = user?.id || 1;

      const payload = {
        ...formData,
        owner: ownerId,
      };

      console.log("Payload being sent:", payload);

      const response = await axios.post(`${baseUrl}/hotels/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("RESPONSE IS: ", response);
      navigate("/hotels/");
    } catch (error: any) {
      console.log("THE ERROR IS: ", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorData(error.response.data.errors);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  function handleChange(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const newFormData = { ...formData, [target.name]: target.value };
    setFormData(newFormData);
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Create a New Hotel</h1>
        <form onSubmit={handleSubmit}>
          {/* Hotel Name */}
          <div className="field">
            <label htmlFor="name" className="label">
              Hotel Name
            </label>
            <div className="control">
              <input
                type="text"
                className={`input ${errorData.name ? "is-danger" : ""}`}
                name="name"
                placeholder="Enter the hotel name"
                value={formData.name}
                onChange={handleChange}
              />
              {errorData.name && (
                <p className="help is-danger">{errorData.name}</p>
              )}
            </div>
          </div>

          {/* Stars */}
          <div className="field">
            <label htmlFor="stars" className="label">
              Hotel Stars (Rating)
            </label>
            <div className="control">
              <input
                type="text"
                className={`input ${errorData.stars ? "is-danger" : ""}`}
                name="stars"
                placeholder="Enter the stars (1-5)"
                value={formData.stars}
                onChange={handleChange}
              />
              {errorData.stars && (
                <p className="help is-danger">{errorData.stars}</p>
              )}
            </div>
          </div>

          {/* Location  */}
          <div className="field">
            <label htmlFor="location" className="label">
              Location
            </label>
            <div className="control">
              <input
                type="text"
                className={`input ${errorData.location ? "is-danger" : ""}`}
                name="location"
                placeholder="Enter the location (e.g., Malibu, California)"
                value={formData.location}
                onChange={handleChange}
              />
              {errorData.location && (
                <p className="help is-danger">{errorData.location}</p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div className="field">
            <label htmlFor="image_url" className="label">
              Image URL
            </label>
            <div className="control">
              <input
                type="text"
                className={`input ${errorData.image_url ? "is-danger" : ""}`}
                name="image_url"
                placeholder="Enter the image URL"
                value={formData.image_url}
                onChange={handleChange}
              />
              {errorData.image_url && (
                <p className="help is-danger">{errorData.image_url}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateHotel;
