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
              <Link to="/posts" className="navbar-item">
                All Tools
              </Link>
              {user && (
                <Link to="/createPost" className="navbar-item">
                  Create Tools
                </Link>
              )}
              {user && (
                <>
                <Link to="/blue-zone" className="navbar-item">
                  Blue Zone
                </Link> 
                <Link to="/red-zone" className="navbar-item">Red Zone</Link>
                <Link to="/yellow-zone" className="navbar-item">Yellow Zone</Link>
                 <Link to="/green-zone" className="navbar-item">Green Zone</Link> 
                 </>
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
