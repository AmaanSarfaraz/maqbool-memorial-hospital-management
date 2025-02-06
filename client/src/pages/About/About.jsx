import React from 'react';

const About = () => {
  return (
    
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800  pb-4">About Us</h1>
                <p className="font-normal text-base leading-6 text-gray-600 ">Welcome to our hospital, where patient care and satisfaction are our top priorities. With a dedicated team of healthcare professionals and state-of-the-art facilities, we strive to provide the best medical services to our community. Our commitment to excellence is evident in everything we do, from our advanced medical technology to our compassionate approach to patient care.</p>
            </div>
            <div className="w-full lg:w-8/12">
                <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="A group of People" />
            </div>
        </div>

        <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800  pb-4">Our Story</h1>
                <p className="font-normal text-base leading-6 text-gray-600">Our hospital was founded with a mission to deliver comprehensive healthcare services to all. Over the years, we have expanded our facilities and services to meet the growing needs of our patients. We take pride in our history of innovation and our dedication to providing high-quality medical care. From our humble beginnings to our current status as a leading healthcare provider, our journey has been one of continuous improvement and unwavering commitment to our community's health and well-being.</p>
            </div>
            <div className="w-full lg:w-8/12 lg:pt-8">
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                    <div className="p-4 pb-6 flex justify-center flex-col items-center">
                        <img className="md:block hidden" src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png" alt="Alexa featured Image" />
                        <img className="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa featured Image" />
                        <p className="font-medium text-xl leading-5 text-gray-800  mt-4">Dr. Alexa</p>
                    </div>
                    <div className="p-4 pb-6 flex justify-center flex-col items-center">
                        <img className="md:block hidden" src="https://i.ibb.co/fGmxhVy/Rectangle-119.png" alt="Olivia featured Image" />
                        <img className="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia featured Image" />
                        <p className="font-medium text-xl leading-5 text-gray-800  mt-4">Nurse Olivia</p>
                    </div>
                    <div className="p-4 pb-6 flex justify-center flex-col items-center">
                        <img className="md:block hidden" src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png" alt="Liam featued Image" />
                        <img className="md:hidden block" src="https://i.ibb.co/C5MMBcs/Rectangle-120.png" alt="Liam featued Image" />
                        <p className="font-medium text-xl leading-5 text-gray-800  mt-4">Dr. Liam</p>
                    </div>
                    <div className="p-4 pb-6 flex justify-center flex-col items-center">
                        <img className="md:block hidden" src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png" alt="Elijah featured image" />
                        <img className="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah featured image" />
                        <p className="font-medium text-xl leading-5 text-gray-800  mt-4">Admin Elijah</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}

export default About;
