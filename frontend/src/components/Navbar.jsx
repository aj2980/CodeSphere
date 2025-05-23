import React from 'react';
import logo from "../images/logo.jpg";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="nav flex px-[100px] items-center justify-between h-[90px] bg-[#0f0e0e]">
      {/* Logo */}
      <div className="logo flex items-center">
        <img src={logo} className="h-[70px] object-contain" alt="Logo" />
      </div>

      {/* Links */}
      <div className="links flex items-center gap-[30px]">
        <Link to="/" className="transition-all hover:text-blue-500 text-white">Home</Link>
        <Link to="/about" className="transition-all hover:text-blue-500 text-white">About</Link>
        {/* <Link to="/services" className="transition-all hover:text-blue-500 text-white">Services</Link> */}
        <Link to="/contact" className="transition-all hover:text-blue-500 text-white">Contact</Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          className="btnNormal bg-red-500 transition-all hover:bg-red-600 px-[20px]"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
