import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from "../assets/logo-mm.png"

const Footer = () => {
  return (
    <footer className="bg-[#0077B6] p-6 sm:p-10 font-[sans-serif] tracking-wide">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="flex justify-center sm:justify-start lg:justify-start lg:items-center">
          <Link to="/">
            <img src={logo} alt="Hospital Logo" className="w-36 sm:w-44 lg:w-52 h-auto" />
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center lg:justify-start lg:items-center">
          <ul className="flex space-x-4 sm:space-x-6">
            <li>
              <Link to="/social-media">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-300 hover:fill-white w-6 sm:w-7 h-6 sm:h-7" viewBox="0 0 24 24">
                  {/* Replace with appropriate icon */}
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/social-media">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-300 hover:fill-white w-6 sm:w-7 h-6 sm:h-7" viewBox="0 0 24 24">
                  {/* Replace with appropriate icon */}
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/social-media">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-300 hover:fill-white w-6 sm:w-7 h-6 sm:h-7" viewBox="0 0 24 24">
                  {/* Replace with appropriate icon */}
                </svg>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">Contact Us</h4>
          <ul className="space-y-2 sm:space-y-4">
            <li>
              <Link to="/contact/email" className="text-gray-300 hover:text-white text-sm">Email</Link>
            </li>
            <li>
              <Link to="/contact/phone" className="text-gray-300 hover:text-white text-sm">Phone</Link>
            </li>
            <li>
              <Link to="/contact/address" className="text-gray-300 hover:text-white text-sm">Address</Link>
            </li>
          </ul>
        </div>

        {/* Information Section */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">Information</h4>
          <ul className="space-y-2 sm:space-y-4">
            <li>
              <Link to="/about-us" className="text-gray-300 hover:text-white text-sm">About Us</Link>
            </li>
            <li>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <p className='text-gray-300 text-center text-xs sm:text-sm mt-6 sm:mt-10'>
        © 2023
        <Link to='https://hospitalwebsite.com/' target='_blank' className="hover:underline mx-1">HospitalName</Link>
        All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
