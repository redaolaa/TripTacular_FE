import { Link, useNavigate } from "react-router-dom";
import { IPost } from "../interfaces/post";
import axios from "axios";
import { useState } from "react";
import "../App.css";
import { FaPen } from "react-icons/fa";
import { baseUrl } from "../config";


interface PostProps extends IPost {
  onDelete: (postId: string) => void;
}
function Post({ _id, name, image, zone, user, onDelete }: PostProps) {
  const navigate = useNavigate();
  

  const handleDeletePost = async () => {
    console.log(`Deleting post with ID: ${_id}`); 
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseUrl}/posts/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Response from delete API: `, response.data);

      onDelete(_id); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile ">
        <div className="card " style={{ maxWidth: "250px", margin: "auto" }}>
          <header className=" card-header">
            
            {user &&  ( 
                <>
                <button
              className="delete is-large "
              onClick={handleDeletePost}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 10,
              }}>

              </button>

              <div className="buttons mt-2"   style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                left: "160px",
                zIndex: 10,
              }}>
              
              <FaPen 
         
         onClick={() => {
          console.log(`Navigating to edit post with ID: ${_id}`); 
          navigate(`/edit/${_id}`)}}
             
                />
            
           </div>
           </>
            )}
            
            <p className="card-header-title is-size-7">{name}</p>


          </header>
          {/* // fixing my image height */}
          <div className="card-image">
            <figure
              className="image"
              style={{ width: "100%", height: "150px", overflow: "hidden" }}>
              <img
                src={image}
                alt={name}
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
              backgroundColor: `${zone}`,
              padding: "10px",
              minHeight: "50px",
              marginTop: "10px",
            }}>
            <div className="content" style={{ fontSize: "0.85rem" }}></div>
          </div>
        </div>

    </div>
  );
}

export default Post;
