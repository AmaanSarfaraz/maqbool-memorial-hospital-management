import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import {API_URL} from '../../services/config'

const Contact = () => {
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${API_URL}/api/v1/contact/message/send`,
                {
                    fullName,
                    email,
                    phone,
                    message
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }
            );
            toast.success("Message sent successfully");
            setFullName("");
            setEmail("");
            setPhone("");
            setMessage("");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const containerHeight = `calc(100vh - 72px)`;

    return (
        <div className="bg-[#0077B6] h-screen flex items-center" style={{ height: containerHeight }}>
            <div className="max-w-6xl mx-auto bg-blue-500 rounded-lg">
                <div className="grid md:grid-cols-2 items-center gap-16 sm:p-10 p-4 font-[sans-serif] bg-gradient-to-r from-blue-600 to-blue-700">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white">Get in Touch</h1>
                        <p className="text-sm text-gray-300 mt-3">Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project and provide help.</p>
                        <ul className="mt-12 space-y-8">
                            <Link className="flex items-center text-white"><MdOutlineEmail className="text-gray-300 text-xl  mr-3"/>info@example.com</Link>
                            <Link className="flex items-center text-white"><LuPhoneCall className="text-gray-300 text-xl mr-3"/>+158 996 888</Link>
                            <Link className="flex items-center text-white"><CiLocationOn className="text-gray-300 text-xl mr-3"/>123 Street 256 House</Link>
                        </ul>
                        <ul className="flex mt-12 space-x-8">
                            <Link className="bg-gray-100 text-xl text-blue-800 hover:bg-blue-800 hover:text-white h-8 w-8 rounded-full flex items-center justify-center shrink-0"><SlSocialFacebook /></Link>
                            <Link className="bg-gray-100 text-xl text-[#a91079] hover:bg-blue-800 hover:text-white h-8 w-8 rounded-full flex items-center justify-center shrink-0"><FaInstagram /></Link>
                            <Link className="bg-black text-xl text-white hover:bg-blue-500 hover:text-black h-8 w-8 rounded-full flex items-center justify-center shrink-0"><BsTwitterX /></Link>
                        </ul>
                    </div>
                    <div className="bg-gray-200 p-6 rounded-lg">
                        <p className="text-sm font-semibold text-[#333]">Send Message ...</p>
                        <form onSubmit={handleMessage} className="mt-8 space-y-4">
                            <input 
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}
                                type='text' placeholder='Full Name'
                                className="w-full rounded-md py-3 px-4 text-sm outline-blue-500" 
                            />
                            <input
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email}
                                type='email' placeholder='Email'
                                className="w-full rounded-md py-3 px-4 text-sm outline-blue-500" 
                            />
                            <input 
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                type='text' placeholder='Phone'
                                className="w-full rounded-md py-3 px-4 text-sm outline-blue-500" 
                            />
                            <textarea 
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                placeholder='Message' rows="6"
                                className="w-full rounded-md px-4 text-sm pt-3 outline-blue-500"
                            ></textarea>
                            <button type='submit'
                                className="text-white bg-blue-600 hover:bg-white hover:text-black font-semibold rounded-md text-sm px-4 py-3 flex items-center justify-center w-full"
                            >
                                <RiSendPlaneFill className='text-xl mr-4'/>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
