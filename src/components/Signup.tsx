import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../config";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "", 
    last_name: "", 
    username: "",
    password: "",
    password_confirmation: "", 
  });

  const [errorData, setErrorData] = useState({
    email: "",
    first_name: "", 
    last_name: "", 
    username: "",
    password: "",
    password_confirmation: "", 
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
          {/* Username */}
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
                type="email" 
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

          {/* First Name */}
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

          {/* Last Name  */}
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

          {/* Password */}
          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control">
              <input
                type="password" 
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

          {/* Password Confirmation  */}
          <div className="field">
            <label htmlFor="password_confirmation" className="label">
              Password Confirmation
            </label>
            <div className="control">
              <input
                type="password" 
                className="input"
                name="password_confirmation" 
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
