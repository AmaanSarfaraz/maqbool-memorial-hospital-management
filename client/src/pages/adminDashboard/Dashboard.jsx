import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminContext from '../../context/admin/adminContext.js';
import PatientContext from '../../context/patient/patientContext.js';
import DoctorContext from '../../context/doctor/doctorContext.js';
import AppointmentContext from '../../context/appointment/appointmentContext.js';
import MessageContext from '../../context/message/messageContext.js';
import { MdOutlineDashboard, MdMenu } from "react-icons/md";
import { LuUserRound, LuMail, LuUser } from "react-icons/lu";
import { FaRegClock, FaUserDoctor } from "react-icons/fa6";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { LiaFileMedicalAltSolid } from "react-icons/lia";
import { FaPowerOff } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import AllAppointments from './AllAppointments';
import AllPatients from './AllPatients';
import AllDoctors from './AllDoctors';
import AllMessages from './AllMessages';
import AdminRegister from './RegisterAdmin.jsx';
import DoctorRegister from './RegisterDoctor.jsx';
import Blogs from '../Blog/Blogs.jsx';
import AdminProfile from './Profile';
import AllAdmins from './AllAdmins';
import Clock from '../../components/Clock.jsx';
import { API_URL } from '../../services/config.js';

const Dashboard = () => {
  const { admin, setIsAdminAuthenticated } = useContext(AdminContext);
  const { allPatients } = useContext(PatientContext);
  const { doctors } = useContext(DoctorContext);
  const { appointments } = useContext(AppointmentContext);
  const { messages } = useContext(MessageContext);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile toggle
  const navigateTo = useNavigate();

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    setIsSidebarOpen(false); // Close sidebar on mobile when an element is clicked
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/v1/admin/logout`,
        null,
        { withCredentials: true }
      ).then(res => {
        toast.success(res.data.message);
        localStorage.removeItem('adminAccessToken');
        localStorage.removeItem('adminRefreshToken');
        delete axios.defaults.headers.common['Authorization'];
        setIsAdminAuthenticated(false);
        navigateTo('/login');
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar Toggle Button for Small Screens */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-2 left-2 z-50 p-2 bg-black text-white rounded-lg md:hidden"
      >
        <MdMenu className="w-6 h-6" />
      </button>

      {/* Fixed Sidebar */}
      <nav
        className={`bg-black h-screen fixed top-0 left-0 w-64 py-6 px-4 font-[sans-serif] flex flex-col overflow-auto transform transition-transform duration-300 ease-in-out z-10
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0`}
      >
        <div className="flex flex-col items-center cursor-pointer">
          <div className="bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center font-bold text-black text-xl overflow-hidden">
            <img src={admin?.avatar} alt="admin" className="w-full h-full object-cover" />
          </div>
          <div className="text-center mt-4">
            <p className="text-base text-white">{admin?.username}</p>
            <p className="text-xs text-gray-300 mt-0.5">{admin?.email}</p>
          </div>
        </div>

        <hr className="mt-4 border-gray-600" />

        <ul className="space-y-2 mt-2">
          <li>
            <Link
              onClick={() => handleComponentChange(null)}
              className="focus:text-green-400 active:text-green-400 text-gray-300 hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all"
            >
              <MdOutlineDashboard className="w-[22px] h-[22px] mr-4" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleComponentChange('patients')}
              className="focus:text-green-400 active:text-green-400 text-gray-300 hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all"
            >
              <LiaFileMedicalAltSolid className="w-[22px] h-[22px] mr-4" />
              <span>Patients</span>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleComponentChange('doctors')}
              className="focus:text-green-400 active:text-green-400 text-gray-300 hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all"
            >
              <FaUserDoctor className="w-[22px] h-[22px] mr-4" />
              <span>Doctors</span>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleComponentChange('admins')}
              className="focus:text-green-400 active:text-green-400 text-gray-300 hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all"
            >
              <RiAdminLine className="w-[22px] h-[22px] mr-4" />
              <span>Admins</span>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleComponentChange('myBlogs')}
              className="focus:text-green-400 active:text-green-400 text-gray-300 hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all"
            >
              <AiOutlinePlusSquare className="w-[22px] h-[22px] mr-4" />
              <span>Blogs</span>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleComponentChange('appointments')}
              className="focus:text-green-400 active:text-green-400 text-gray-300 hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all"
            >
              <FaRegClock className="w-[22px] h-[22px] mr-4" />
              <span>Appointments</span>
            </Link>
          </li>
        </ul>

        <hr className="my-4 border-gray-600" />
        <ul className="space-y-3">
          <li>
            <Link
              onClick={() => handleComponentChange('doctorRegister')}
              className="focus:text-green-400 active:text-green-400 text-gray-300 hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all"
            >
              <LuUser className="w-[22px] h-[22px] mr-4" />
              <span>Add Doctor</span>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleComponentChange('adminRegister')}
              className="focus:text-green-400 active:text-green-400 text-gray-300 hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all"
            >
              <GrUserAdmin className="w-[22px] h-[22px] mr-4" />
              <span>Add Admin</span>
            </Link>
          </li>
        </ul>
        <hr className="my-8 border-gray-600" />
        <ul className="space-y-3">
          <li>
            <Link
              onClick={() => handleComponentChange('messages')}
              className="focus:text-green-400 active:text-green-400 text-gray-300 hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all"
            >
              <LuMail className="w-[22px] h-[22px] mr-4" />
              <span>Inbox</span>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleComponentChange('adminProfile')}
              className="focus:text-green-400 active:text-green-400 text-gray-300 hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all"
            >
              <LuUserRound className="w-[22px] h-[22px] mr-4" />
              <span>Profile</span>
            </Link>
          </li>
          <hr className="my-8 border-gray-600" />
          <li onClick={handleLogout}>
            <Link className="focus:text-red-400 active:text-red-400 text-gray-300 hover:text-white text-md flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all">
              <FaPowerOff className="w-[22px] h-[22px] mr-4" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="ml-0 md:ml-64 transition-all duration-300 w-full overflow-auto">
        {/* Show default dashboard content only if no component is selected */}
        {selectedComponent === null && (
          <div className='m-8'>
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-center relative">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Welcome <span className="text-green-600">{admin?.username && admin.username.toUpperCase()}</span> to the Dashboard
                </h2>
                <p>Welcome to the Admin Dashboard: Your Central Hub for Efficient Management and Oversight.</p>
              </div>
              <div className="md:absolute right-4 mt-8 mr-14 sm:mr-0">
                <Clock />
              </div>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">Total Patients</h3>
                  <p className="text-gray-600">{allPatients.length}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">Total Appointments</h3>
                  <p className="text-gray-600">{appointments.length}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">Total Doctors</h3>
                  <p className="text-gray-600">{doctors.length}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">Total Messages</h3>
                  <p className="text-gray-600">{messages.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render only the selected component if one is chosen */}
        {selectedComponent === 'appointments' && <AllAppointments />}
        {selectedComponent === 'patients' && <AllPatients />}
        {selectedComponent === 'doctors' && <AllDoctors />}
        {selectedComponent === 'messages' && <AllMessages />}
        {selectedComponent === 'admins' && <AllAdmins />}
        {selectedComponent === 'adminProfile' && <AdminProfile />}
        {selectedComponent === 'myBlogs' && <Blogs />}
        {selectedComponent === 'adminRegister' && <AdminRegister />}
        {selectedComponent === 'doctorRegister' && <DoctorRegister />}
      </div>
    </div>
  );
};

export default Dashboard;
