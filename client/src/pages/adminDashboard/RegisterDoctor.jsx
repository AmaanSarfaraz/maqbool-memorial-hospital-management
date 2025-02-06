import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import DoctorContext from '../../context/doctor/doctorContext';
import {API_URL} from '../../services/config'


const DoctorRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [docAvatar, setDocAvatar] = useState(null);
  const [docAvatarPreview, setDocAvatarPreview] = useState(null);

  const navigateTo = useNavigate();
  const { doctors, setDoctors, isDoctorAuthenticated, setIsDoctorAuthenticated, loading } = useContext(DoctorContext);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('gender', gender);
      formData.append('dob', dob);
      formData.append('specialisation', specialisation);
      formData.append('doctorDepartment', doctorDepartment);
      formData.append('qualification', qualification);
      formData.append('experience', experience);
      formData.append('docAvatar', docAvatar);

      const response = await axios.post(
        `${API_URL}/api/v1/admin/register/doctor`,
        formData,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setDoctors(response.data);
      navigateTo("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333] h-screen w-full">
      <div className=" relative text-center bg-black min-h-[172px] sm:p-6 p-4">
        <h4 className="sm:text-3xl text-2xl font-bold text-white">Doctor Registration</h4>
      </div>
      <div className="mx-4 mb-4 mt-6">
        <form onSubmit={handleRegister} className=" max-w-4xl mx-auto bg-white shadow-[0_2px_18px_-3px_rgba(6,81,237,0.4)] sm:p-8 p-4 rounded-md">
            <div className="">
                <div className="mx-auto">
                    <div className="w-full relative">
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                            <div
                                    className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer border border-black"
                                    onClick={() => document.getElementById('docAvatarInput').click()}
                                >
                                    {docAvatarPreview ? (
                                    <img
                                        src={docAvatarPreview}
                                        alt="Avatar Preview"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                    ) : (
                                    <span className="text-gray-500">Avatar</span>
                                    )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                id="docAvatarInput"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-y-7 gap-x-12 mt-8">
                
                <div>
                <label className="text-sm mb-2 block">Full Name</label>
                <input autoComplete="name" name="name" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-black" placeholder="Enter Full name" onChange={(e) => setFullName(e.target.value)}/>
                </div>
                <div>
                <label className="text-sm mb-2 block">Email Id</label>
                <input autoComplete="email" name="email" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-black" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                <label className="text-sm mb-2 block">Mobile No.</label>
                <input autoComplete="tel" name="number" type="number" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-black" placeholder="Enter mobile number" onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div>
                <label className="text-sm mb-2 block">Password</label>
                <input autoComplete="current-password" name="password" type="password" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-black" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                  <label className="text-sm mb-2 block">Gender</label>
                  <div className="relative flex items-center">
                    <select
                        name="gender"
                        required
                        className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-black"
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="" className='text-sm block mb-2'>Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                <label className="text-sm mb-2 block">Dob</label>
                <input autoComplete="bday" name="dob" type="date" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-black" placeholder="Enter dob" onChange={(e) => setDob(e.target.value)}/>
                </div>
                <div>
                <label className="text-sm mb-2 block">Specialisation</label>
                <input autoComplete="specialisation" name="name" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-black" placeholder="specialisation" onChange={(e) => setSpecialisation(e.target.value)}/>
                </div>
                <div>
                <label className="text-sm mb-2 block">Doctor Department</label>
                <input autoComplete="name" name="name" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-black" placeholder="doctor department" onChange={(e) => setDoctorDepartment(e.target.value)}/>
                </div>
                <div>
                <label className="text-sm mb-2 block">Qualification</label>
                <input autoComplete="name" name="name" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-black" placeholder="qualification" onChange={(e) => setQualification(e.target.value)}/>
                </div>
                <div>
                <label className="text-sm mb-2 block">Experience</label>
                <input autoComplete="name" name="name" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-black" placeholder="experience" onChange={(e) => setExperience(e.target.value)}/>
                </div>
                <div>
                <label className="text-sm mb-2 block">Role</label>
                <input autoComplete="role" name="role" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-black cursor-not-allowed placeholder-black" placeholder="Doctor" disabled/>
                </div>
            </div>
            <div className="flex items-center mt-8">
                <input autoComplete="on" id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 rounded" />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                I accept the <Link className="text-black-500 font-semibold hover:underline ml-1">Terms and Conditions</Link>
                </label>
            </div>
            <div className="!mt-10">
                <button type="submit" className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded-md text-white bg-black hover:bg-white hover:text-black border-2 border-black focus:outline-none">
                Sign up
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}


export default DoctorRegister;
