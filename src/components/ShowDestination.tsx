import { useState, useEffect, SyntheticEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IDestination } from "../interfaces/destination"; // Import the IDestination interface
import Destination from "./Destinations"; // Import the component that displays destination details
import { IUser } from "../interfaces/user";
import axios from "axios";
import { baseUrl } from "../config";

function ShowDestination({ user }: { user: null | IUser }) {
  const [destination, setDestination] = useState<IDestination | null>(null);
  const { destinationId } = useParams(); // Change postId to destinationId
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDestination() {
      try {
        const response = await fetch(
          `${baseUrl}/destinations/${destinationId}`
        ); // Change URL to fetch destinations
        const destinationData = await response.json();
        setDestination(destinationData);
      } catch (error) {
        console.error("Error fetching destination:", error);
      }
    }

    fetchDestination();
  }, [destinationId]);

  async function deleteDestination(destinationId: string) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/destinations/${destinationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/destinations"); // Change navigation route to destinations
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {destination ? (
            <Destination {...destination} onDelete={deleteDestination} /> // Pass destination data
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {destination &&
          destination.user === user?.id && ( // Check if the current user is the owner
            <button
              onClick={() => deleteDestination(destinationId!)} // Use destinationId for deletion
              className="button is-danger">
              Delete
            </button>
          )}
      </div>
    </section>
  );
}

export default ShowDestination;
