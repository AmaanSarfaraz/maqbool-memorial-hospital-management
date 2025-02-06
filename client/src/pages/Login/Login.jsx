import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaRegUserCircle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { BsFacebook } from "react-icons/bs";
import AdminContext from '../../context/admin/adminContext';
import PatientContext from '../../context/patient/patientContext';
import { RxCross2 } from "react-icons/rx";
import { ImSpinner9 } from "react-icons/im";
import { API_URL } from '../../services/config';

const Login = () => {
  const { setIsAdminAuthenticated } = useContext(AdminContext);
  const { setIsPatientAuthenticated } = useContext(PatientContext);

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const navigateTo = useNavigate();

  // Forget Password Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/admin/forget-password`,
        { email: resetEmail }
      );
      toast.success(response.data.message);
      setResetEmail('');
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Toggle Password Visibility
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!role) {
        toast.error('Please select a role');
        return;
    }
    
    setLoginLoading(true);
    
    try {
        const response = await axios.post(
            `${API_URL}/api/v1/${role}/login`,
            {
                email: usernameOrEmail,
                username: usernameOrEmail,
                password
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const data = response.data.data;

        // Extract tokens dynamically based on role
        let accessToken, refreshToken;
        if (role === "admin") {
            accessToken = data.adminAccessToken;
            refreshToken = data.adminRefreshToken;
        } else if (role === "patient") {
            accessToken = data.patientAccessToken;
            refreshToken = data.patientRefreshToken;
        }

        // Store tokens separately based on role
        localStorage.setItem(`${role}AccessToken`, accessToken);
        localStorage.setItem(`${role}RefreshToken`, refreshToken);
        
        // Set default Axios authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        toast.success(response.data.message);

        // Redirect & Update Authentication Context
        if (role === "admin") {
            setIsAdminAuthenticated(true);
            navigateTo("/dashboard");
        } else if (role === "doctor") {
            navigateTo("/doctor");
        } else if (role === "patient") {
            setIsPatientAuthenticated(true);
            navigateTo("/");
        }

    } catch (error) {
        toast.error(error.response?.data?.message || 'Invalid Credentials');
    } finally {
        setLoginLoading(false);
    }
};


  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-md rounded-md">
          <div className="md:max-w-md w-full sm:px-6 py-4">
            <form onSubmit={handleLogin}>
              <h3 className="text-3xl font-extrabold mb-12">Sign in</h3>

              <div>
                <label className="text-xs block mb-2">Email/Username</label>
                <div className="relative flex items-center">
                  <input autoComplete='name' type="text" required
                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Enter email or username"
                    onChange={(e) => setUsernameOrEmail(e.target.value)} />
                  <FaRegUserCircle className="absolute right-2 text-gray-400" />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input autoComplete='current-password' type={showPassword ? "text" : "password"} required
                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)} />
                  <button onClick={handleShowPassword} className="absolute right-2">
                    {showPassword ? <FiEye className="text-gray-400" /> : <FiEyeOff className="text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <select name="role" required className="w-full text-sm border-b border-gray-300 px-2 py-3 outline-none"
                  onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>

              <div className="flex items-center justify-between gap-2 mt-5">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="ml-3 text-sm">Remember me</span>
                </label>
                <Link onClick={() => setIsModalOpen(true)} className="text-blue-600 font-semibold text-sm hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 mt-12"
                disabled={loginLoading}>
                {loginLoading ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-sm mt-4 text-center">
                Don't have an account? <Link to={"/patient/register"} className="text-blue-600 font-semibold hover:underline">Register</Link>
              </p>
            </form>
          </div>
          <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8">
            <img src="https://readymadeui.com/signin-image.webp" className="w-full h-full object-contain" alt="login-image" />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center w-full h-full z-[1000] bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-6 relative max-w-lg">
            <RxCross2 onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
            <h4 className="text-3xl text-center font-extrabold my-6">Forget Password</h4>
            <input type="email" placeholder="Enter your email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg" required />
            <button onClick={handleSubmit} className="w-full py-2 bg-blue-600 text-white rounded-md mt-4">
              {loading ? "Sending..." : "Send Email"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
