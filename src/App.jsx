import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home.jsx";
import Menu from "./components/Menu.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import LoginDashboard from "./components/LoginDashboard.jsx";
import SignUp from "./components/Signup.jsx";
import Footer from "./components/Footer.jsx";
import FAQs from "./components/FAQs.jsx";
import Cart from "./components/Cart.jsx";
import Careers from "./components/Careers.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
//import { onAuthStateChanged } from 'firebase/auth';
//import { auth } from './js/firebase.js';

export default function App() {
  
  //access the user auth to determine log-in user
  const { user } = useAuth();
  
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={user ? <Navigate to="/logindashboard" /> : <Login /> } />
          <Route path="/logindashboard" element={<ProtectedRoute><LoginDashboard /></ProtectedRoute> } />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/careers" element={<Careers />} />
        </Routes>
      <Footer />
    </>
  )
}

