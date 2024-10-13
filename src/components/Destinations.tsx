import { Link, useNavigate } from "react-router-dom";
import { IDestination } from "../interfaces/destination"; // Import the IDestination interface
import axios from "axios";
import { useState } from "react";
import "../App.css";
import { FaPen } from "react-icons/fa";
import { baseUrl } from "../config";

interface DestinationProps extends IDestination {
  onDelete: (destinationId: string) => void; // Change postId to destinationId
}

function Destination({
  _id,
  country,
  city,
  image_url,
  user,
  onDelete,
}: DestinationProps) {
  const navigate = useNavigate();

  const handleDeleteDestination = async () => {
    console.log(`Deleting destination with ID: ${_id}`);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseUrl}/destinations/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Response from delete API: `, response.data);

      onDelete(_id); // Call the onDelete function passed from the parent component
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
      <div className="card" style={{ maxWidth: "250px", margin: "auto" }}>
        <header className="card-header">
          {user && (
            <>
              <button
                className="delete is-large"
                onClick={handleDeleteDestination} // Call the delete function for destinations
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 10,
                }}></button>

              <div
                className="buttons mt-2"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  left: "160px",
                  zIndex: 10,
                }}>
                <FaPen
                  onClick={() => {
                    console.log(
                      `Navigating to edit destination with ID: ${_id}`
                    );
                    navigate(`/edit/${_id}`); // Navigate to edit destination
                  }}
                />
              </div>
            </>
          )}
          <p className="card-header-title is-size-7">{`${city}, ${country}`}</p>{" "}
          {/* Update title to show city and country */}
        </header>

        <div className="card-image">
          <figure
            className="image"
            style={{ width: "100%", height: "150px", overflow: "hidden" }}>
            <img
              src={image_url} // Use image_url from IDestination
              alt={`${city}, ${country}`} // Update alt text
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain", // Ensures the entire image is visible
              }}
            />
          </figure>
        </div>

        {/* Card Content with colored strip */}
        <div
          className="card-content"
          style={{
            backgroundColor: "lightblue", // Use a default color; you can change this based on your design
            padding: "10px",
            minHeight: "50px",
            marginTop: "10px",
          }}>
          <div className="content" style={{ fontSize: "0.85rem" }}>
            {/* Additional content can go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Destination;
