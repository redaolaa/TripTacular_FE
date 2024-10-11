import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../config";

function Login({ fetchUser }: { fetchUser: Function }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await axios.post(`${baseUrl}/login`, formData);
   
      localStorage.setItem("token", response.data.token);
      fetchUser(); 
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errorMessage && (
              <small className="has-text-danger">{errorMessage}</small>
            )}
          </div>
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
        <div className="has-text-centered" style={{ marginTop: '20px' }}>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="has-text-link">
              Sign up here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;