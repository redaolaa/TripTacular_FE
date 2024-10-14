import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";
import DeleteModal from "./DeleteDestModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrashAlt,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

interface IUser {
  id: number;
  username: string;
}

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
  const [itemToDelete, setItemToDelete] = useState<{
    id: number;
    type: "comment" | "destination";
  } | null>(null);
  const navigate = useNavigate();

  // Hover states for buttons and icons
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

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

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAddDestinationClick = () => {
    navigate("/createPost");
  };

  const handleEditClick = (id: number) => {
    navigate(`/editDestination/${id}`);
  };

  const handleEditCommentClick = (id: number) => {
    navigate(`/editDestComment/${id}`);
  };

  const handleAddCommentClick = (id: number) => {
    navigate(`/createDestComment/${id}`);
  };

  const handleDeleteClick = (id: number, type: "comment" | "destination") => {
    setItemToDelete({ id, type });
  };

  const handleDeleteSuccess = (deletedItemId: number) => {
    if (itemToDelete?.type === "comment") {
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          comments: post.comments.filter(
            (comment) => comment.id !== deletedItemId
          ),
        }))
      );
    } else if (itemToDelete?.type === "destination") {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== deletedItemId)
      );
    }
    setItemToDelete(null);
  };

  const handleMouseEnter = (buttonName: string) => {
    setHoveredButton(buttonName);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  if (error) {
    return <div className="notification is-danger">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="notification is-warning">No posts available.</div>;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="has-text-centered mb-4">
          <button
            onClick={handleAddDestinationClick}
            className={`button is-primary is-rounded has-text-weight-bold ${
              hoveredButton === "addDestination" ? "is-hovered" : ""
            }`}
            onMouseEnter={() => handleMouseEnter("addDestination")}
            onMouseLeave={handleMouseLeave}>
            <FontAwesomeIcon icon={faPlusCircle} />{" "}
            {/* Font Awesome Plus Icon */}
            &nbsp; Add Destination
          </button>
        </div>

        <div className="columns is-multiline">
          {posts.map((post) => (
            <div key={post.id} className="column is-one-third">
              <div className="card" style={{ position: "relative" }}>
                <button
                  className="delete is-danger"
                  onClick={() => handleDeleteClick(post.id, "destination")}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 10,
                  }}
                  aria-label="Delete Destination"></button>
                <button
                  className="button is-light"
                  onClick={() => handleEditClick(post.id)}
                  onMouseEnter={() => handleMouseEnter(`edit-${post.id}`)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "50px", // Adjust the position so it's next to the delete button
                    zIndex: 10,
                    border: "none", // Remove border
                    backgroundColor: "transparent", // Make background transparent
                    padding: 0, // Remove default padding
                    color:
                      hoveredButton === `edit-${post.id}`
                        ? "orange"
                        : "inherit",
                  }}
                  aria-label="Edit Destination">
                  <FontAwesomeIcon icon={faPen} /> {/* Pen Icon for Edit */}
                </button>
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
                  <p className="title is-6 has-text-left">Comments</p>{" "}
                  {/* Section Title */}
                  {post.comments.length > 0 ? (
                    <div className="content">
                      {post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="comment mb-3 p-3 border rounded"
                          style={{
                            borderColor: "#ddd",
                            display: "flex",
                            alignItems: "center",
                          }}>
                          <div className="mr-3">
                            {comment.image_url && (
                              <figure className="image is-128x128">
                                <img src={comment.image_url} alt="Review" />
                              </figure>
                            )}
                          </div>
                          <div className="flex-grow-1">
                            <div className="is-flex is-align-items-center">
                              <p className="mr-auto">{comment.review}</p>
                              <div className="buttons is-right ml-2">
                                <button
                                  className="button is-light is-small"
                                  onClick={() =>
                                    handleEditCommentClick(comment.id)
                                  }
                                  onMouseEnter={() =>
                                    handleMouseEnter(
                                      `editComment-${comment.id}`
                                    )
                                  }
                                  onMouseLeave={handleMouseLeave}
                                  style={{
                                    background: "transparent",
                                    border: "none",
                                    color:
                                      hoveredButton ===
                                      `editComment-${comment.id}`
                                        ? "orange"
                                        : "inherit",
                                  }} // Remove background and border
                                >
                                  <FontAwesomeIcon icon={faPen} />{" "}
                                  {/* Pen Icon for Edit */}
                                </button>
                                <button
                                  className="button is-light is-small"
                                  onClick={() =>
                                    handleDeleteClick(comment.id, "comment")
                                  }
                                  onMouseEnter={() =>
                                    handleMouseEnter(
                                      `deleteComment-${comment.id}`
                                    )
                                  }
                                  onMouseLeave={handleMouseLeave}
                                  style={{
                                    background: "transparent",
                                    border: "none",
                                    color:
                                      hoveredButton ===
                                      `deleteComment-${comment.id}`
                                        ? "orange"
                                        : "inherit",
                                  }} // Remove background and border
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} />{" "}
                                  {/* Delete Icon */}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="content has-text-grey">
                      No reviews available for this destination.
                    </p>
                  )}
                  <div className="buttons is-centered mt-2">
                    <button
                      className="button is-success is-small"
                      onClick={() => handleAddCommentClick(post.id)}
                      onMouseEnter={() =>
                        handleMouseEnter(`addComment-${post.id}`)
                      }
                      onMouseLeave={handleMouseLeave}
                      style={{
                        background: "transparent", // Make the background transparent
                        border: "none", // Remove border
                        color:
                          hoveredButton === `addComment-${post.id}`
                            ? "white"
                            : "inherit", // Set text color to white
                        borderRadius: "5px", // Round the corners
                        padding: "5px 10px", // Adjust padding for smaller size
                      }}>
                      <FontAwesomeIcon icon={faPlusCircle} /> {/* Add Icon */}
                      &nbsp; Add Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="has-text-centered mt-5">
          <button
            onClick={handleHomeClick}
            className={`button is-primary ${
              hoveredButton === "home" ? "is-hovered" : ""
            }`}
            onMouseEnter={() => handleMouseEnter("home")}
            onMouseLeave={handleMouseLeave}>
            Go to Home
          </button>
        </div>
      </div>
      {itemToDelete && (
        <DeleteModal
          itemId={itemToDelete.id}
          itemType={itemToDelete.type}
          onClose={() => setItemToDelete(null)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </section>
  );
}

export default DestinationList;
