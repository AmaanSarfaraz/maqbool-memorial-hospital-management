import React from 'react';

const Testimonial = () => {
  return (
    <div className="lg:p-10 p-6 font-[sans-serif] text-[#333] bg-gray-100 mb-20">
      <div className="mb-20 text-center">
        <h2 className="text-3xl font-extrabold">What our patients say</h2>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6 max-md:gap-10 max-w-6xl mx-auto">
        <div className="max-w-[350px] h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
          <img src="https://readymadeui.com/profile_2.webp" alt="Patient's Avatar" className="w-14 h-14 rounded-full absolute right-0 left-0 border-4 border-white shadow-xl mx-auto -top-7" />
          <div className="flex space-x-1 mt-4">
            {[...Array(4)].map((_, index) => (
              <svg key={index} className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
            ))}
            <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-sm leading-relaxed">The treatment was excellent. I never had to wait long for my appointments. The medical staff was friendly and attentive, and the services were impressively prompt.</p>
            <h4 className="text-base whitespace-nowrap font-extrabold mt-4">John Doe</h4>
            <p className="mt-1 text-xs text-gray-400">Patient at ABC Hospital</p>
          </div>
        </div>
        <div className="max-w-[350px] h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
          <img src="https://readymadeui.com/profile_2.webp" alt="Patient's Avatar" className="w-14 h-14 rounded-full absolute right-0 left-0 border-4 border-white shadow-xl mx-auto -top-7" />
          <div className="flex space-x-1 mt-4">
            {[...Array(4)].map((_, index) => (
              <svg key={index} className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
            ))}
            <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-sm leading-relaxed">The treatment was excellent. I never had to wait long for my appointments. The medical staff was friendly and attentive, and the services were impressively prompt.</p>
            <h4 className="text-base whitespace-nowrap font-extrabold mt-4">John Doe</h4>
            <p className="mt-1 text-xs text-gray-400">Patient at ABC Hospital</p>
          </div>
        </div>
        <div className="max-w-[350px] h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
          <img src="https://readymadeui.com/profile_2.webp" alt="Patient's Avatar" className="w-14 h-14 rounded-full absolute right-0 left-0 border-4 border-white shadow-xl mx-auto -top-7" />
          <div className="flex space-x-1 mt-4">
            {[...Array(4)].map((_, index) => (
              <svg key={index} className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
            ))}
            <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-sm leading-relaxed">The treatment was excellent. I never had to wait long for my appointments. The medical staff was friendly and attentive, and the services were impressively prompt.</p>
            <h4 className="text-base whitespace-nowrap font-extrabold mt-4">John Doe</h4>
            <p className="mt-1 text-xs text-gray-400">Patient at ABC Hospital</p>
          </div>
        </div>
        {/* Add more testimonials here */}
      </div>
    </div>
  );
}

export default Testimonial;
