import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import DestinationList from "./components/DestinationList";
import CreateDestination from "./components/CreateDestination";
import ShowPost from "./components/ShowDestination";
import EditDestComment from ".//components/EditDestComment";

import EditDestination from "./components/EditDestination";
import { baseUrl } from "./config";
import CreateDestComment from "./components/CreateDestComment";

function App() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    console.log("fetced user ");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/auth/user/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response.data", response);
      // response returning object but response.data is empty

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} />} />

        <Route path="/destinations" element={<DestinationList user={user} />} />
        <Route path="/createPost" element={<CreateDestination user={user} />} />
        <Route
          path="/editDestination/:id"
          element={<EditDestination user={user} />}
        />
        <Route
          path="/editDestComment/:id"
          element={<EditDestComment user={user} />}
        />

        <Route
          path="/createDestComment/:destinationId"
          element={<CreateDestComment user={user} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
