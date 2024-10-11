import { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { IUser } from "../interfaces/user"; 
import { useNavigate, useParams } from "react-router-dom";
import { IPost } from "../interfaces/post"; 
import { baseUrl } from "../config";


function EditPost({ user }: { user: null | IUser }) {
    const { id } = useParams<{ id: string }>(); 
    const [formData, setFormData] = useState<IPost | null>(null);
    const [errorData, setErrorData] = useState({ name: "", zone: "", image: "" });
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    
    
    useEffect(() => {
        async function fetchPost() {
            console.log(`Fetching post with ID: ${id}`);
            try {
                const response = await axios.get(`${baseUrl}/posts/${id}`);
                console.log(`Post data fetched: `, response.data);
                setFormData(response.data); 
                setLoading(false);
            } catch (error: any) {
                console.error("Failed to fetch post:", error);
                setErrorData({ ...errorData, name: "Post not found" });
                setLoading(false);
            }
        }
        
        fetchPost();
    }, [id]);

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        console.log(`Submitting post data: `, formData);

        if (formData) {
            try {
                const token = localStorage.getItem("token");
                await axios.put(`${baseUrl}/posts/${id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                navigate("/posts"); 
            } catch (error: any) {
                console.error("Error updating post:", error);
                setErrorData(error.response.data.errors);
            }
        }
    }

    function handleChange(e: SyntheticEvent) {
        const targetElement = e.target as HTMLInputElement | HTMLSelectElement;
        if (formData) {
            const newFormData = {
                ...formData,
                [targetElement.name]: targetElement.value,
            };
            setFormData(newFormData);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (!formData) {
        return <div>Error: Post not available.</div>; 
    }


    console.log("Current User: ", user);

    return (
        <div className="section">
            <div className="container">
                <h1 className="title">Edit Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="name" className="label">
                            Tool Name
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {errorData.name && (
                                <small className="has-text-danger">{errorData.name}</small>
                            )}
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="zone" className="label">
                            Zone
                        </label>
                        <div className="control">
                            <select
                                className="input"
                                name="zone"
                                value={formData.zone}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a zone</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="red">Red</option>
                                <option value="yellow">Yellow</option>
                            </select>
                            {errorData.zone && (
                                <small className="has-text-danger">{errorData.zone}</small>
                            )}
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="image" className="label">
                            Image
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                            />
                            {errorData.image && (
                                <small className="has-text-danger">{errorData.image}</small>
                            )}
                        </div>
                    </div>

                    <button className="button is-primary" type="submit">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditPost;
