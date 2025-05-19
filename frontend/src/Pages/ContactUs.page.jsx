import Header from "../Components/Header.componentForWhite";

import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import baseUrl from "../config";

const ContactUs = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [message, setMessage] = useState("");

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

    return (<div style={{ backgroundColor: "#ffffef" }}>
        <Header />
        <div className="m-5 ">


            <div>
                <div className="d-flex flex-column p-5 mt-4">
                    <h2 className="mb-4">Get in Touch with Us</h2>
                    <p className="">Welcome to Your Home's Contact us page. We're here to assist you any queries, requests or feedback you may have. Whether you're looking to buy or sell a property
                        .explore investment oppurtunities, or simply want to connect, we'ew just a message away. Reach out to us, ans let's start a conversation.
                    </p>
                </div>

                <div className="d-flex gap-2">
                    <div className="d-flex flex-column justify-content-center align-items-center w-25 p-4 rounded gap-3" style={{ backgroundColor: "#fff8d7" }}>
                        <IoMdMail />
                        <p>yourhome12@gmail.com</p>
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center w-25 p-4 rounded gap-3" style={{ backgroundColor: "#fff8d7" }}>
                        <FaPhoneAlt />
                        <p>+91 709880XXXX</p>
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center w-25 p-4 rounded gap-3" style={{ backgroundColor: "#fff8d7" }}>
                        <FaLocationDot />
                        <p>Main Headquarters</p>
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center w-25 p-4 rounded gap-3" style={{ backgroundColor: "#fff8d7" }}>
                        <IoShareSocialSharp />
                        <p>Social Media links</p>
                    </div>
                </div>
            </div>


            {/* Display form and some content */}
            <div className="d-flex flex-column gap-5 p-5">
                <div className="d-flex flex-column gap-4">
                    <h2>Let's Connect</h2>
                    <p>We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need.</p>
                </div>

                {/* form */}
                <div className="d-flex justify-content-center p-4" style={{ backgroundColor: "#fff8d7", borderRadius: "1rem", boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)" }}>
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
        </div>

    </div>)
}

export default ContactUs;