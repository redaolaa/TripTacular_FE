import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Home() {
  // State to manage which zone's details are shown
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleZoneClick = (link: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(link); // Navigate to the zone page if logged in
    } else {
      navigate("/login"); // Redirect to the login page if not logged in
    }
  };

  return (
    <div>
      {/* Zones Description with Images */}
      <div className="section">
        <div className="container">
          <h1 className="title has-text-centered">TripTastic</h1>
          <div className="content has-text-centered">
            <p>
            Travel Recommendations
            </p>
          </div>

       
         

         
        </div>
      </div>
    </div>
  );
}

export default Home;
