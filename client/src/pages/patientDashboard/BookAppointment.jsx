import React, { useState, useContext } from 'react';
import PatientContext from '../../context/patient/patientContext.js';
import DoctorContext from '../../context/doctor/doctorContext.js';
import { toast } from "react-toastify";
import axios from 'axios';
import {API_URL} from '../../services/config.js'

const Appointment = () => {
    const containerHeight = `calc(100vh - 72px)`;
    const { patient } = useContext(PatientContext);
    const { doctors } = useContext(DoctorContext);

    const [patientName, setPatientName] = useState(patient?.fullName ||"");
    const [doctor, setDoctor] = useState("");
    const [patientEmail, setPatientEmail] = useState(patient?.email || "");
    const [patientPhone, setPatientPhone] = useState(patient?.phone || "");
    const [notes, setNotes] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [address, setAddress] = useState("");


    const handleAppointment = async (e) => {
        e.preventDefault();
        const appointmentData = {
          patientName,
          doctor,
          patientEmail,
          patientPhone,
          appointmentDate,
          address,
          notes,
      };

        try {
            const response = await axios.post(
                `${API_URL}/api/v1/patient/appointment`,
                {
                    patientName,
                    doctor,
                    patientEmail,
                    patientPhone,
                    appointmentDate,
                    address,
                    notes,
                },
                {
                    withCredentials: true,
                }
            );
            toast.success(response.data.message);
            setDoctor("");
            setAppointmentDate("");
            setAddress("");
            setNotes("");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r from-blue-800 to-blue-500 text-[#333] lg:h-screen p-6" style={{ height: containerHeight }}>
            <div className="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                <div className="max-md:order-1 flex flex-col justify-center sm:p-6 p-4 bg-gradient-to-r from-blue-600 to-blue-700 w-full h-full space-y-16">
                    <div className="max-w-md space-y-12 mx-auto">
                        <div className='space-y-8'>
                            <h4 className="text-white text-3xl font-semibold">Book your Appointment</h4>
                            <p className="text-[13px] text-white mt-2">Welcome to Appointment page.</p>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-semibold">Simple & Secure Appointment booking with ease.</h4>
                            <p className="text-[13px] text-white mt-2">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-semibold">Terms and Conditions Agreement</h4>
                            <p className="text-[13px] text-white mt-2">Require users to accept the terms and conditions of your service during registration.</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleAppointment} className="sm:p-6 p-4 w-full">
                    <div className="mb-12">
                        <h3 className="text-blue-500 text-3xl font-extrabold max-md:text-center">Book Appointment</h3>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-y-7 gap-x-7">
                        <div>
                            <label className="text-sm mb-2 block">Patient Name</label>
                            <input
                                name="name"
                                value={patient?.fullName}
                                onChange={(e) => setPatientName(e.target.value)}
                                type="text"
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Patient Name"
                            />
                        </div>
                        <div>
                            <label className="text-sm mb-2 block">Doctor Name</label>
                            <select
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                            >
                                <option value="">Select Doctor</option>
                                {doctors && doctors.map((doctor) => (
                                    <option value={doctor.fullName} key={doctor._id}>
                                        {doctor.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm mb-2 block">Phone</label>
                            <input
                                value={patient?.phone}
                                onChange={(e) => setPatientPhone(e.target.value)}
                                name="notes"
                                type="number"
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Phone"
                            />
                        </div>
                        <div>
                            <label className="text-sm mb-2 block">Email</label>
                            <input
                                value={patient?.email}
                                onChange={(e) => setPatientEmail(e.target.value)}
                                name="notes"
                                type="email"
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label className="text-sm mb-2 block">Appointment Date</label>
                            <input
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                name="appointmentDate"
                                type="date"
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Appointment Date"
                            />
                        </div>
                        <div>
                            <label className="text-sm mb-2 block">Notes</label>
                            <input
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                name="notes"
                                type="text"
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Describe your problem"
                            />
                        </div>
                        <div>
                            <label className="text-sm mb-2 block">Address</label>
                            <input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                name="address"
                                type="text"
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Address"
                            />
                        </div>
                    </div>
                    <div className="flex items-center mt-8">
                        <input id="terms" name="terms" type="checkbox" className="h-4 w-4 shrink-0 rounded" />
                        <label htmlFor="terms" className="ml-3 block text-sm">
                            I accept the <a href="#" className="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
                        </label>
                    </div>
                    <div className="mt-10">
                        <button type="submit" className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all">
                            Book Appointment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Appointment;
