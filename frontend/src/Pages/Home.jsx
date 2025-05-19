import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import { FaHouseUser } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { FaLaptopHouse } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


import Header from '../Components/Header.component.jsx';
import baseUrl from "../config.jsx";



const Home = () => {
  const [type, setType] = useState("rent");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`${baseUrl}/post/getPosts`, {
          withCredentials: true,
        });

        if (Array.isArray(result.data.sendPosts)) {
          setPosts(result.data.sendPosts);
        } else {
          console.log("Received data is not an array:", result.data);
        }
      } catch (err) {
        console.log("Error Getting posts in Home page:", err);
      }
    };


    getData();
  }, []);

  const onClickPost = (id)=>{
    navigate(`/post/${id}`);
  }

  return (
    <div>
      <div
        style={{
          backgroundImage: `url('/Home_page_bg.png')`,
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

        {/* First cover page */}
        <div className='d-flex justify-content-center align-items-center flex-column gap-2'
          style={{
            marginTop: "10%",
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}>
          <div>
            <button className='btn btn-outline-light rounded-pill' style={{ fontSize: "10px" }}>LET US GUIDE YOUR HOME</button>
          </div>

          <div>
            <p className='text-white'
              style={{
                fontSize: "50px",
                width: "500px"
              }}>Discover a Place you'll love to Live</p>
          </div>

          <div>
            <form>
              <div className='d-flex gap-4 justify-content-center mb-2'>
                <button className='btn btn-outline-light rounded-pill' style={{ border: "none" }}>Rent</button>
                <button className='btn btn-outline-light rounded-pill' style={{ border: "none" }}>Buy</button>
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
          </div>

        </div>
      </div>



      {/* Showing the homes */}
      <div className='d-flex flex-column justify-content-center align-items-center vh-100 ' style={{ marginTop: "10%" }}>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <h1 className='fs-1'>Homes For You</h1>
          <p>Here are some lovely homes</p>
        </div>

        {/* Displaying the posts */}
        <div className='d-flex flex-wrap justify-content-center gap-4 mt-4'>
          {Array.isArray(posts) && posts.filter(post => post !== null).map((post, index) => (
            <div key={index} className='card' style={{ width: '18rem' }} onClick={()=>onClickPost(post._id)}>
              {post.images && post.images.length > 0 ? (
                <img
                  src={post.images[0]}
                  className='card-img-top'
                  alt={post.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              ) : (
                <img
                  src="fallback_image_url" 
                  className='card-img-top'
                  alt={post.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className='card-body'>
                <h5 className='card-title d-flex justify-content-between'>
                  {post.title}
                  <span className='text-danger fw-bold'>
                    {post.type === 'rent' ? `$${post.price}/month` : `$${post.price.toLocaleString()}`}
                  </span>
                </h5>
                <p className='card-text'>
                  <i className='bi bi-geo-alt-fill'></i> {post.city}
                </p>
                <div className='d-flex justify-content-between'>
                  <span><i className='bi bi-house'></i> {post.bedRooms} Beds</span>
                  <span><i className='bi bi-bathtub'></i> {post.bathRooms} Baths</span>
                  <span><i className='bi bi-aspect-ratio'></i> {post.area || 450} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Why choose us */}
      <div className='d-flex flex-column justify-content-center align-items-center vh-100 w-100 gap-5'
        style={{ backgroundColor: "#E7C873", marginTop: "10%" }}>
        <div>
          <h1>Why Choose Us</h1>
          <p style={{textAlign:"center"}}>Home is not a place… it's a feeling.</p>
        </div>

        <div className='d-flex justify-content-center gap-4'>
          <div className='d-flex gap-2 flex-column align-items-center' style={{width:"300px"}}>
            <FaLaptopHouse style={{height:"50px", width:"50px"}}/>
            <h4>Find your future home</h4>
            <p style={{textAlign:"center"}}>We help ypu find a new home by offering a smart real estate experience</p>
          </div>

          <div className='d-flex gap-2 flex-column align-items-center' style={{width:"300px"}}>
            <FaHouseUser style={{height:"50px", width:"50px"}}/>
            <h4>Buy or rent homes</h4>
            <p style={{textAlign:"center"}}>Millions of houses and apartments in your favourite cities</p>
          </div>

          <div className='d-flex gap-2 flex-column align-items-center' style={{width:"300px"}}>
            <GrUserManager style={{height:"50px", width:"50px"}}/>
            <h4>Trustworthy persons</h4>
            <p style={{textAlign:"center"}}>We have the trustworthy people that we can lean</p>
          </div>

          <div className='d-flex gap-2 flex-column align-items-center' style={{width:"300px"}}>
            <FaComputer style={{height:"50px", width:"50px"}}/>
            <h4>List your own property</h4>
            <p style={{textAlign:"center"}}>Sign up now and sell or rent your own properties</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
