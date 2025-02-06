import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminContext from '../context/admin/adminContext';
import PatientContext from '../context/patient/patientContext';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { API_URL } from '../services/config';
import logo from "../assets/logo-mm.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isPatientAuthenticated, setIsPatientAuthenticated, patient, setPatient } = useContext(PatientContext);
  const { isAdminAuthenticated } = useContext(AdminContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const menuRef = useRef(null);

  const getLinkClass = (path) => {
    return currentPath === path
      ? 'text-green-400 font-semibold'
      : 'text-white hover:text-green-400';
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleBlogDropdown = () => {
    setIsBlogOpen(!isBlogOpen);
  };

  const toggleAppointmentDropdown = () => {
    setIsAppointmentOpen(!isAppointmentOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = useNavigate();

  const gotoLogin = async () => {
    navigateTo('/login');
  };

  const gotoProfile = async () => {
    navigateTo('/profile');
  };

  const gotoPatientRegister = async () => {
    navigateTo('/patient/register');
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/patient/logout`, null, {
        withCredentials: true,
      });
      setIsPatientAuthenticated(false);
      setPatient(null);
      toast.success(response.data.message);
      localStorage.removeItem('patientAccessToken');
      localStorage.removeItem('patientRefreshToken');
      delete axios.defaults.headers.common['Authorization'];
      navigateTo('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const firstLetter = patient?.fullName?.[0].toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {!isAdminAuthenticated && (
        <header className="flex shadow-md py-4 px-4 sm:px-10 bg-[#0077B6] font-[sans-serif] min-h-[70px] tracking-wide sticky top-0 z-50">
          <div className="flex flex-wrap items-center justify-between gap-5 w-full">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-32 sm:w-32 lg:w-40 h-12"
              />
            </Link>

            <div
              id="collapseMenu"
              ref={menuRef}
              className={`lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 ${
                isMenuOpen ? 'block' : 'hidden'
              }`}
            >
              <ul
                className={`lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-[#0077B6] max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 ${
                  isMenuOpen ? 'block' : 'hidden'
                }`}
              >
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                  <Link className={` block font-semibold text-[15px] ${getLinkClass('/')}`} to="/" onClick={toggleMenu}>
                    Home
                  </Link>
                </li>
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                  <Link className={` block font-semibold text-[15px] ${getLinkClass('/team')}`} to="/team" onClick={toggleMenu}>
                    Team
                  </Link>
                </li>
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                  <Link className={` block font-semibold text-[15px] ${getLinkClass('/services')}`} to="/services" onClick={toggleMenu}>
                    Services
                  </Link>
                </li>
                {!isPatientAuthenticated ? (
                  <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                    <Link className={` block font-semibold text-[15px] ${getLinkClass('/blogs')}`} to="/blogs" onClick={toggleMenu}>
                      Blog
                    </Link>
                  </li>
                ) : (
                  <div className="relative font-[sans-serif] mx-auto max-lg:border-b border-gray-300">
                    <button className={` max-lg:py-3 px-3`}>
                      <Link to="/blogs" className={` font-semibold text-[15px] ${getLinkClass('/blogs')}`} onClick={toggleMenu}>
                        Blog
                      </Link>
                      <MdOutlineKeyboardArrowDown onClick={toggleBlogDropdown} className="w-6 text-black inline ml-2" />
                    </button>
                    {isBlogOpen && (
                      <ul className="absolute shadow-lg bg-white z-[1000] min-w-full w-max rounded max-h-96 overflow-auto">
                        <li
                          onClick={() => { toggleBlogDropdown(); toggleMenu(); }}
                          className="py-2.5 px-6  text-black text-sm cursor-pointer hover:text-[#007bff] font-semibold"
                        >
                          <Link to="/my-blogs">My Blogs</Link>
                        </li>
                        <li
                          onClick={() => { toggleBlogDropdown(); toggleMenu(); }}
                          className="py-2.5 px-6  text-black text-sm cursor-pointer hover:text-[#007bff] font-semibold"
                        >
                          <Link to="/blog/create">Create Blog</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                  <Link className={` block font-semibold text-[15px] ${getLinkClass('/about')}`} to="/about" onClick={toggleMenu}>
                    About
                  </Link>
                </li>
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                  <Link className={` block font-semibold text-[15px] ${getLinkClass('/contact')}`} to="/contact" onClick={toggleMenu}>
                    Contact
                  </Link>
                </li>
                {isPatientAuthenticated && (
                  <div className="relative font-[sans-serif] mx-auto max-lg:border-b border-gray-300">
                    <button className={` max-lg:py-3 px-3`}>
                      <Link to="/appointment" className={`font-semibold text-[15px] ${getLinkClass('/appointment')}`} onClick={toggleMenu}>
                        Appointment
                      </Link>
                      <MdOutlineKeyboardArrowDown
                        onClick={toggleAppointmentDropdown}
                        className="w-6 text-black inline ml-2"
                      />
                    </button>
                    {isAppointmentOpen && (
                      <ul className="absolute shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto">
                        <li
                          onClick={() => { toggleAppointmentDropdown(); toggleMenu(); }}
                          className="py-2.5 px-6 text-black text-sm cursor-pointer hover:text-[#007bff] font-semibold"
                        >
                          <Link to="/my-appointments">My Appointments</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </ul>
            </div>

            <div className="flex max-lg:ml-auto space-x-3">
              {isPatientAuthenticated ? (
                <button
                  className="font-semibold text-[15px] border-none outline-none text-black hover:underline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="font-semibold text-[15px] border-none outline-none text-white hover:underline"
                  onClick={gotoLogin}
                >
                  Login
                </button>
              )}
              {isPatientAuthenticated ? (
                <button
                  className="flex items-center justify-center px-1 py-1 text-sm rounded-full font-bold text-white bg-blue-600 border-2 border-blue-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-blue-600"
                  onClick={gotoProfile}
                >
                  <div className="w-10 h-10 text-xl text-white bg-blue-600 flex items-center justify-center cursor-pointer rounded-full mx-auto font-[sans-serif]">
                    {firstLetter}
                  </div>
                </button>
              ) : (
                <div className="relative font-[sans-serif] w-max mx-auto">
                  <button
                    className={`px-6 py-2 flex items-center rounded-full text-sm font-semibold border-2 border-gray-300 outline-none bg-white text-black `}
                    onClick={gotoPatientRegister}
                  >
                    Sign Up
                  </button>
                </div>
              )}
              <button id="toggleOpen" className="lg:hidden" onClick={toggleMenu}>
                {isMenuOpen ? <IoClose className="w-7 h-7" /> : <GiHamburgerMenu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;