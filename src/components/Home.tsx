import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blueZoneImage from "../assets/bluepic.png";
import greenZoneImage from "../assets/greenpic.png";
import yellowZoneImage from "../assets/yellowpic.png";
import redZoneImage from "../assets/redpic.png";
// Zone Images

// Zone Descriptions
const zones = [
  {
    image: blueZoneImage,
    title: "Blue Zone",
    description: "I feel sad, tired, or bored. It's okay to take a rest!",
    link: "/blue-zone",
  },
  {
    image: greenZoneImage,
    title: "Green Zone",
    description: "I feel calm and ready to learn! Let's do great things!",
    link: "/green-zone",
  },
  {
    image: yellowZoneImage,
    title: "Yellow Zone",
    description:
      "I feel excited, frustrated, or worried. Let’s look at some ways to calm down!",
    link: "/yellow-zone",
  },
  {
    image: redZoneImage,
    title: "Red Zone",
    description: "I feel really angry or scared. It's time to cool down!",
    link: "/red-zone",
  },
];

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
          <h1 className="title has-text-centered">Welcome to EmoZones</h1>
          <div className="content has-text-centered">
            <p>
              The Zones of Regulation is a framework designed to help
              individuals understand and manage their emotions and behaviors. It
              categorizes emotions into four colored zones:
            </p>
          </div>

       
          <div className="columns is-multiline">
            {zones.map((zone, index) => (
              <div className="column is-one-quarter" key={index}>
                <div
                  className="zone-image" // Use a class for styling
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    overflow: "hidden",
                    height: "300px", // Fixed height for uniformity
                    borderRadius: "8px", // Rounded corners (optional)
                  }}
                  onMouseEnter={() => setActiveZone(zone.title)}
                  onMouseLeave={() => setActiveZone(null)}
                  onClick={() => handleZoneClick(zone.link)} // Handle click event
                >
                  <img
                    src={zone.image}
                    alt={zone.title}
                    style={{
                      width: "100%",
                      height: "100%", 
                      objectFit: "cover", 
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10%",
                      left: "10%",
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background for better readability
                      padding: "5px",
                      borderRadius: "5px",
                    }}>
                    <h3 className="title is-4">{zone.title}</h3>
                    <p>
                      {activeZone === zone.title
                        ? zone.description
                        : "Hover here to learn more!"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Link to Official Site */}
          <footer className="footer">
            <div
              className="content has-text-left"
              style={{ fontSize: "0.9rem", marginTop: "100px" }}>
              <p>
                For more fun information about feelings and the Zones of
                Regulation, visit the official
                <a
                  href="https://www.zonesofregulation.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="has-text-link">
                  {" "}
                  Zones of Regulation website!
                </a>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Home;
