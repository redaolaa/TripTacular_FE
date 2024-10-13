import { useState, useEffect } from "react";
import axios from "axios";
import { IUser } from "../interfaces/user";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

// Define types for comments and posts
type Comment = {
  id: number;
  review: string;
  created_at: string;
  updated_at: string;
  image_url: string;
  destination: number;
  owner: number;
};

type Post = {
  id: number;
  comments: Comment[];
  country: string;
  city: string;
  date_from: string;
  date_to: string;
  image_url: string;
  owner: number;
};

type Posts = Post[];

function DestinationList({ user }: { user: null | IUser }) {
  const [posts, setPosts] = useState<Posts>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(`${baseUrl}/destinations`);
        console.log("Fetched posts data: ", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Failed to load posts");
      }
    }
    fetchPosts();
  }, []);

  if (error) {
    return <div className="notification is-danger">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="notification is-warning">No posts available.</div>;
  }

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAddDestinationClick = () => {
    navigate("/createPost");
  };

  const handleEditClick = (id: number) => {
    navigate(`/editDestination/${id}`);
  };

  const handleEditCommentClick = (commentId: number) => {
    navigate(`/editDestComment/${commentId}`);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="has-text-centered mb-4">
          <button
            onClick={handleAddDestinationClick}
            className="button is-primary">
            Add Destination
          </button>
        </div>

        <div className="columns is-multiline">
          {posts.map((post) => (
            <div key={post.id} className="column is-one-third">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src={post.image_url}
                      alt={`${post.city}, ${post.country}`}
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <h2 className="title is-4">
                    {post.city}, {post.country}
                  </h2>
                  {post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                      <div key={comment.id} className="content">
                        <p>{comment.review}</p>
                        {comment.image_url && (
                          <figure className="image is-128x128">
                            <img src={comment.image_url} alt="Review" />
                          </figure>
                        )}
                        <div className="buttons">
                          <button
                            className="button is-small is-info"
                            onClick={() => handleEditCommentClick(comment.id)}>
                            Edit Comment
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="content has-text-grey">
                      No reviews available for this destination.
                    </p>
                  )}
                  <div className="has-text-centered mt-2">
                    <button
                      className="button is-info"
                      onClick={() => handleEditClick(post.id)}>
                      Edit Destination
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="has-text-centered mt-5">
          <button onClick={handleHomeClick} className="button is-primary">
            Go to Home
          </button>
        </div>
      </div>
    </section>
  );
}

export default DestinationList;
