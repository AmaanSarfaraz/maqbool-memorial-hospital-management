import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import DoctorContext from '../../context/doctor/doctorContext.js';
import {API_URL} from '../../services/config.js'


const AllDoctors = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [doctorIdToDelete, setDoctorIdToDelete] = React.useState(null);
  const { doctors, setDoctors, loading } = React.useContext(DoctorContext)


  const confirmRemoveDoctor = (id) => {
    setDoctorIdToDelete(id);
    setShowModal(true);
  };

  const removeDoctor = async () => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/api/v1/admin/doctor/delete/${doctorIdToDelete}`,
        { withCredentials: true }
      );
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor._id !== doctorIdToDelete)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowModal(false);
      setDoctorIdToDelete(null);
    }
  };


  return (
    <div className="font-[sans-serif] overflow-x-auto">
      <div className="text-center mb-8 mt-8">
          <h2 className="text-3xl font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">All Doctors</h2>
        </div>
      {loading ? (
        <p>Loading Doctors... </p>
      ) : (
        <table className="min-w-full bg-white">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="pl-4 w-8">S no.</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Doctor Photo</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Full Name</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Email</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Phone</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Gender</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Dob</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Department</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Qualification</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Experience</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Delete</th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <tr className="odd:bg-blue-50" key={doctor._id}>
                  <td className="pl-4 w-8 text-md">{index + 1}</td>
                  <td className="p-4 text-sm text-gray-800">
                    <img src={doctor?.docAvatar} alt="doctor" className='rounded w-32 h-28'/>
                  </td>
                  <td className="p-4 text-md text-gray-800">
                    Dr. {doctor?.fullName}
                  </td>
                  <td className="p-4 text-md text-gray-800">
                    {doctor?.email}
                  </td>
                  <td className="p-4 text-md text-gray-800">
                    {doctor?.phone}
                  </td>
                  <td className="p-4 text-md text-gray-800">
                    {doctor?.gender}
                  </td>
                  <td className="p-4 text-md text-gray-800">
                    {format(new Date(doctor?.dob), "dd-MM-yy")}
                  </td>
                  <td className="p-4 text-md text-gray-800">
                    {doctor?.doctorDepartment}
                  </td>
                  <td className="p-4 text-md text-gray-800">
                    {doctor?.qualification}
                  </td>
                  <td className="p-4 text-md text-gray-800">
                    {doctor?.experience}
                  </td>
                  <td className="p-4">
                    <button className="mr-4" title="Delete" onClick={() => confirmRemoveDoctor(doctor._id)}>
                      <RiDeleteBin6Line className="w-8 h-6 fill-red-400 hover:fill-red-800" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-sm text-gray-800" colSpan="10">
                  <p className="text-sm text-gray-800">No Doctors Found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {showModal && (
        <div id="deleteModal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button
                type="button"
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShowModal(false)}
              >
                <IoClose className='w-6 h-6'/>
                <span className="sr-only">Close modal</span>
              </button>
              <MdDelete className="text-red-500  w-11 h-11 mb-3.5 mx-auto"/>
              <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to remove this doctor?</p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  onClick={removeDoctor}
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDoctors;
