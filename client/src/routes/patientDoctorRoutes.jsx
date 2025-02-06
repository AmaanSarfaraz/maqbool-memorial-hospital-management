// src/routes/patientDoctorRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import BookAppointment from '../../pages/patientDashboard/BookAppointment';
import MyAppointments from '../../pages/patientDashboard/MyAppointments';

const PatientDoctorRoutes = () => {
  return (
    <>
      <Route path="/appointment" element={<BookAppointment />} />
      <Route path="/my-appointments" element={<MyAppointments />} />
    </>
  );
};

export default PatientDoctorRoutes;
