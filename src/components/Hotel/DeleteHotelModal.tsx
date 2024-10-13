import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";

interface DeleteHotelModalProps {
  itemId: number;
  itemType: "hotel_comment" | "hotel";
  onClose: () => void;
  onDeleteSuccess: (itemId: number) => void;
}

function DeleteHotelModal({
  itemId,
  itemType,
  onClose,
  onDeleteSuccess,
}: DeleteHotelModalProps) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError(`You must be logged in to delete a ${itemType}.`);
        return;
      }

      const endpoint =
        itemType === "hotel_comment"
          ? `${baseUrl}/hotel_comments/${itemId}/`
          : `${baseUrl}/hotels/${itemId}/`;

      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDeleteSuccess(itemId);
    } catch (error: any) {
      console.error(`Error deleting ${itemType}:`, error);
      setError(
        error.response?.data?.detail ||
          `Failed to delete ${itemType}. Please try again.`
      );
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Delete {itemType === "hotel" ? "Hotel" : "Comment"}
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          {error && <div className="notification is-danger">{error}</div>}
          <p>
            Are you sure you want to delete this{" "}
            {itemType === "hotel" ? "hotel" : "comment"}? This action cannot be
            undone.
          </p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={handleDelete}>
            Delete
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default DeleteHotelModal;
