import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUpForm from "../../PopUpForm/PopUpForm";

const ListingLuxury = () => {
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
                src="/src/assets/nowOne.jpg"
                alt="Post Thumbnail"
                loading="lazy"
                className="w-full h-[25rem] rounded-md"
              />
              <div className="mt-5">
                <div className="flex lg:items-center text-gray-500 text-sm space-x-3 lg:flex-row flex-col gap-1  relative">
                  <span className="uppercase bg-black hover:bg-gray-200 px-2 py-1 rounded text-white hover:text-black w-20 absolute -top-12">
                    Interior
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-bold text-gray-800 hover:text-black cursor-pointer">
                  Spa-Inspired Bathrooms: Designer Fixtures and Premium
                  Finishes.
                </h2>
                <p className="text-justify text-gray-600 mt-2">
                  A spa-inspired bathroom is more than merely an aesthetic
                  appeal; it's an immersive, sensory experience where an
                  ordinary bathroom can transform into a personal sanctuary.
                  Materials are key in reaching this indulgent atmosphere, such
                  as high-quality designer fixtures. A design centered on
                  elements such as rainfall showerheads, freestanding tubs, or
                  sleek, modern faucets makes the design go from just
                  good-looking to extraordinary....
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
                    className="bg-[#104438] lg:px-8 px-16 py-2  text-white rounded-lg"
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
                  Extravagant Outdoor Areas: Lavish Seating and Grand
                  Landscaping.
                </h2>
                <p className="text-justify text-gray-600 mt-2">
                  Luxuriously outdoor rooms are more than mere relaxation
                  places; they were designed to be an lavish extension of your
                  indoor rooms. This design is formed and focused with the basis
                  of seating in mind. High-end outside furnishings such as plush
                  outdoor couches and big-seated lounge chairs have enormous
                  dining settings, all well crafted and made from only teak,
                  aluminum, synthetic wicker weather-resistant materials. These
                  materials are not only resistant to the elements but also add
                  a sophisticated, natural feel to the space. ...
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
                    className="bg-[#104438] lg:px-8 px-16 py-2  text-white rounded-lg"
                  >
                    Get Started
                  </button> */}
                </div>
              </div>
            </div>

            <div className="mb-10 border hover:border-neutral-500 p-10">
              <img
                src="/src/assets/bedroom13.jpg"
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
                  Lavish Bedrooms: Luxe Fabrics and Tailor-made Furniture
                </h2>
                <p className="text-justify text-gray-600 mt-2">
                  A lavish bedroom is a haven of luxury and comfort, carefully
                  designed to bring one the truly indulgent experience. It all
                  starts with the luxurious textures: plush high-thread-count
                  linens, sumptuous silk curtains, and thick, velvety throws
                  that envelop the space in a cocoon of comfort....
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
                    className="bg-[#104438] lg:px-8 px-16 py-2  text-white rounded-lg"
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
           <img src="/src/assets/Cards/kingsmenSpecial.jpg" loading="lazy" alt="" />
          </div>
        </article>
      </div>{" "}
      {isPopUpOpen && <PopUpForm value={isPopUpOpen} />}
    </section>
  );
};

export default ListingLuxury;
