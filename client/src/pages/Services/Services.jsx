import React from 'react';
import { GiKidneys, GiHeartOrgan } from "react-icons/gi";
import { PiEar } from "react-icons/pi";
import { FaChild, FaXRay, FaUserDoctor } from "react-icons/fa6";

const Services = () => {
  return (
    <div className="font-[sans-serif] text-[#333] bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="sm:text-4xl text-2xl font-extrabold text-center mb-16">Our Services</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 max-md:max-w-lg mx-auto">
          <div className="rounded-xl group p-8 text-center hover:bg-gray-100 hover:text-blue-500 hover:shadow-xl transition duration-300">
            <FaUserDoctor className="w-8 mb-4 inline-block text-5xl"/>
            <h3 className="text-xl font-semibold mb-2">General Surgery</h3>
            <p className="text-gray-500 group-hover:text-gray-500 text-sm">Providing expert surgical care with a focus on safety and precision.</p>
          </div>
          <div className="rounded-xl group p-8 text-center hover:bg-gray-100 hover:text-blue-500 hover:shadow-xl transition duration-300">
            <GiKidneys className="w-8 mb-4 inline-block text-5xl"/>
            <h3 className="text-xl font-semibold mb-2">Urology</h3>
            <p className="text-gray-500 group-hover:text-gray-500 text-sm">Advanced treatment for urological conditions with state-of-the-art technology.</p>
          </div>
          <div className="rounded-xl group p-8 text-center hover:bg-gray-100 hover:text-blue-500 hover:shadow-xl transition duration-300">
            <PiEar className="w-8 mb-4 inline-block text-5xl"/>
            <h3 className="text-xl font-semibold mb-2">ENT</h3>
            <p className="text-gray-500 group-hover:text-gray-500 text-sm">Comprehensive care for ear, nose, and throat disorders.</p>
          </div>
          <div className="rounded-xl group p-8 text-center hover:bg-gray-100 hover:text-blue-500 hover:shadow-xl transition duration-300">
            <FaXRay className="w-8 mb-4 inline-block text-5xl"/>
            <h3 className="text-xl font-semibold mb-2">Radiology</h3>
            <p className="text-gray-500 group-hover:text-gray-500 text-sm">Accurate imaging services to aid in diagnosis and treatment.</p>
          </div>
          <div className="rounded-xl group p-8 text-center hover:bg-gray-100 hover:text-blue-500 hover:shadow-xl transition duration-300">
            <GiHeartOrgan className="w-8 mb-4 inline-block text-5xl"/>
            <h3 className="text-xl font-semibold mb-2">Cardiology</h3>
            <p className="text-gray-500 group-hover:text-gray-500 text-sm">Specialized care for heart-related conditions and diseases.</p>
          </div>
          <div className="rounded-xl group p-8 text-center hover:bg-gray-100 hover:text-blue-500 hover:shadow-xl transition duration-300">
            <FaChild className="w-8 mb-4 inline-block text-5xl"/>
            <h3 className="text-xl font-semibold mb-2">Pediatrics</h3>
            <p className="text-gray-500 group-hover:text-gray-500 text-sm">Dedicated healthcare services for children from infancy to adolescence.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
