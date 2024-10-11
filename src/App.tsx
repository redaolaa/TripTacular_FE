import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import ShowPost from "./components/ShowPost";
import BlueZone from "./components/BlueZone";
import YellowZone from "./components/YellowZone";
import RedZone from "./components/RedZone";
import GreenZone from "./components/GreenZone";
import EditPost from './components/EditPost';
import { baseUrl } from "./config";


function App() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    console.log("fetced user ");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/user`, {
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

        <Route path="/posts" element={<PostList user={user} />} />
        <Route path="/createPost" element={<CreatePost user={user} />} />
        <Route path="/edit/:id" element={<EditPost user={user} />} />
        <Route path="/post/:postId" element={<ShowPost user={user} />} />
        <Route path="/blue-zone" element={<BlueZone user={user} />} />
        <Route path="/red-zone" element={<RedZone user={user} />} />
        <Route path="/yellow-zone" element={<YellowZone user={user} />} />
        <Route path="/green-zone" element={<GreenZone user={user}/>} />
      </Routes>
    </Router>
  );
}

export default App;
