import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";
import { useState } from "react";
import "../App.css"

interface NavbarProps {
  user: null | IUser;
  setUser: Function;
}

function Navbar({ user, setUser }: NavbarProps) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  console.log("user", user);

  return (
    <>
      <header>
        <nav className="navbar is-dark">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              {!user && (
                <Link to="/signup" className="navbar-item">
                  Signup
                </Link>
              )}
              {!user && (
                <Link to="/login" className="navbar-item">
                  Login
                </Link>
              )}
              <Link to="/destinations" className="navbar-item">
                Destinations
              </Link>
              {/* Added the Hotels link */}
              <Link to="/hotels" className="navbar-item">
                Hotels
              </Link>
              {user && (
                <Link to="/createPost" className="navbar-item">
                  Create Tools
                </Link>
              )}

              {user && (
                <button
                  onClick={logout}
                  className="button navbar-item is-ghost">
                  Logout
                </button>
              )}

              {user && (
                <span className="navbar-item navbar-welcome">{`Welcome back ${user.username}`}</span>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
