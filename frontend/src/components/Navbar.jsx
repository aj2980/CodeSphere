import React from 'react';
import logo from "../images/logo.png";
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
        <Link className="transition-all hover:text-blue-500 text-white">Home</Link>
        <Link className="transition-all hover:text-blue-500 text-white">About</Link>
        <Link className="transition-all hover:text-blue-500 text-white">Services</Link>
        <Link className="transition-all hover:text-blue-500 text-white">Contact</Link>
      </div>
    </div>
  );
};

export default Navbar;
