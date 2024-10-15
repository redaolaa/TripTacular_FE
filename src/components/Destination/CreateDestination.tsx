import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { IUser } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";

function CreateDestination({ user }: { user: null | IUser }) {
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    date_from: "",
    date_to: "",
    image_url: "",
  });
  const [errorData, setErrorData] = useState({
    country: "",
    city: "",
    date_from: "",
    date_to: "",
    image_url: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseUrl}/destinations/`,
        {
          ...formData,
          owner: user?.id || 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("RESPONSE IS: ", response);
      navigate("/destinations/");
    } catch (error: any) {
      console.log("THE ERROR IS: ", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorData(error.response.data.errors);
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
        <h1 className="title">Create a New Destination</h1>
        <form onSubmit={handleSubmit}>

          {/* Country  */}
          <div className="field">
            <label htmlFor="country" className="label">
              Country
            </label>
            <div className="control">
              <input
                type="text"
                className={`input ${errorData.country ? "is-danger" : ""}`}
                name="country"
                placeholder="Enter the country"
                value={formData.country}
                onChange={handleChange}
              />
              {errorData.country && (
                <p className="help is-danger">{errorData.country}</p>
              )}
            </div>
          </div>

          {/* City */}
          <div className="field">
            <label htmlFor="city" className="label">
              City
            </label>
            <div className="control">
              <input
                type="text"
                className={`input ${errorData.city ? "is-danger" : ""}`}
                name="city"
                placeholder="Enter the city"
                value={formData.city}
                onChange={handleChange}
              />
              {errorData.city && (
                <p className="help is-danger">{errorData.city}</p>
              )}
            </div>
          </div>

          {/* Date From  */}
          <div className="field">
            <label htmlFor="date_from" className="label">
              Date From
            </label>
            <div className="control">
              <input
                type="date"
                className={`input ${errorData.date_from ? "is-danger" : ""}`}
                name="date_from"
                value={formData.date_from}
                onChange={handleChange}
              />
              {errorData.date_from && (
                <p className="help is-danger">{errorData.date_from}</p>
              )}
            </div>
          </div>

          {/* Date To */}
          <div className="field">
            <label htmlFor="date_to" className="label">
              Date To
            </label>
            <div className="control">
              <input
                type="date"
                className={`input ${errorData.date_to ? "is-danger" : ""}`}
                name="date_to"
                value={formData.date_to}
                onChange={handleChange}
              />
              {errorData.date_to && (
                <p className="help is-danger">{errorData.date_to}</p>
              )}
            </div>
          </div>

          {/* Image */}
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

export default CreateDestination;
