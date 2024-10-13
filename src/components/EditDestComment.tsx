import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

type Comment = {
  id: number;
  review: string;
  image_url: string;
  destination: number;
  owner: number;
};

function EditDestComment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comment, setComment] = useState<Comment>({
    id: 0,
    review: "",
    image_url: "",
    destination: 0,
    owner: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${baseUrl}/destination_comments/${id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setComment(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch comment:", error);
        setError("Failed to fetch comment");
        setLoading(false);
      }
    };

    fetchComment();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${baseUrl}/destination_comments/${id}/`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      navigate(`/destinations`);
    } catch (error) {
      console.error("Error updating comment:", error);
      setError("Failed to update comment");
    }
  };

  if (loading)
    return (
      <div className="section">
        <div className="container">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="section">
        <div className="container notification is-danger">{error}</div>
      </div>
    );

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Edit Comment</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Review</label>
            <div className="control">
              <textarea
                className="textarea"
                name="review"
                value={comment.review}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Image URL</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="image_url"
                value={comment.image_url}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-primary">
                Update Comment
              </button>
            </div>
            <div className="control">
              <button
                type="button"
                className="button is-link is-light"
                onClick={() => navigate("/destinations")}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditDestComment;
