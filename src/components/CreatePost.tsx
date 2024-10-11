import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { IUser } from "../interfaces/user";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

function CreatePost({user}: {user:null | IUser}) {
  console.log("USER,", user)
  const [formData, setFormData] = useState({ name: "", zone: "", image: "" });
  const [errorData, setErrorData] = useState({ name: "", zone: "", image: "" });
  const navigate = useNavigate();
  console.log("CreatePost component is rendering")

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response: any = await axios.post(
        `${baseUrl}/posts`, formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("RESPONSE IS: ", response);

      navigate("/posts");
    } catch (error: any) {
      console.log("THE ERROR IS: ", error);
      setErrorData(error.response.data.errors);
    }
  }

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const newFormData = {
      ...formData,
      [targetElement.name]: targetElement.value,
    };
    setFormData(newFormData);
  }

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name" className="label">
              Tool Name
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errorData.name && (
                <small className="has-text-danger">{errorData.name}</small>
              )}
            </div>
          </div>
          <div className="field">
            <label htmlFor="zone" className="label">
              Zone
            </label>
            <div className="control">
              <select
                className="input"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
              >
                <option value="">Select a zone</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
              </select>
              {errorData.zone && (
                <small className="has-text-danger">{errorData.zone}</small>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="image" className="label">
              Image
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
              {errorData.image && (
                <small className="has-text-danger">{errorData.image}</small>
              )}
            </div>
          </div>

          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;