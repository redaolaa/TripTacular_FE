import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";
import DeleteHotelModal from "../Hotel/DeleteHotelModal";

interface IUser {
  id: number;
  username: string;
  // Add other user properties as needed
}

type Comment = {
  id: number;
  review: string;
  created_at: string;
  updated_at: string;
  image_url: string;
  hotel: number;
  owner: number;
};

type Post = {
  id: number;
  hotel_comments: Comment[];
  name: string;
  stars: string;
  location: string;
  image_url: string;
  owner: number;
};

type Posts = Post[];

function HotelList({ user }: { user: null | IUser }) {
  const [posts, setPosts] = useState<Posts>([]);
  const [error, setError] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{
    id: number;
    type: "hotel_comment" | "hotel";
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(`${baseUrl}/hotels`);
        console.log("Fetched posts data: ", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Failed to load posts");
      }
    }
    fetchPosts();
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAddHotelClick = () => {
    navigate("/createHotel");
  };

  const handleEditClick = (id: number) => {
    navigate(`/editHotel/${id}`);
  };

  const handleEditCommentClick = (id: number) => {
    navigate(`/editHotelComment/${id}`);
  };

  const handleAddCommentClick = (id: number) => {
    navigate(`/createHotelComment/${id}`);
  };

  const handleDeleteClick = (id: number, type: "hotel_comment" | "hotel") => {
    setItemToDelete({ id, type });
  };

  const handleDeleteSuccess = (deletedItemId: number) => {
    if (itemToDelete?.type === "hotel_comment") {
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          hotel_comments: post.hotel_comments.filter(
            (comment) => comment.id !== deletedItemId
          ),
        }))
      );
    } else if (itemToDelete?.type === "hotel") {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== deletedItemId)
      );
    }
    setItemToDelete(null);
  };

  if (error) {
    return <div className="notification is-danger">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="notification is-warning">No hotels available.</div>;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="has-text-centered mb-4">
          <button onClick={handleAddHotelClick} className="button is-primary">
            Add Hotel
          </button>
        </div>

        <div className="columns is-multiline">
          {posts.map((post) => (
            <div key={post.id} className="column is-one-third">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={post.image_url} alt={post.name} />
                  </figure>
                </div>
                <div className="card-content">
                  <h2 className="title is-4">{post.name}</h2>
                  <p>{post.location}</p>
                  <p>Stars: {post.stars}</p>
                  {post.hotel_comments.length > 0 ? (
                    post.hotel_comments.map((comment) => (
                      <div key={comment.id} className="content">
                        <section>Review</section>
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
                          <button
                            className="button is-small is-danger"
                            onClick={() =>
                              handleDeleteClick(comment.id, "hotel_comment")
                            }>
                            Delete Comment
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="content has-text-grey">
                      No reviews available for this hotel.
                    </p>
                  )}
                  <div className="buttons is-centered mt-2">
                    <button
                      className="button is-info"
                      onClick={() => handleEditClick(post.id)}>
                      Edit Hotel
                    </button>
                    <button
                      className="button is-danger"
                      onClick={() => handleDeleteClick(post.id, "hotel")}>
                      Delete Hotel
                    </button>
                    <button
                      className="button is-success"
                      onClick={() => handleAddCommentClick(post.id)}>
                      Add Comment
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
      {itemToDelete && (
        <DeleteHotelModal
          itemId={itemToDelete.id}
          itemType={itemToDelete.type}
          onClose={() => setItemToDelete(null)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </section>
  );
}

export default HotelList;
