import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import axios from "axios";

import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import SignUp from "./Pages/SignUp.jsx";
import PropertiesPage from "./Pages/properties.jsx";
import DisplaySinglePost from "./Pages/Display.single.page.jsx";
import AboutMe from "./Pages/AboutMe.page.jsx";
import ContactUs from "./Pages/ContactUs.page.jsx";

import useAuthStore from "./Store/Auth.store.jsx";

function App() { 
  const { isAuthenticated, isLoading, fetchUser } = useAuthStore();

  useEffect(() => { 
    const getData = async()=>{
      await fetchUser();
    }
    getData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />}/>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />}/>
          <Route path="/signUp" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />}/>
          <Route path="/properties" element={!isAuthenticated ? <Login /> : <PropertiesPage />} />
          <Route path="/post/:id" element={!isAuthenticated ? <Login /> : <DisplaySinglePost />}/>
          <Route path="/aboutMe" element={!isAuthenticated ? <Login /> : <AboutMe />} />
          <Route path="/contactUs" element={!isAuthenticated ? <Login /> : <ContactUs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
