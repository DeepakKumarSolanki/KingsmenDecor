import React from "react";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { LuInstagram } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <section className="bg-[#26282B] text-white py-12 px-4">
      <footer className="main-container">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side: Logo and description */}
          <div className="flex flex-col">
            <div className="">
              <Link to="/">
                <img loading="lazy" src="/src/assets/logo.png" alt="logo" className="h-[10rem] " />
              </Link>
            </div>
            <p className="text-sm mb-6">
              We provide a full range of interior design, architectural design.
            </p>
            <div className="flex space-x-4">
              <Link
                to="https://www.facebook.com/kingsmendecors"
                className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center border p-2"
              >
                <FaFacebookF />
              </Link>
              {/* <Link
                to="https://www.linkedin.com/company/kingsmen-real-estate/about/"
                className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center  border p-2"
              >
                <FaLinkedinIn />
              </Link> */}
              <Link
                to="https://www.instagram.com/kingsmendecors/profilecard/?igsh=MWZzNHN2a2lwdG5zMg%3D%3D"
                className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center  border p-2"
              >
                <LuInstagram />
              </Link>
              <Link
                to="https://www.youtube.com/channel/UCArwHcthzSA_hANHiqoQz9g"
                className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center  border p-2"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>

          {/* Middle: Contacts */}
          <div className="flex flex-col gap-3 ">
            <h5 className="text-lg font-semibold mb-4">Contacts</h5>
            <div className="flex gap-3 items-center text-gray-400">
                <p className=" text-base mb-2">
                  Kingsmen Realty | 7th floor, AWFIS Working Space | Kirloskar
                  Business Park | Hebbal Kempapura, Bengaluru, Karnataka 560024.
                </p>
              </div>
            <div className="flex gap-3 items-center text-gray-400">
              <MdOutlineMailOutline className="text-xl text-gray-400 " />
              <p className=" text-base mb-2">kingsmendecor@gmail.com</p>
            </div>
            <div className="flex gap-3 items-center text-gray-400">
              <IoCallOutline className="text-xl text-gray-400 " />
              <p className=" text-base">+91 7338639331</p>
            </div>
          </div>

          {/* Latest Projects */}
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <Link to="/" className=" text-base mb-2 text-gray-500 hover:text-white  font-semibold  cursor-pointer">
              Home
            </Link>
            <Link to="/process" className="text-base mb-2 text-gray-500 hover:text-white  font-semibold  cursor-pointer">
              Our Process
             </Link>
            <Link to="/finishes" className="text-base mb-2 text-gray-500 hover:text-white   font-semibold cursor-pointer">
              Finishes
             </Link>
            <Link to="/servicesPage" className="text-base mb-2 text-gray-500 hover:text-white  font-semibold  cursor-pointer">
              Services
             </Link>
            <Link to="/contactUs" className="text-base mb-2 text-gray-500 hover:text-white   font-semibold cursor-pointer">
              Contact Us
             </Link>
          </div>

          {/* Subscribe Section */}
          <div className="flex flex-col">
            <h5 className="text-lg font-semibold mb-4">Subscribe</h5>
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="p-2 mb-4 rounded text-black"
            />
            <p className="text-sm">
              Follow our newsletter to stay updated about the agency.
            </p>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-600 mt-8 pt-4 text-center">
          <div className="flex md:justify-between lg:flex-row flex-col gap-4">
            <p className="text-sm">
              Copyright © 2025 Kingsmen Decor. All Rights
              Reserved.
            </p>
            <div className="flex gap-5">
              <Link to="/" className="text-base hover:text-white text-gray-500 mx-2">
                Privacy Policy
              </Link>
              <Link to="/" className="text-base hover:text-white text-gray-500 mx-2">
                Terms & Condition
              </Link>
              <Link to="/" className="text-base hover:text-white text-gray-500 mx-2">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
