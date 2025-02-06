import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../../services/config'


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/api/v1/admin/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });
      setMessage(response.data.message || 'Password reset successfully');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="font-[sans-serif] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div className="max-md:text-center">
            <a href="/">
              <img
                src="https://readymadeui.com/readymadeui-white.svg"
                alt="logo"
                className="w-52 mb-10 inline-block"
              />
            </a>
            <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">
              Seamless Login for Exclusive Access
            </h2>
            <p className="text-sm mt-6 text-white">
              Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full">
            <h3 className="text-3xl font-extrabold mb-12 max-md:text-center">
              Reset Password
            </h3>
            <div>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                name="newPassword"
                type="password"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#333]"
                placeholder="New password"
              />
            </div>
            <div>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                name="confirmPassword"
                type="password"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#333]"
                placeholder="Confirm new password"
              />
            </div>
            {message && (
              <div className="text-red-500 text-sm mt-4">
                {message}
              </div>
            )}
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#333] hover:bg-[#222] focus:outline-none"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
