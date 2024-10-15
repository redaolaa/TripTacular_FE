import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";

function CreateHotelComment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    review: "",
    image_url: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrors({ auth: "You must be logged in to add a comment." });
        return;
      }

      const commentData = {
        review: comment.review,
        image_url: comment.image_url || null,
        hotel: parseInt(id),
        owner: 1, // Set owner to 1 
      };

      console.log("Sending data:", commentData);

      const response = await axios.post(
        `${baseUrl}/hotel_comments/`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      navigate(`/hotels`);
    } catch (error: any) {
      console.error("Error adding comment:", error);
      if (error.response) {
        console.log("Error response:", error.response.data);
        if (error.response.status === 422) {
          setErrors(error.response.data);
        } else {
          setErrors({
            general:
              error.response.data.detail ||
              "Failed to add comment. Please try again.",
          });
        }
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Add Hotel Comment</h1>
        {errors.general && (
          <div className="notification is-danger">{errors.general}</div>
        )}
        {errors.auth && (
          <div className="notification is-warning">{errors.auth}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Review</label>
            <div className="control">
              <textarea
                className={`textarea ${errors.review ? "is-danger" : ""}`}
                name="review"
                value={comment.review}
                onChange={handleChange}
                required
              />
            </div>
            {errors.review && <p className="help is-danger">{errors.review}</p>}
          </div>

          <div className="field">
            <label className="label">Image URL (optional)</label>
            <div className="control">
              <input
                className={`input ${errors.image_url ? "is-danger" : ""}`}
                type="text"
                name="image_url"
                value={comment.image_url}
                onChange={handleChange}
              />
            </div>
            {errors.image_url && (
              <p className="help is-danger">{errors.image_url}</p>
            )}
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-primary">
                Add Comment
              </button>
            </div>
            <div className="control">
              <button
                type="button"
                className="button is-link is-light"
                onClick={() => navigate("/hotels")}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateHotelComment;
