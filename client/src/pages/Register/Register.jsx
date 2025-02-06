import axios from 'axios';
import React, {useState, useContext} from 'react';
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PatientContext from '../../context/patient/patientContext';
import {API_URL} from '../../services/config';
import { Link } from 'react-router-dom';



const Registration = () => {

  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")
  const [bloodGroup, setBloodGroup] = useState("")
  const [medicalHistory, setMedicalHistory] = useState("")
  const [address, setAddress] = useState("")


  const navigateTo = useNavigate()
  const { isPatientAuthenticated, setIsPatientAuthenticated, setPatient, setAllPatients } = useContext(PatientContext)

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/patient/register`,
        {
          username,
          fullName,
          email,
          phone,
          password,
          gender,
          dob,
          bloodGroup,
          medicalHistory,
          address
        },
        {
          withCredentials: true
        }
      )

      toast.success(response.data.message)
      setIsPatientAuthenticated(true)
      setPatient(response.data.data)
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[160px] sm:p-6 p-4">
        <h4 className="sm:text-3xl text-2xl font-bold text-white">Patient Registration</h4>
      </div>
      <div className="mx-4 mb-4 -mt-16">
        <form onSubmit={handleRegister} className="max-w-4xl mx-auto bg-white shadow-[0_2px_18px_-3px_rgba(6,81,237,0.4)] sm:p-8 p-4 rounded-md">
          <div className="grid md:grid-cols-2 md:gap-12 gap-7">
            <button type="button"
              className="w-full px-4 py-3 flex items-center justify-center rounded-md text-[#333] text-base tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200">
              <FcGoogle className="inline shrink-0 mr-4 text-2xl"/>
              Continue with Google
            </button>
            <button type="button"
              className="w-full px-4 py-3 flex items-center justify-center rounded-md text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333]">
              <SiApple className="inline shrink-0 mr-4 text-2xl"/>
              Continue with Apple
            </button>
          </div>
          <div
            className="my-7 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              className="mx-4 text-center">
              Or
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-y-7 gap-x-12">
            <div>
              <label className="text-sm mb-2 block">username</label>
              <input autoComplete='username' name="name" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
              <label className="text-sm mb-2 block">Full Name</label>
              <input autoComplete='name' name="name" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Full name" onChange={(e) => setFullName(e.target.value)}/>
            </div>
            <div>
              <label className="text-sm mb-2 block">Email Id</label>
              <input autoComplete='email' name="email" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <label className="text-sm mb-2 block">Mobile No.</label>
              <input autoComplete='tel' name="number" type="number" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter mobile number" onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div>
              <label className="text-sm mb-2 block">Password</label>
              <input autoComplete='current-password' name="password" type="password" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
              <label className="text-sm mb-2 block">Gender</label>
              <div className="relative flex items-center">
                  <select
                    name="gender"
                    required
                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
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
              <input autoComplete='bday' name="dob" type="date" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter dob" onChange={(e) => setDob(e.target.value)}/>
            </div>
            <div>
              <label className="text-sm mb-2 block">Blood Group</label>
              <input autoComplete='bloodgroup' name="bloodGroup" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter blood group" onChange={(e) => setBloodGroup(e.target.value)}/>
            </div>
            <div>
              <label className="text-sm mb-2 block">Medical History</label>
              <input autoComplete='medicalhistory' name="medicalHistory" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="medical history" onChange={(e) => setMedicalHistory(e.target.value)}/>
            </div>
            <div>
              <label className="text-sm mb-2 block">Address</label>
              <input autoComplete='street-address' name="address" type="text" className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter address" onChange={(e) => setAddress(e.target.value)}/>
            </div>
          </div>
          <div className="flex items-center mt-8">
            <input autoComplete='on' id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 rounded" />
            <label htmlFor="remember-me" className="ml-3 block text-sm">
              I accept the <Link className="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</Link>
            </label>
          </div>
          <div className="!mt-10">
            <button type="submit" className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
