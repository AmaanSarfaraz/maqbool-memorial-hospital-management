import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from './pages/Register/Register';
import Team from './pages/Team/Team';
import Services from './pages/Services/Services';
import Profile from './pages/patientDashboard/Profile';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Dashboard from './pages/adminDashboard/Dashboard';
import Doctor from './pages/adminDashboard/AllDoctors';
import AdminContextProvider from './context/admin/AdminProvider';
import DoctorContextProvider from './context/doctor/DoctorProvider';
import PatientContextProvider from './context/patient/PatientProvider';
import Appointment from './pages/patientDashboard/BookAppointment';
import AdminRegister from './pages/adminDashboard/RegisterAdmin';
import PrivateRoute from './context/admin/privateRoute.js';
import BlogContextProvider from './context/blog/BlogProvider.jsx';
import BlogCreate from './pages/Blog/CreateBlog.jsx';
import MyBlogs from './pages/patientDashboard/MyBlogs.jsx';
import Blogs from './pages/Blog/Blogs.jsx';
import BlogEdit from "./pages/Blog/EditBlog.jsx";
import AppointmentContextProvider from './context/appointment/AppointmentProvider.jsx';
import MyAppointments from './pages/patientDashboard/MyAppointments.jsx';
import MessageContextProvider from './context/message/MessageProvider.jsx';
import ResetPassword from './pages/patientDashboard/ResetPassword.jsx';

const App = () => {
  return (
    <>
      <DoctorContextProvider>
        <AdminContextProvider>
          <PatientContextProvider>
            <AppointmentContextProvider>
              <MessageContextProvider>
                <BlogContextProvider>
                  <Router>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/patient/register" element={<Registration />} />
                      <Route path="/reset-password/:token" element={<ResetPassword />} />
                      <Route path="/admin/register" element={<AdminRegister />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/blog/create" element={<BlogCreate />} />
                      <Route path="/my-blogs" element={<MyBlogs />} />
                      <Route path="/blogs/update/:blogId" element={<BlogEdit />} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                      <Route path="/doctor" element={<Doctor />} />
                      <Route path="/appointment" element={<Appointment />} />
                      <Route path="/my-appointments" element={<MyAppointments />} />
                    </Routes>
                  </Router>
                </BlogContextProvider>
              </MessageContextProvider>
            </AppointmentContextProvider>
          </PatientContextProvider>
        </AdminContextProvider>
      </DoctorContextProvider>
      <ToastContainer position='top-center' />
    </>
  );
};

export default App;
