import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPost } from "../interfaces/post";
import Post from "./Posts";
import axios from "axios";
import { IUser } from "../interfaces/user";
import redZoneImage from "../assets/redpic.png"
import { baseUrl } from "../config";

function RedZone({user}: {user:null | IUser}) {
    console.log("USER,", user)
  const [posts, setPosts] = useState<IPost[]> ([]);
  const [error, setError] = useState<string | null>(null);
  console.log(" Red Zone is rendering");
  console.log(error);
  const navigate= useNavigate()

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(`${baseUrl}/posts`);
        console.log("Fetched posts data: ", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("failed to load posts");
      }
    }
    fetchPosts();
  }, []);
  console.log("Posts before filtering:", posts);

  const redZonePosts = posts.filter((post) => {
    console.log(`Checking post ${post._id} with zone: ${post.zone}`);
    return post.zone.toLowerCase() === "red";
  });
  console.log("filtered red zone posts", redZonePosts);

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };
  
  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }

  const handleHomeClick = () => {
    navigate("/");
  };


  return (
    <section className="section">
      <div className="container">
      <div className="image-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img 
                        src={redZoneImage} 
                        alt="Red Zone" 
                        style={{
                            width: '80%', // Adjust the width as needed
                            maxWidth: '500px', // Optional max width
                            borderRadius: '8px', // Rounded corners (optional)
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' // Optional subtle shadow
                        }} 
                    />
                </div>

        <h1 className="title"> Red Zone Tools</h1>
        <div className="columns is-multiline">
          {redZonePosts &&
            redZonePosts.map((post: IPost) => (
              <Post {...post} key={post._id}   onDelete= {handleDeletePost} />
            ))}
          {error && <div className="has-text-danger">{error}</div>}
          {!redZonePosts?.length && <p>No Red Zone posts available.</p>}
        </div>
      </div>

      <div>
  
<br></br>
      <button onClick={handleHomeClick} className="button is-primary">
        Go to Home
      </button>
</div>

    </section>
  );
}

export default RedZone;