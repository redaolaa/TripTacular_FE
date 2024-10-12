import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../config";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "", // Added first name
    last_name: "", // Added last name
    username: "",
    password: "",
    password_confirmation: "", // Changed to match Django model field
  });

  const [errorData, setErrorData] = useState({
    email: "",
    first_name: "", // Added error state for first name
    last_name: "", // Added error state for last name
    username: "",
    password: "",
    password_confirmation: "", // Changed to match Django model field
  });

  const navigate = useNavigate();

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const newFormData = {
      ...formData,
      [targetElement.name]: targetElement.value,
    };
    setFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      // Make sure to post the updated formData with correct fields
      const response = await axios.post(`${baseUrl}/auth/register/`, formData);
      console.log(response.data);
      // Redirect to the login page upon successful signup
      navigate("/login");
    } catch (error: any) {
      setErrorData(error.response.data.errors);
    }
  }

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="field">
            <label htmlFor="username" className="label">
              Username
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errorData.username && (
                <small className="has-text-danger">{errorData.username}</small>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="control">
              <input
                type="email" // Changed to email type for better validation
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errorData.email && (
                <small className="has-text-danger">{errorData.email}</small>
              )}
            </div>
          </div>

          {/* First Name Field */}
          <div className="field">
            <label htmlFor="first_name" className="label">
              First Name
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              {errorData.first_name && (
                <small className="has-text-danger">
                  {errorData.first_name}
                </small>
              )}
            </div>
          </div>

          {/* Last Name Field */}
          <div className="field">
            <label htmlFor="last_name" className="label">
              Last Name
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
              {errorData.last_name && (
                <small className="has-text-danger">{errorData.last_name}</small>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control">
              <input
                type="password" // Changed to password type for better security
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errorData.password && (
                <small className="has-text-danger">{errorData.password}</small>
              )}
            </div>
          </div>

          {/* Password Confirmation Field */}
          <div className="field">
            <label htmlFor="password_confirmation" className="label">
              Password Confirmation
            </label>
            <div className="control">
              <input
                type="password" // Changed to password type for better security
                className="input"
                name="password_confirmation" // Changed to match Django model field
                value={formData.password_confirmation}
                onChange={handleChange}
              />
              {errorData.password_confirmation && (
                <small className="has-text-danger">
                  {errorData.password_confirmation}
                </small>
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

export default Signup;
