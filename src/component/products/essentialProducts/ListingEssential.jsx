import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUpForm from "../../PopUpForm/PopUpForm";

const ListingEssential = () => {
  const NavigateToFirstPage = useNavigate();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handlePopUpToggle = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };
  return (
    <section>
      <div className="px-5">
        <article className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Left Content (Main Section) */}
          <div className="lg:col-span-5">
            <div className="mb-10 border hover:border-neutral-500 rounded-md p-10">
              <img
                src="/src/assets/sofa6.jpg"
                loading="lazy"
                alt="Post Thumbnail"
                className="w-full h-[25rem] rounded-md"
              />
              <div className="mt-5">
                <div className="flex lg:items-center text-gray-500 text-sm space-x-3 lg:flex-row flex-col gap-1  relative">
                  <span className="uppercase bg-black hover:bg-gray-200 px-2 py-1 rounded text-white hover:text-black w-20 absolute -top-12">
                    Interior
                  </span>
                
                </div>
                <h2 className="mt-3 text-xl font-bold text-gray-800 hover:text-black cursor-pointer">
                  Functional Furniture: A Practical Design for Everyday in
                  Premium.
                </h2>
                <p className="text-gray-600 mt-2 text-justify">
                  Functional furniture is the backbone of an organized and
                  efficient home, bringing together practicality and style.
                  Designed to optimize space and provide long-lasting utility,
                  functional furniture caters to the diverse needs of modern
                  living. Whether you have a compact apartment or a spacious
                  home, this type of furniture ensures every square inch is
                  utilized effectively without compromising on aesthetics....
                </p>
                <div className="flex  lg:flex-row  items-center justify-center flex-col pt-4 gap-3 font-semibold">
                  <button
                    onClick={handlePopUpToggle}
                    className="border-[#104438] border rounded-lg py-2 px-6 hover:bg-[#104438]/30 text-[#104438]"
                  >
                    Book Free Consultation
                  </button>
                  {/* <button
                    onClick={() => NavigateToFirstPage("/homeinterior/bhk")}
                    className="bg-[#104438] lg:px-8 px-16 lg:py-2 py-2 text-white rounded-lg"
                  >
                    Get Started
                  </button> */}
                </div>
              </div>
            </div>
            <div className="mb-10 border hover:border-neutral-500 p-10">
              <span className="uppercase bg-black hover:bg-gray-200 px-2 py-1 rounded text-white hover:text-black">
                Interior
              </span>
              <div className="mt-5">
              
                <h2 className="mt-3 text-xl font-bold text-gray-800 hover:text-black cursor-pointer">
                  Minimalist Kitchen Setup: Simple, Effective, and Economic
                </h2>
                <p className="text-gray-600 mt-2 text-justify">
                  The epitome of modern design is in a minimalist kitchen setup,
                  one that exudes simplicity, efficiency, and style. It
                  eliminates clutter, creates functionality to maximize every
                  inch, and removes everything that does not add to the beauty.
                  Sleek cabinets with clean lines and minimal hardware at the
                  heart of a minimalist kitchen provide a timeless aesthetic
                  that works well with any home decor....
                </p>
                <div className="flex  lg:flex-row  items-center justify-center flex-col pt-4 gap-3 font-semibold">
                  <button
                    onClick={handlePopUpToggle}
                    className="border-[#104438] border rounded-lg py-2 px-6 hover:bg-[#104438]/30 text-[#104438]"
                  >
                    Book Free Consultation
                  </button>
                  {/* <button
                    onClick={() => NavigateToFirstPage("/homeinterior/bhk")}
                    className="bg-[#104438] lg:px-8 px-16 lg:py-2 py-2 text-white rounded-lg"
                  >
                    Get Started
                  </button> */}
                </div>
              </div>
            </div>

            <div className="mb-10 border hover:border-neutral-500 p-10">
              <img
                src="/src/assets/bedroom1.jpg"
                loading="lazy"
                alt="Post Thumbnail"
                className="w-full h-[25rem] rounded-md"
              />
              <div className="mt-5">
                <div className="flex lg:items-center text-gray-500 text-sm space-x-3 lg:flex-row flex-col gap-1  relative">
                  <span className="uppercase bg-black hover:bg-gray-200 px-2 py-1 rounded text-white hover:text-black w-20 absolute -top-12">
                    Interior
                  </span>
                
                </div>
                <h2 className="mt-3 text-xl font-bold text-gray-800 hover:text-black cursor-pointer">
                  Comfortable Bedrooms: Simple Elegance for Restful Retreats
                </h2>
                <p className="text-gray-600 mt-2 text-justify">
                  A comfortable bedroom is a sanctuary, a shelter from the
                  storms of daily life where peace awaits. And the way to
                  achieve this is with simple and elegant design elements that
                  actually combine functionality with comfort. But cozy designs
                  are basic to comfortable bedrooms, implying the warmth and
                  relaxation of comfort to a peaceful sense of being...
                </p>
                <div className="flex  lg:flex-row  items-center justify-center flex-col pt-4 gap-3 font-semibold">
                  <button
                    onClick={handlePopUpToggle}
                    className="border-[#104438] border rounded-lg py-2 px-6 hover:bg-[#104438]/30 text-[#104438]"
                  >
                    Book Free Consultation
                  </button>
                  {/* <button
                    onClick={() => NavigateToFirstPage("/homeinterior/bhk")}
                    className="bg-[#104438] lg:px-8 px-16 lg:py-2 py-2 text-white rounded-lg"
                  >
                    Get Started
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 ">
          {/* Profile Section */}
          <div
            className=""
          >
          <img src="/src/assets/Cards/UltraPremium.jpg" loading="lazy" alt="" />
          </div>

          {/* Categories Section */}
          {/* <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0">
              <h4 className="font-bold text-lg text-gray-800 uppercase">
                Categories
              </h4>
              <span className="text-lg text-black">..................</span>
            </div>
            <div className="rounded-md mb-10">
              <ul className="space-y-2">
                <li className="flex justify-between items-center text-gray-600 bg-gray-100 uppercase cursor-pointer hover:bg-black hover:text-white p-2">
                  <span>Design</span>
                  <span className="text-gray-300 font-semibold  px-2 py-1 rounded-full text-base">
                    [3]
                  </span>
                </li>
                <li className="flex justify-between items-center text-gray-600 bg-gray-100 uppercase cursor-pointer hover:bg-black hover:text-white p-2">
                  <span>Development</span>
                  <span className="text-gray-300 font-semibold  px-2 py-1 rounded-full text-base">
                    [5]
                  </span>
                </li>
                <li className="flex justify-between items-center text-gray-600 bg-gray-100 uppercase cursor-pointer hover:bg-black hover:text-white p-2">
                  <span>Startup</span>
                  <span className="text-gray-300 font-semibold  px-2 py-1 rounded-full text-base">
                    [1]
                  </span>
                </li>
              </ul>
            </div>
          </div> */}

          {/* Recent Posts */}
          {/* <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0">
              <h4 className="font-bold text-lg text-gray-800 uppercase">
                Recent Posts
              </h4>
              <span className="text-lg text-black">..................</span>
            </div>
            <ul className="space-y-5">
              <li className="flex flex-row gap-2 items-center">
                <img
                  src="/listImages/recent-post-1.jpg"
                  alt="image"
                  className="h-20 w-20"
                />
                <p className="flex flex-col gap-1">
                  <a href="#" className="block text-gray-700 hover:text-black">
                    Plan Your Project with Your Software
                  </a>
                  <p className="text-sm text-gray-500">November 11, 2019</p>
                </p>
              </li>
              <li className="flex flex-row gap-2 items-center">
                <img
                  src="/listImages/recent-post-2.jpg"
                  alt="image"
                  className="h-20 w-20"
                />
                <p className="flex flex-col gap-1">
                  <a href="#" className="block text-gray-700 hover:text-black">
                    Plan Your Project with Your Software
                  </a>
                  <p className="text-sm text-gray-500">November 11, 2019</p>
                </p>
              </li>
              <li className="flex flex-row gap-2 items-center">
                <img src="/home/" alt="image" className="h-20 w-20" />
                <p className="flex flex-col gap-1">
                  <a href="#" className="block text-gray-700 hover:text-black">
                    Plan Your Project with Your Software
                  </a>
                  <p className="text-sm text-gray-500">November 11, 2019</p>
                </p>
              </li>
            </ul>
          </div> */}
        </div>
        </article>
      </div>
      {isPopUpOpen && <PopUpForm value={isPopUpOpen} />}
    </section>
  );
};

export default ListingEssential;
