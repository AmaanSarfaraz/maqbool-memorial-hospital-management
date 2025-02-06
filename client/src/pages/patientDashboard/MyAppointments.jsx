import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import PatientContext from '../../context/patient/patientContext.js';
import AppointmentContext from '../../context/appointment/appointmentContext.js';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import {API_URL} from '../../services/config.js'


const MyAppointments = () => {
  const { appointments, setAppointments } = React.useContext(AppointmentContext);
  const { patient } = React.useContext(PatientContext);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [appointmentIdToDelete, setAppointmentIdToDelete] = React.useState(null);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}/api/v1/patient/appointment/me/${patient._id}`,
          {
            withCredentials: true
          }
        );
        setAppointments(data.data);
        toast.success(data.message);
      } catch (error) {
        setAppointments([]);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [patient?._id, setAppointments]);

  const confirmRemoveAppointment = (id) => {
    setAppointmentIdToDelete(id);
    setShowModal(true);
  };

  const removeAppointment = async () => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/api/v1/patient/appointment/delete/${appointmentIdToDelete}`,
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentIdToDelete)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowModal(false);
      setAppointmentIdToDelete(null);
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Scheduled":
        return "border-blue-500 text-blue-600";
      case "Completed":
        return "border-green-500 text-green-600";
      case "Cancelled":
        return "border-red-500 text-red-600";
      case "Pending":
        return "border-orange-500 text-orange-600";
      default:
        return "";
    }
  };

  return (
    <div className="font-[sans-serif] overflow-x-auto">
      {loading ? (
        <p>Loading appointments... </p>
      ) : (
        <table className="min-w-full bg-white">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="pl-4 w-8">S no.</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Patient</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Doctor</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Email</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Phone</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Appointment Date</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Sent date</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Address</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Status</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-800">Action</th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr className="odd:bg-blue-50" key={appointment?._id}>
                  <td className="pl-4 w-8">{index + 1}</td>
                  <td className="p-4 text-sm text-gray-800">
                    {appointment.patientName?.fullName}
                  </td>
                  <td className="p-4 text-sm text-gray-800">
                    Dr. {appointment.doctor?.fullName}
                  </td>
                  <td className="p-4 text-sm text-gray-800">
                    {appointment.patientEmail?.email}
                  </td>
                  <td className="p-4 text-sm text-gray-800">
                    {appointment.patientPhone?.phone}
                  </td>
                  <td className="p-4 text-sm text-gray-800">
                    {format(new Date(appointment.appointmentDate), "dd-MM-yy")}
                  </td>
                  <td className="p-4 text-sm text-gray-800">
                    {format(new Date(appointment.createdAt), "dd-MM-yy")}
                  </td>
                  <td className="p-4 text-sm text-gray-800">
                    {appointment.address}
                  </td>
                  <td className="p-4">
                    <span className={`w-[68px] block text-center py-1 border rounded text-xs ${getStatusClasses(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="mr-4" title="Delete" onClick={() => confirmRemoveAppointment(appointment._id)}>
                      <RiDeleteBin6Line className="w-8 h-6 fill-red-400 hover:fill-red-800" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-sm text-gray-800" colSpan="10">
                  <p className="text-sm text-gray-800">No Appointments Found</p>
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
              <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this appointment?</p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  onClick={removeAppointment}
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

export default MyAppointments;
