import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";
import DeleteHotelModal from "../Hotel/DeleteHotelModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlusCircle,
  faTrashAlt,
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
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login 
  const navigate = useNavigate();

  // Check if user is logged in based on token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

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

  const renderStars = (starCount: string) => {
    const stars = parseInt(starCount);
    return (
      <div className="stars">
        {Array.from({ length: stars }, (_, index) => (
          <span key={index} className="has-text-warning">
            ★
          </span>
        ))}
        {Array.from({ length: 5 - stars }, (_, index) => (
          <span key={index} className="has-text-grey-light">
            ★
          </span>
        ))}
      </div>
    );
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
        {isLoggedIn && ( // Show Add Hotel button only if logged in
          <div className="has-text-centered mb-4">
            <button
              onClick={handleAddHotelClick}
              className="button is-primary is-rounded has-text-weight-bold">
              <FontAwesomeIcon icon={faPlusCircle} /> Add Hotel
            </button>
          </div>
        )}

        <div className="columns is-multiline">
          {posts.map((post) => (
            <div key={post.id} className="column is-one-third">
              <div className="card" style={{ position: "relative" }}>
               
                {isLoggedIn && (
                    <button
                      className="delete is-danger"
                      onClick={() => handleDeleteClick(post.id, "hotel")}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 10,
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        fontSize: "20px",
                      }}
                      onMouseEnter={() => setHoveredButton(`delete-${post.id}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                      aria-label="Delete Hotel">
                      <span
                        style={{
                          color:
                            hoveredButton === `delete-${post.id}`
                              ? "red"
                              : "inherit",
                        }}>
                        
                      </span>
                    </button>
                  )}

                {/* Edit Button */}
                {isLoggedIn && (
                  <button
                    className="button is-light"
                    onClick={() => handleEditClick(post.id)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "50px",
                      zIndex: 10,
                      border: "none",
                      background: "transparent",
                      padding: 0,
                    }}
                    onMouseEnter={() => setHoveredButton(`edit-${post.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    aria-label="Edit Hotel">
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{
                        color:
                          hoveredButton === `edit-${post.id}`
                            ? "orange"
                            : "inherit",
                      }}
                    />
                  </button>
                )}

                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={post.image_url} alt={post.name} />
                  </figure>
                </div>
                <div className="card-content">
                  <h2 className="title is-4">{post.name}</h2>
                  <p>{post.location}</p>
                  <p>{renderStars(post.stars)}</p>
                  {post.hotel_comments.length > 0 ? (
                    post.hotel_comments.map((comment) => (
                      <div key={comment.id} className="content mb-3">
                        <section className="is-flex is-align-items-center">
                          <p className="mr-3">{comment.review}</p>
                          {isLoggedIn && (
                            <div className="buttons is-right ml-2">
                              <button
                                className="button is-light is-small"
                                onClick={() =>
                                  handleEditCommentClick(comment.id)
                                }
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color:
                                    hoveredButton ===
                                    `editComment-${comment.id}`
                                      ? "orange"
                                      : "inherit",
                                }}
                                onMouseEnter={() =>
                                  setHoveredButton(`editComment-${comment.id}`)
                                }
                                onMouseLeave={() => setHoveredButton(null)}>
                                <FontAwesomeIcon icon={faPen} />
                              </button>
                              <button
                                className="button is-light is-small"
                                onClick={() =>
                                  handleDeleteClick(comment.id, "hotel_comment")
                                }
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color:
                                    hoveredButton ===
                                    `deleteComment-${comment.id}`
                                      ? "orange"
                                      : "inherit",
                                }}
                                onMouseEnter={() =>
                                  setHoveredButton(
                                    `deleteComment-${comment.id}`
                                  )
                                }
                                onMouseLeave={() => setHoveredButton(null)}>
                                <FontAwesomeIcon icon={faTrashAlt} />{" "}
                                {/* Delete Icon */}
                              </button>
                            </div>
                          )}
                        </section>
                        {comment.image_url && (
                          <figure className="image is-128x128">
                            <img src={comment.image_url} alt="Review" />
                          </figure>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="content has-text-grey">
                      No reviews available for this hotel.
                    </p>
                  )}
                  {isLoggedIn && (
                    <div className="buttons is-centered mt-2">
                      <button
                        className="button is-light is-small"
                        onClick={() => handleAddCommentClick(post.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "white",
                          fontSize: "0.8rem", // Smaller text
                        }}>
                        Add Comment
                      </button>
                    </div>
                  )}
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
