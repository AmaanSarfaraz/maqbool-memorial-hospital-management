import React, { useContext, useEffect, useState } from 'react';
import DoctorContext from '../../context/doctor/doctorContext';
import getAllDoctors from '../../context/doctor/doctorContext';

const Team = () => {
  const { doctors } = useContext(DoctorContext);


  return (
    <div className="font-[sans-serif] text-[#333] bg-white p-8">
      <div className="lg:max-w-5xl sm:max-w-2xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold">Our Medical Team</h2>
        </div>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-20 max-md:justify-center mt-16">
          {doctors && doctors.map((doctor) => (
            <div key={doctor._id} className="flex items-center">
              <img src={doctor.docAvatar} alt={`${doctor.fullName}'s Avatar`} className="w-24 h-24 rounded-full"/>
              <div className="ml-4">
                <h4 className="text-base font-extrabold">{doctor.fullName}</h4>
                <p className="text-xs text-blue-500">{doctor.specialisation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
