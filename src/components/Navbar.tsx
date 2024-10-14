import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

interface NavbarProps {
  setUser: Function;
}

function Navbar({ setUser }: NavbarProps) {
  const navigate = useNavigate();

  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  async function logout() {
    try {
      // Make an API call to log out if needed (optional, depending on your backend)
      await axios.post("/auth/logout"); // Example logout endpoint if your backend supports it

      // Remove token from localStorage
      localStorage.removeItem("token");

      // Clear user state
      setUser(null);

      // Navigate back to home
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <>
      <header>
        <nav className="navbar is-dark">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              {!token && (
                <Link to="/signup" className="navbar-item">
                  Signup
                </Link>
              )}
              {!token && (
                <Link to="/login" className="navbar-item">
                  Login
                </Link>
              )}
              <Link to="/destinations" className="navbar-item">
                Destinations
              </Link>
              <Link to="/hotels" className="navbar-item">
                Hotels
              </Link>

              {/* Show logout link only if token exists */}
              {token && (
                <>
                
                  <Link
                    to="/"
                    className="navbar-item" // same className as other nav items
                    onClick={logout}>
                    Logout
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
