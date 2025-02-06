import React from 'react';
import { CiSettings } from "react-icons/ci";
import { FaHandHoldingMedical } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { TbHospital } from "react-icons/tb";

const Hero = () => {
  return (
    <div className="font-sans text-white pt-16 px-6 md:px-12 lg:px-20 pb-12">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 items-center gap-6 bg-blue-500">
        <div className="order-2 lg:order-1 text-center lg:text-left p-4 sm:p-8">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight lg:leading-[56px]">
            Welcome to <span className='text-gray-700'>Maqbool Memorial Hospital</span> Palhallan
          </h2>
          <p className="mt-4 text-base leading-relaxed">
            Providing comprehensive healthcare services with dedication and compassion. Our goal is to ensure your well-being with state-of-the-art facilities and a highly skilled medical team.
          </p>
          <button
            type='button'
            className="bg-transparent hover:bg-white hover:text-blue-500 border-2 border-white mt-8 lg:mt-10 transition-all text-white font-bold text-sm rounded-md px-6 py-2.5"
          >
            Get Started
          </button>
        </div>
        <div className="order-1 lg:order-2 flex items-center justify-center lg:h-[440px] h-[300px]">
          <img
            src="https://readymadeui.com/team-image.webp"
            className="w-full h-full object-cover"
            alt="Hospital Experience"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 px-4 md:px-8 my-12">
        <div className="bg-gray-100 p-7 rounded-md text-center">
          <CiSettings className="w-16 mb-4 inline-block bg-white p-3 rounded-md text-5xl text-blue-500"/>
          <h3 className="text-xl font-bold mb-2 text-[#333]">Customization</h3>
          <p className="text-sm text-[#333]">Tailor healthcare services to meet patient needs.</p>
        </div>
        <div className="bg-gray-100 p-7 rounded-md text-center">
          <FaHandHoldingMedical className="w-16 mb-4 inline-block bg-white p-3 rounded-md text-5xl text-blue-500"/>
          <h3 className="text-xl font-bold mb-2 text-[#333]">Support</h3>
          <p className="text-sm text-[#333]">24/7 medical support and emergency services.</p>
        </div>
        <div className="bg-gray-100 p-7 rounded-md text-center">
          <TbHospital className="w-16 mb-4 inline-block bg-white p-3 rounded-md text-5xl text-blue-500"/>
          <h3 className="text-xl font-bold mb-2 text-[#333]">Performance</h3>
          <p className="text-sm text-[#333]">Delivering high-quality healthcare efficiently.</p>
        </div>
        <div className="bg-gray-100 p-7 rounded-md text-center">
          <MdSecurity className="w-16 mb-4 inline-block bg-white p-3 rounded-md text-5xl text-blue-500"/>
          <h3 className="text-xl font-bold mb-2 text-[#333]">Security</h3>
          <p className="text-sm text-[#333]">Ensuring patient data confidentiality and security.</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
