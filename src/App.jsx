import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home.jsx";
import Menu from "./components/Menu.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Navbar from './components/Navbar.jsx';
import Login from "./components/Login.jsx";
import SignUp from "./components/Signup.jsx";


export default function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

