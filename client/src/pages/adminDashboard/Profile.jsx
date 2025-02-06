import React from 'react';
import AdminContext from '../../context/admin/adminContext';
import { format } from 'date-fns';
import { LuUserRound } from "react-icons/lu";
import axios from 'axios';
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoNewspaper } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import {API_URL} from '../../services/config'
 

const AdminProfile = () => {

    const {admin} = React.useContext(AdminContext)
    const [oldPassword, setOldPassword] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("")
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleShowPassword = (e, field) => {
        e.preventDefault(); // Prevent the default form submission
        switch (field) {
            case 'old':
                setShowOldPassword(!showOldPassword);
                break;
            case 'new':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirm':
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault(); // Prevent the default form submission
    
        if (newPassword !== confirmNewPassword) {
            toast.error("New and confirm new password do not match");
            return;
        }
    
        try {
            const response = await axios.post(
                `${API_URL}/api/v1/admin/change/password/${admin._id}`,
                {
                    oldPassword,
                    newPassword,
                    confirmNewPassword
                },
                {
                    withCredentials: true
                }
            );
            toast.success(response.data.message);
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            setIsModalOpen(false);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            } else {
                toast.error("An error occurred while changing password");
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            }
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(!isModalOpen)
    }

  return (
    <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
                <div className="bg-white p-3 border-t-4 border-green-400">
                    <div className="image overflow-hidden">
                        <img className="h-32 w-32 mx-auto"
                            src={admin?.avatar}
                            alt="admin"/>
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{admin?.username}</h1>
                    <h3 className="text-gray-600 font-lg text-semibold leading-6">{admin?.role}</h3>
                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                        Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                    <ul
                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                            <span>Status</span>
                            <span className="ml-auto"><span
                                    className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                        </li>
                        <li className="flex items-center py-3">
                            <span>Member since</span>
                            <span className="ml-auto">{format( new Date (admin?.createdAt), 'dd-MM-yy')}</span>
                        </li>
                        <li className="flex items-center py-3">
                        </li>
                    </ul>
                    <div className='mt-8'>
                        <button onClick={handleOpenModal} className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
                            Change Password
                        </button>
                    </div>
                    <div className={`${isModalOpen ? 'block' : 'hidden'} fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}>
                        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                            <RxCross2
                            onClick={handleOpenModal}
                            className="w-6 h-6 cursor-pointer shrink-0 fill-[#333] hover:text-red-500 float-right" 
                            />  
                                <div className="my-6 text-center">
                                <h4 className="text-3xl text-[#333] font-extrabold">Change Password</h4>
                                </div>
                                <form className="space-y-4" onSubmit={handleChangePassword}>
                                    <input autoComplete='name' type="text" name='name' className='sr-only' />
                                <div className="relative flex items-center">
                                    <input autoComplete="current-password" type={showOldPassword ? "text" : "password"} placeholder="old password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="px-4 py-3 bg-white text-[#333] w-full text-sm border-2 outline-green-500 rounded-lg"
                                    />
                                    <button onClick={(e) => handleShowPassword(e, "old")}>{showOldPassword? <FiEye className="w-[18px] h-[18px] absolute right-2 cursor-pointer text-gray-400"/> : <FiEyeOff className="w-[18px] h-[18px] absolute right-2 cursor-pointer text-gray-400"/>}</button>
                                </div>
                                <div className="relative flex items-center">
                                    <input autoComplete="new-password" type={showNewPassword ? "text" : "password"} placeholder="new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="px-4 py-3 bg-white text-[#333] w-full text-sm border-2 outline-green-500 rounded-lg" 
                                    />
                                    <button onClick={(e) => handleShowPassword(e, "new")}>{showNewPassword? <FiEye className="w-[18px] h-[18px] absolute right-2 cursor-pointer text-gray-400"/> : <FiEyeOff className="w-[18px] h-[18px] absolute right-2 cursor-pointer text-gray-400"/>}</button>
                                </div>
                                <div className="relative flex items-center">
                                    <input autoComplete="new-password" type={showNewPassword ? "text" : "password"} placeholder="Confirm new Password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="px-4 py-3 bg-white text-[#333] w-full text-sm border-2 outline-green-500 rounded-lg" 
                                    />
                                    <button onClick={(e) => handleShowPassword(e, "confirm")}>{showConfirmPassword? <FiEye className="w-[18px] h-[18px] absolute right-2 cursor-pointer text-gray-400"/> : <FiEyeOff className="w-[18px] h-[18px] absolute right-2 cursor-pointer text-gray-400"/>}</button>
                                </div>
                                <button type="submit"
                                    className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out">Change Password</button>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="my-4"></div>
                <div className="bg-white p-3 hover:shadow">
                    <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                        <span className="text-green-500">
                            <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </span>
                        <span>Similar Profiles</span>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="text-center my-2">
                            <img className="h-16 w-16 rounded-full mx-auto"
                                src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                alt=""/>
                            <a href="#" className="text-main-color">Kojstantin</a>
                        </div>
                        <div className="text-center my-2">
                            <img className="h-16 w-16 rounded-full mx-auto"
                                src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                                alt=""/>
                            <a href="#" className="text-main-color">James</a>
                        </div>
                        <div className="text-center my-2">
                            <img className="h-16 w-16 rounded-full mx-auto"
                                src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                alt=""/>
                            <a href="#" className="text-main-color">Natie</a>
                        </div>
                        <div className="text-center my-2">
                            <img className="h-16 w-16 rounded-full mx-auto"
                                src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                                alt=""/>
                            <a href="#" className="text-main-color">Casey</a>
                        </div>
                    </div>
                </div>*/}
            </div> 
            <div className="w-full md:w-9/12 mx-2 h-64">
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="text-green-500">
                            <LuUserRound className='h-5 w-5'/>
                        </span>
                        <span className="tracking-wide text-lg">About</span>
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Full Name</div>
                                <div className="px-4 py-2">{admin?.fullName}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">username</div>
                                <div className="px-4 py-2">{admin?.username}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Gender</div>
                                <div className="px-4 py-2">{admin?.gender}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                <div className="px-4 py-2">{admin?.phone}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Current Address</div>
                                <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Email.</div>
                                <div className="px-4 py-2">
                                    <a className="text-blue-800" href="mailto:jane@example.com">{admin?.email}</a>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Birthday</div>
                                <div className="px-4 py-2">{format( new Date (admin?.dob), 'dd-MM-yyyy')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-4"></div>

                <div className="bg-white p-3 shadow-sm rounded-sm">

                    <div className="grid grid-cols-2">
                        <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <IoNewspaper className="h-5" />
                                </span>
                                <span className="tracking-wide">Experience</span>
                            </div>
                            <ul className="list-inside space-y-2">
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <FaGraduationCap className="h-5" />
                                </span>
                                <span className="tracking-wide">Education</span>
                            </div>
                            <ul className="list-inside space-y-2">
                                <li>
                                    <div className="text-teal-600">Masters Degree in Oxford</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Bachelors Degreen in LPU</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AdminProfile;
