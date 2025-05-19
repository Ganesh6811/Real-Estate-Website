import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../config.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { CiLocationOn } from "react-icons/ci";
import { FaKitchenSet } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { useParams } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import WhiteHeader from "../Components/Header.componentForWhite.jsx";

const DisplaySinglePost = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState({});
    const [saved, setSaved] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/post/getPost/${id}`, {
                    withCredentials: true,
                });
                setPostData(res.data.post);
            }
            catch (err) {
                console.log("Error in the DisplaySinglePost while fetching the data:", err);
            }
        };

        const checkSaved = async () => {
            try {
                const res = await axios.get(`${baseUrl}/auth/checkAuth`, {
                    withCredentials: true,
                });
                const posts = res.data.savedPosts;
                const check = posts.some(post => post.toString() === id.toString());
                setSaved(check);
            }
            catch (err) {
                console.log("Error while fetching the saved posts of the user");
            }
        };

        getData();
        checkSaved();
    }, [id]);

    const onClickSaved = async () => {
        try {
            if (!saved) {
                const res = await axios.post(`${baseUrl}/user/savePost`, { postId: id }, { withCredentials: true });
                if (res.status === 201) setSaved(true);
                else alert("Post is not saved");
            } else {
                const res = await axios.post(`${baseUrl}/user/unSavePost`, { postId: id }, { withCredentials: true });
                if (res.status === 204) setSaved(false);
                else alert("Post is not updating");
            }
        } catch (err) {
            console.log("Error while updating the post to the user:", err);
        }
    };

    // For modal navigation
    const images = postData.images && postData.images.length > 0 ? postData.images : ["fallback_image_url"];

    const openModal = (index) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = (e) => {
        e.stopPropagation();
        setIsModalOpen(false);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const clickedForm = async(e)=>{
        e.preventDefault();

        try{
            const res = await axios.post(`${baseUrl}/user/sendMail`,{
                firstName,
                lastName,
                email,
                phoneNo,
                message,
            } , {withCredentials:true});

            console.log(res);
            if(res.status === 204){
                alert("We will contact you in a while");
                console.log("Data is sended successfully");

                setFirstName("");
                setLastName("");
                setEmail("");
                setPhoneNo("");
                setMessage("");
            }
        }
        catch(err){
            console.log("Error in the contactUs page:", err);
        }
    }

    return (
        <div style={{ backgroundColor: "#ffffef", height: "100vh" }}>
            <WhiteHeader />

            <div className="d-flex gap-5 m-5">
                {/* left side data */}
                <div className="d-flex flex-column gap-5 w-50 m-5">
                    <div className="d-flex gap-3">
                        <div>
                            {postData.images && postData.images.length > 0 ? (
                                <img
                                    className="rounded"
                                    src={postData.images[0]}
                                    style={{ width: "400px", height: "300px", cursor: "pointer" }}
                                    alt="post image 1"
                                    onClick={() => openModal(0)}
                                />
                            ) : (
                                <img
                                    src="fallback_image_url"
                                    alt="fallback"
                                />
                            )}
                        </div>
                        <div className="d-flex flex-column gap-3">
                            {postData.images && postData.images.length > 1 ? (
                                <img
                                    className="rounded"
                                    src={postData.images[1]}
                                    style={{ width: "200px", height: "140px", cursor: "pointer" }}
                                    alt="post image 2"
                                    onClick={() => openModal(1)}
                                />
                            ) : (
                                <img
                                    src="fallback_image_url"
                                    alt="fallback"
                                />
                            )}
                            {postData.images && postData.images.length > 2 ? (
                                <img
                                    className="rounded"
                                    src={postData.images[2]}
                                    style={{ width: "200px", height: "140px", cursor: "pointer" }}
                                    alt="post image 3"
                                    onClick={() => openModal(2)}
                                />
                            ) : (
                                <img
                                    src="fallback_image_url"
                                    alt="fallback"
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <h2>{postData.title}</h2>
                        <p className="fs-6" style={{ fontWeight: "150" }}>
                            <span><CiLocationOn className="w-3 h-3" /></span>{postData.city}
                        </p>
                        <p className="p-1 rounded" style={{ backgroundColor: "#ffdf9f", display: "inline" }}>${postData.price}</p>
                        <button
                            className="btn btn-success rounded-pill px-3 py-1 fw-semibold float-end"
                            onClick={() => onClickSaved(postData._id)}
                        >
                            {(saved) ? "Saved" : "Save Property"}
                        </button>
                        <p className="mt-5" style={{ fontWeight: "450" }}>
                            {postData.description}Discover your perfect home in the heart of {postData.city}. This beautiful property features {postData.bedrooms} bedrooms, {postData.bathrooms} bathrooms, and a spacious layout designed for comfort and functionality. Priced at ${postData.price}, this home offers a perfect blend of style and convenience, ideal for families, professionals, or investors. Don’t miss the chance to own or rent this amazing property.
                        </p>
                    </div>


                    <div className="d-flex justify-content-center p-4 mt-5" style={{ backgroundColor: "#fff8d7", borderRadius: "1rem", boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)" }}>
                        <form
                            onSubmit={(e)=>clickedForm(e)}
                            className="d-flex flex-wrap justify-content-between gap-4 w-100"
                            style={{ maxWidth: "1200px" }}
                        >
                            <div className="d-flex flex-column gap-2 flex-grow-1" style={{ minWidth: "260px" }}>
                                <label className="fw-semibold fs-5">First Name</label>
                                <input
                                    className="form-control p-2 rounded"
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="d-flex flex-column gap-2 flex-grow-1" style={{ minWidth: "260px" }}>
                                <label className="fw-semibold fs-5">Last Name</label>
                                <input
                                    className="form-control p-2 rounded"
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="d-flex flex-column gap-2 flex-grow-1" style={{ minWidth: "260px" }}>
                                <label className="fw-semibold fs-5">Email</label>
                                <input
                                    className="form-control p-2 rounded"
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="d-flex flex-column gap-2 flex-grow-1" style={{ minWidth: "260px" }}>
                                <label className="fw-semibold fs-5">Phone No</label>
                                <input
                                    className="form-control p-2 rounded"
                                    type="text"
                                    name="phone"
                                    placeholder="Enter Phone No"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                />
                            </div>

                            <div className="d-flex flex-column gap-2 w-100">
                                <label className="fw-semibold fs-5">Message</label>
                                <textarea
                                    className="form-control p-3 rounded"
                                    name="message"
                                    placeholder="Enter your message here..."
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="w-100 text-end">
                                <button type="submit" className="btn btn-dark px-4 py-2 fs-5 rounded">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* right side data */}
                <div className="d-flex flex-column gap-3 rounded p-5" style={{ backgroundColor: "#ffffd7" }}>
                    <div className="d-flex flex-column gap-4">
                        <h5>General</h5>
                        <div className="d-flex flex-column gap-4" style={{ backgroundColor: "#ffffef" }}>
                            <div className="d-flex gap-3">
                                <FaKitchenSet style={{ width: "30px", height: "30px" }} />
                                <div>
                                    <h5>Utilities</h5>
                                    <p>Tenant is responsible</p>
                                </div>
                            </div>
                            <div className="d-flex gap-3">
                                <MdPets style={{ width: "30px", height: "30px" }} />
                                <div>
                                    <h5>Pet Policy</h5>
                                    <p>Pets allowed</p>
                                </div>
                            </div>
                            <div className="d-flex gap-3">
                                <GiTakeMyMoney style={{ width: "30px", height: "30px" }} />
                                <div>
                                    <h5>Income Policy</h5>
                                    <p>Atleast double the expenditure on property</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* sizes */}
                    <div className="d-flex flex-column">
                        <h5>Sizes</h5>
                        <div className="d-flex justify-content-between gap-3">
                            <span style={{ backgroundColor: "#ffffef", padding: "3%" }}><IoBedSharp /> {postData.bedRooms} Bedrooms</span>
                            <span style={{ backgroundColor: "#ffffef", padding: "3%" }}><FaBath /> {postData.bathRooms} Baths</span>
                            <span style={{ backgroundColor: "#ffffef", padding: "3%" }}><i className='bi bi-aspect-ratio'></i> {postData.area || 450} sqft</span>
                        </div>
                    </div>

                    
                </div>
            </div>

            {/* Image Modal */}
            {isModalOpen && (
                <div
                    onClick={closeModal}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                        userSelect: "none",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close X */}
                        <button
                            onClick={closeModal}
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                background: "transparent",
                                border: "none",
                                color: "white",
                                fontSize: "30px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                userSelect: "none",
                            }}
                            aria-label="Close"
                        >
                            &times;
                        </button>

                        {/* Left arrow */}
                        <button
                            onClick={prevImage}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: 10,
                                transform: "translateY(-50%)",
                                background: "transparent",
                                border: "none",
                                color: "white",
                                fontSize: "50px",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                            aria-label="Previous Image"
                        >
                            &#8249;
                        </button>

                        {/* Right arrow */}
                        <button
                            onClick={nextImage}
                            style={{
                                position: "absolute",
                                top: "50%",
                                right: 10,
                                transform: "translateY(-50%)",
                                background: "transparent",
                                border: "none",
                                color: "white",
                                fontSize: "50px",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                            aria-label="Next Image"
                        >
                            &#8250;
                        </button>

                        {/* Display current image */}
                        <img
                            src={images[currentIndex]}
                            alt={`Modal view ${currentIndex + 1}`}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "80vh",
                                borderRadius: "8px",
                                userSelect: "none",
                            }}
                            draggable={false}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplaySinglePost;
