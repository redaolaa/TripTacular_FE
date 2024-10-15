import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import DestinationList from "./components/Destination/DestinationList";
import CreateDestination from "./components/Destination/CreateDestination";
import EditComment from "./components/EditComment";

import EditDestination from "./components/EditDestination";
import { baseUrl } from "./config";
import CreateDestComment from "./components/Destination/CreateDestComment";
import HotelList from "./components/Hotel/HotelList";
import CreateHotel from "./components/Hotel/createHotel";
import CreateHotelComment from "./components/Hotel/CreateHotelComments";
import EditHotel from "./components/Hotel/EditHotel";

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
      <Navbar  setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} />} />

        {/* DESTINATIONS */}
        <Route path="/destinations" element={<DestinationList  />} />
        <Route path="/createPost" element={<CreateDestination user={user} />} />

        <Route
          path="/editDestination/:id"
          element={<EditDestination  />}
        />

        <Route
          path="/createDestComment/:id"
          element={<CreateDestComment  />}
        />

        <Route
          path="/editDestComment/:id"
          element={
            <EditComment
              apiEndpoint={`${baseUrl}/destination_comments`}
              redirectPath="/destinations"
            />
          }
        />

        {/* HOTELS */}
        <Route path="/hotels" element={<HotelList user={user} />} />

        <Route path="/createHotel" element={<CreateHotel user={user} />} />

        <Route
          path="/createHotelComment/:id"
          element={<CreateHotelComment  />}
        />

        <Route path="/editHotel/:id" element={<EditHotel  />} />

        <Route
          path="/editHotelComment/:id"
          element={
            <EditComment
              apiEndpoint={`${baseUrl}/hotel_comments`}
              redirectPath="/hotels"
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
