import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminContext from '../../context/admin/adminContext.js';
import { Link } from 'react-router-dom';
import {API_URL} from '../../services/config.js'


const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  const navigateTo = useNavigate();
  const { setIsAdminAuthenticated, setAdmin, admin } = useContext(AdminContext);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCoverImagePreview(reader.result);
      setCoverImage(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('gender', gender);
      formData.append('dob', dob);
      formData.append('avatar', avatar);
      formData.append('coverImage', coverImage);

      const response = await axios.post(
        `${API_URL}/api/v1/admin/register`,
        formData,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setAdmin(response.data);
      setIsAdminAuthenticated(true);
      navigateTo("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333] min-h-screen">
      <div className="relative text-center bg-black sm:min-h-[172px] p-4">
        <h4 className="text-2xl sm:text-3xl font-bold text-white">Admin Registration</h4>
      </div>
      <div className="mx-4 mb-4 -mt-8 sm:-mt-16">
        <form onSubmit={handleRegister} className="max-w-4xl mx-auto bg-white shadow-[0_2px_18px_-3px_rgba(6,81,237,0.4)] p-4 sm:p-8 rounded-md w-full">
          <div className="flex flex-col items-center sm:mt-8">
            <div className="w-full relative sm:mt-8">
              {/* Cover Image Section */}
              <div
                className="w-full h-32 sm:h-48 bg-gray-200 flex items-center justify-center cursor-pointer border border-black"
                // style={{ borderTopLeftRadius: "3rem", borderBottomLeftRadius: "3rem" }}
                onClick={() => document.getElementById('coverImageInput').click()}
              >
                {coverImagePreview ? (
                  <img
                    src={coverImagePreview}
                    alt="Cover Image Preview"
                    className="w-full h-full object-cover"
                    style={{ borderTopLeftRadius: "3rem", borderBottomLeftRadius: "3rem" }}
                  />
                ) : (
                  <span className="text-gray-500 text-sm sm:text-base">Cover image</span>
                )}
              </div>
              
              {/* Avatar Section */}
              <div className="absolute -bottom-8 sm:-bottom-16 left-1/2 transform -translate-x-1/2">
                <div
                  className="w-24 h-24 sm:w-48 sm:h-48 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer border border-black"
                  onClick={() => document.getElementById('avatarInput').click()}
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm sm:text-base">Avatar</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6 mt-20 sm:mt-28">
            {/* Form Fields - Adjusted for mobile */}
            <div className="space-y-5">
              <div>
                <label className="text-sm mb-1 block">Username</label>
                <input 
                  type="text" 
                  className="bg-gray-100 w-full text-sm px-3 py-2 rounded-md outline-black" 
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Email</label>
                <input 
                  type="email" 
                  className="bg-gray-100 w-full text-sm px-3 py-2 rounded-md outline-black" 
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Password</label>
                <input 
                  type="password" 
                  className="bg-gray-100 w-full text-sm px-3 py-2 rounded-md outline-black" 
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Date of Birth</label>
                <input 
                  type="date" 
                  className="bg-gray-100 w-full text-sm px-3 py-2 rounded-md outline-black"
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm mb-1 block">Full Name</label>
                <input 
                  type="text" 
                  className="bg-gray-100 w-full text-sm px-3 py-2 rounded-md outline-black" 
                  placeholder="Full name"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Mobile No.</label>
                <input 
                  type="tel" 
                  className="bg-gray-100 w-full text-sm px-3 py-2 rounded-md outline-black" 
                  placeholder="Phone number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Gender</label>
                <select 
                  className="bg-gray-100 w-full text-sm px-3 py-2 rounded-md outline-black"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm mb-1 block">Role</label>
                <input 
                  type="text" 
                  disabled 
                  className="bg-gray-100 w-full text-sm px-3 py-2 rounded-md cursor-not-allowed" 
                  value="Admin"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center mt-6">
            <input id="terms" type="checkbox" className="h-4 w-4 shrink-0 rounded" />
            <label htmlFor="terms" className="ml-2 text-sm">
              I accept the <Link className="text-black font-semibold hover:underline">Terms</Link>
            </label>
          </div>

          <div className="mt-6 flex justify-center">
            <button 
              type="submit" 
              className="w-full sm:w-auto px-6 py-2 text-sm font-semibold rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
