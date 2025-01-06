import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUpForm from "../../PopUpForm/PopUpForm";

const LineEssential = () => {
  const NavigateToFirstPage = useNavigate();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handlePopUpToggle = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };
  return (
    <section>
      <article className="grid grid-cols-1 lg:grid-cols-7 lg:gap-8">
        {/* Left Content (Main Section) */}
        <div className="lg:col-span-5">
          <div className="mb-10 border hover:border-neutral-500 p-10">
            <img
            loading="lazy"
              src="/src/assets/sofa6.jpg"
              alt="Post Thumbnail"
              className="w-full h-[25rem] rounded-md"
            />
            <div className="mt-5">
              <div className="flex text-gray-500 text-sm space-x-3 flex-col gap-1  relative">
                <span className="uppercase bg-black hover:bg-gray-200 px-2 py-1 rounded text-white hover:text-black w-20 absolute -top-12">
                  Interior
                </span>
              </div>
              <h2 className="flex items-start text-xl">
                Functional Furniture: A Practical Design for Everyday in
                Premium.
              </h2>
              <div className="flex flex-row">
                <div className="border h-7 w-7 p-6 flex items-center justify-center">
                  <h3 className="text-3xl font-semibold">F</h3>
                </div>
                <p className="text-gray-600 mt-2">
                  unctional furniture is the backbone of an organized and
                  efficient home, bringing together practicality and style.
                  Designed to optimize space and provide long-lasting utility,
                  functional furniture caters to the diverse needs of modern
                  living. Whether you have a compact apartment or a spacious
                  home, this type of furniture ensures every square inch is
                  utilized effectively without compromising on aesthetics.
                </p>
              </div>
              <p className="flex items-start text-justify">
                One of the features of functional furniture is its ability to
                multitask. Think of a sofa bed that transforms into a sleeping
                area for guests or a dining table with extendable leaves that
                accommodates more people when needed. Other excellent examples
                are storage beds, modular shelving units, and foldable desks
                that add value to your living spaces. Durability is another
                characteristic of functional furniture. They are made from
                strong materials such as engineered wood, solid hardwood, or
                high-quality metals, and are built to last against the wear and
                tear of daily life. Their designs often focus on clean lines and
                neutral tones, making them versatile enough to fit into any
                style of interior, from minimalistic to contemporary. Apart from
                functionality, functional furniture also minimizes clutter in
                the environment, thereby improving physical space and mental
                clarity. This is because functional furniture does not require
                excess items; therefore, it promotes a sustainable lifestyle as
                it falls in line with the recent trends of an eco-friendly
                lifestyle. Be it living room revamp, bedroom upgrade, or kitchen
                organization, functional furniture makes the cut for maximum
                utility without the loss of a stylishly harmonious ambiance in
                your house.
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
                  className="bg-[#104438] lg:px-8 px-16 lg:py-2 !py-3 text-white rounded-lg"
                >
                  Get Started
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-2">
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

      {isPopUpOpen && <PopUpForm value={isPopUpOpen} />}
    </section>
  );
};

export default LineEssential;
