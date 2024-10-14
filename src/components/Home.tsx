import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../config";

interface Destination {
  id: number;
  city: string;
  country: string;
  image_url: string;
}

interface Hotel {
  id: number;
  name: string;
  stars: string;
  location: string;
  image_url: string;
}

function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`${baseUrl}/destinations`);
        setDestinations(response.data.slice(0, 3)); // Get first 3 destinations
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      }
    };

    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${baseUrl}/hotels`);
        setHotels(response.data.slice(0, 3)); // Get first 3 hotels
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };

    fetchDestinations();
    fetchHotels();
  }, []);

  return (
    <div className="homepage">
      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1"> TripTastic</h1>
            <h2 className="subtitle">
              Your personal travel journal: Capturing destinations and
              accommodations
            </h2>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="title is-2 has-text-centered mb-6">Destinations</h2>
          <div className="columns is-multiline">
            {destinations.map((destination) => (
              <div key={destination.id} className="column is-4">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src={destination.image_url}
                        alt={`${destination.city}, ${destination.country}`}
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <p className="title is-4">{destination.city}</p>
                    <p className="subtitle is-6">{destination.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="has-text-centered mt-6">
            <Link to="/destinations" className="button is-primary">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="title is-2 has-text-centered mb-6">Hotels</h2>
          <div className="columns is-multiline">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="column is-4">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={hotel.image_url} alt={hotel.name} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <p className="title is-4">{hotel.name}</p>
                    <p className="subtitle is-6">{hotel.location}</p>
                    {/* <p className="is-6">Stars: {hotel.stars}</p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="has-text-centered mt-6">
            <Link to="/hotels" className="button is-primary">
              Explore All Hotels
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .homepage .card {
          transition: all 0.3s ease;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .homepage .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        .homepage .card-image img {
          object-fit: cover;
        }
        .homepage .title.is-2 {
          position: relative;
          display: inline-block;
        }
        .homepage .title.is-2::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 100%;
          height: 3px;
          background-color: #3273dc;
        }
        .homepage .button {
          transition: all 0.3s ease;
        }
        .homepage .button:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default Home;
