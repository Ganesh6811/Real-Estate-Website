import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../config.jsx";
import { useNavigate } from "react-router-dom";

import { IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

import WhiteHeader from "../Components/Header.componentForWhite.jsx";
import useAuthStore from "../Store/Auth.store.jsx";

const AboutMe = () => {
    const [userData, setUserData] = useState(null);
    const [savedPosts, setSavedPosts] = useState([]);
    const navigate = useNavigate();
    const { logOut} = useAuthStore();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/auth/checkAuth`, {
                    withCredentials: true,
                });
                setUserData(res.data);


                const result = await axios.get(`${baseUrl}/post/getPosts`, { withCredentials: true });
                const allPosts = result.data.sendPosts; 
                const filtered = allPosts.filter(
                    post => post && post._id && res.data.savedPosts.includes(post._id)
                );

                setSavedPosts(filtered); 
            }
            catch (err) {
                console.log("Error while fetching the user data in the about me page:", err);
            }
        }
        getData();
    }, []);

    const onClickPost = (id) => {
        navigate(`/post/${id}`)
    }


    const clickedLogout = async () => { 
        try {
            const res = await axios.get(`${baseUrl}/auth/logOut`, { withCredentials: true });
            console.log("Logged out successfully");
            logOut();
        }
        catch (err) {
            console.log("Error while logging out in the aboutMe page:", err);
        }
    }


    if (userData === null) {
        return (<p>Loading...</p>)
    }

    return (<div style={{ backgroundColor: "#ffffef" }}>
        <WhiteHeader />

        <div className="d-flex h-100 gap-5 m-5">
            {/* Saved Posts */}
            <div className="d-flex flex-column gap-5 w-50 p-4">
                <h3 className="mb-3">My Saved Properties</h3>
                {Array.isArray(savedPosts) && savedPosts.length <= 0 ?
                    <p>Nothing Saved</p> :
                    savedPosts.map((post) => (
                        // Card data
                        <div key={post._id}
                            className="d-flex gap-4 p-4 rounded" style={{ backgroundColor: "#fff8d7" }} onClick={() => onClickPost(post._id)}>
                            {/* Left side image of the card */}
                            <div>
                                {post.images && post.images.length > 0 ? (
                                    <img className="rounded" src={post.images[0]} width={"250px"} height={"200px"} />
                                ) : (
                                    <p>No image</p>
                                )}
                            </div>
                            {/* Right Side of the card(content) */}
                            <div className="d-flex flex-column gap-2">
                                <h5>{post.title}</h5>
                                <p className="fs-6" style={{ fontWeight: "150" }}><span><CiLocationOn className="w-3 h-3" /></span>{post.city}</p>
                                <p className="p-1 rounded" style={{ backgroundColor: "#ffdf9f", display: "inline", width: "35%" }}>${post.price}</p>
                                <div className="d-flex gap-3">
                                    <span style={{ backgroundColor: "#ffffef", padding: "3%" }}><IoBedSharp /> {post.bedRooms} Bedrooms</span>
                                    <span style={{ backgroundColor: "#ffffef", padding: "3%" }}><FaBath /> {post.bathRooms} Baths</span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Display the user information */}
            <div className="d-flex flex-column gap-3 w-50 p-4 rounded" style={{ backgroundColor: "#ffffd7" }}>
                <h4>User Information</h4>
                <p>userName : <span><strong>{userData.name}</strong></span></p>
                <p>E-mail :  <span><strong>{userData.email}</strong></span></p>
                <p>Mobile No :  <span><strong>{userData.phoneNo}</strong></span></p>
                <button className="btn btn-success rounded-pill px-3 py-1 " style={{ textAlign: "center", width: "30%" }} onClick={(e) => clickedLogout()}>Logout</button>
            </div>
        </div>
    </div>)
}

export default AboutMe;