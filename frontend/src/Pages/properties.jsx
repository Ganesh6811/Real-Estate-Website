import { useEffect, useState } from "react";
import { FaLaptopHouse } from "react-icons/fa";
import { PiHouseSimple } from "react-icons/pi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { LuBedSingle } from "react-icons/lu";
import { PiBathtub } from "react-icons/pi";
import Header from "../Components/Header.component.jsx";
import baseUrl from "../config.jsx";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const PropertiesPage = () => {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get(`${baseUrl}/post/getPosts?type=${type}&city=${search}`, {
                    withCredentials: true,
                });

                if (Array.isArray(result.data.sendPosts)) {
                    setPosts(result.data.sendPosts);
                }
                else {
                    console.log("Received data is not array");
                }
            }
            catch (err) {
                console.log("Error fetching the posts in properties page: ", err);
            }
        }

        getData();
    }, [type, search]);


    const onClickPost = async(id)=>{ 
         navigate(`/post/${id}`);
    }

    return (
        <div>
            <div
                style={{
                    backgroundImage: `url('/propertiesBackGroundPage.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                }}
            >
                {/* Navigation Bar */}
                <div>
                    <Header />
                </div>


                <div className='d-flex justify-content-center align-items-center flex-column gap-2'
                    style={{
                        marginTop: "10%",
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                    }}>
                    <div>
                        <button className='btn btn-outline-light rounded-pill' style={{ fontSize: "10px", color: "#1F4B43", fontWeight: "600" }}>LET US GUIDE YOUR HOME</button>
                    </div>

                    <div>
                        <div className="d-flex flex-column ">
                            <p className='mb-1'
                                style={{
                                    fontSize: "45px",
                                    width: "500px",
                                    color: "#1F4B43",
                                    fontWeight: "750"
                                }}>Belive in finding it</p>
                            <p style={{ color: "#1F4B43", fontWeight: "600" }}>Search properties for sale and to rent in popular cities</p>
                        </div>

                    </div>

                    <div className="mt-5">
                        <form>
                            <div className='d-flex gap-4 justify-content-center mb-2'>
                                <button className='btn btn-outline-light rounded-pill' style={{ border: "none", color: "#1F4B43" }}>Rent</button>
                                <button className='btn btn-outline-light rounded-pill' style={{ border: "none", color: "#1F4B43" }}>Buy</button>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <input
                                    className="form-control rounded-pill rounded-end-0 "
                                    style={{ width: "70vh", height: "8vh", color: "black", '::placeholder': { color: 'black' } }}
                                    type="search"
                                    placeholder="Enter Name, Keywords..."
                                    onChange={(e) => { setSearch(e.target.value) }}
                                />
                                <button
                                    className="btn btn-warning rounded-pill rounded-start-0"
                                    type="submit"
                                >
                                    <i className="bi bi-search"></i>
                                </button>

                            </div>
                        </form>
                        <p className="mt-5" style={{ color: "white", fontWeight: "500" }}>what are you looking for ?</p>
                    </div>

                </div>
            </div>

            <div className="d-flex flex-column align-items-center gap-5" style={{ marginTop: "8%", height: "70vh" }} >
                <div className="">
                    <h1 style={{ fontWeight: "600", fontSize: "40px" }}>Why you should work with us</h1>
                    <p style={{ fontWeight: "500", textAlign: "center" }}>Find your place to call home — where dreams meet addresses</p>
                </div>
                <div className="d-flex justify-content-center gap-5">
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: "23%" }}>
                        <FaLaptopHouse style={{ height: "50px", width: "50px" }} />
                        <h5 style={{ textAlign: "center" }}>Wide Range of Properties</h5>
                        <p style={{ textAlign: "center" }}>We offer expert legal help for all releated property items in Dubai</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: "23%" }}>
                        <PiHouseSimple style={{ height: "50px", width: "50px" }} />
                        <h5 style={{ textAlign: "center" }}>Buy or Rent Homes</h5>
                        <p style={{ textAlign: "center" }}>We sell your home at the best market price and very quickly as well</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: "23%" }}>
                        <VscWorkspaceTrusted style={{ height: "50px", width: "50px" }} />
                        <h5 style={{ textAlign: "center" }}>Trusted by Thousands</h5>
                        <p style={{ textAlign: "center" }}>We offer you free consultancy to get a loan for your new home</p>
                    </div>
                </div>
            </div>

            {/* Displaying the posts */}
            <div className="mb-5" style={{ marginLeft: "10%", marginRight: "10%" }}>
                <div className="d-flex flex-column align-items-center flex-wrap">
                    <h1>Featured Properties</h1>
                    <p style={{ fontWeight: "500" }}>Discover our finest — curated properties that define premium living</p>
                </div>

                <div className="d-flex m-5 gap-5 justify-content-center flex-wrap">
                    <button className="p-2 fw-semibold bg-white" style={{outline:`${(type==="") ? "solid":"none"}` , borderRadius:"20px", fontWeight:"400", border:"none"}} onClick={()=>setType("")}>All Properties</button>
                    <button className="p-2 fw-semibold bg-white" style={{outline:`${(type==="Rent") ? "solid":"none"}`, border:"none",  borderRadius:"20px", fontWeight:"400"}} onClick={()=>setType("Rent")}>For Rent</button>
                    <button className="p-2 fw-semibold bg-white" style={{outline:`${(type==="Buy") ? "solid":"none"}`, border:"none", borderRadius:"20px", fontWeight:"400"}} onClick={()=>setType("Buy")}>For Sale</button>
                </div>

                <div className="d-flex flex-wrap gap-5 justify-content-center">
                    {Array.isArray(posts) &&
                        posts.filter(post => post !== null).map((post, index) => (
                            <div
                                key={index}
                                className="rounded shadow"
                                style={{
                                    backgroundImage: `url(${post.images[0]})`,
                                    width: "400px",
                                    height: "300px",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    position: "relative",
                                    color: "white",
                                    overflow: "hidden"
                                }}

                                onClick={()=>onClickPost(post._id)}
                            >
                                <div
                                    className="d-flex flex-column justify-content-end p-3"
                                    style={{
                                        background: "rgba(0, 0, 0, 0.5)",
                                        height: "100%",
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        right: 0
                                    }}
                                >
                                    <h3 className="mb-1">{post.title}</h3>
                                    <p className="mb-1">City: {post.city}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-0 fw-bold">${post.price}</p>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="d-flex align-items-center gap-1">
                                                <LuBedSingle />
                                                <span>{post.bedRooms}</span>
                                            </div>
                                            <div className="d-flex align-items-center gap-1">
                                                <PiBathtub />
                                                <span>{post.bathRooms}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    )
}

export default PropertiesPage