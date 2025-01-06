import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUpForm from "../../PopUpForm/PopUpForm";

const ListingPremium = () => {
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
          <div className="col-span-5">
            <div className="mb-10 border hover:border-neutral-500 p-10">
              <img
                src="/src/assets/sofa4.jpg"
                alt="Post Thumbnail"
                className="w-full h-[30rem] rounded-md"
              />
              <div className="mt-5">
                <div className="flex text-gray-500 text-sm space-x-3 flex-col gap-1  relative">
                  <span className="uppercase bg-black hover:bg-gray-200 px-2 py-1 rounded text-white hover:text-black w-20 absolute -top-12">
                    Interior
                  </span>
                </div>
                <h2 className="flex items-start text-xl">
                  Customized furniture-luxury tailored for your space
                </h2>
                <div className="flex flex-row">
                  <div className="border h-7 w-7 p-6 flex items-center justify-center">
                    <h3 className="text-3xl font-semibold">C</h3>
                  </div>
                  <p className="text-justify text-gray-600 mt-2">
                    ustomized furniture is a reflection of luxury personalized
                    to create a home as unique as you. Each and every piece is
                    created with fine attention to detail to fit right into your
                    living space both functionally and aesthetically. The
                    process starts with identifying your needs, whether you want
                    a statement piece like a highly designed sofa, a custom-made
                    dining table that fits the lifestyle, or a bespoke storage
                    solution that maximizes space efficiency.
                  </p>
                </div>
                <p className="flex items-start">
                  Opting for customized furniture can give you the freedom to
                  make choices from a wide range of premium materials, including
                  solid wood, natural leathers, and high-quality metals. These
                  materials not only show extraordinary durability but also
                  provide great beautification to the general form. Finishing
                  options, based on which you can pick and style it according to
                  the taste of your interior—a dark rich wood stain for that
                  traditional touch or maybe a lacquer-finish to make it appear
                  up to date or even some hybrid finishes, including metal or a
                  modern feel with the combined mix of both wood and metal.
                  Design options are endless, and configurations are possible
                  for different spaces and purposes. From modular sofas and
                  flexible shelving units to multi-function desks and storage
                  solutions, each piece is made to order. This means that your
                  furniture not only meets your spatial and functional
                  requirements but also complements the existing decor of your
                  home. Investing in customized furniture is also an investment
                  in quality and craftsmanship. The beauty of each piece is seen
                  in the fine craftsmanship where, with the attention to minute
                  detail from the joinery to the hardware, it portrays an
                  expert's hand. In terms of durability and timelessness, it
                  will be able to outlive itself. Customized furniture does not
                  only give beauty to your home but makes one's life richer by
                  giving items that are only yours, well-loved, and well-caused
                  to forever last.
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
                  Stylish Kitchen Designs: Modern Modular Solutions
                </h2>
                <p className="text-justify text-gray-600 mt-2">
                  Stylish kitchen designs have become the epitome of modern
                  living with the right blend of aesthetics and functionality.
                  Modular kitchens have gained popularity as the ultimate choice
                  of homeowners who need a space-efficient layout without
                  compromising on style. These kitchens offer a smooth
                  combination of modern design principles and practical
                  features, ideal for fast-paced lifestyles in today's world...
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
                src="/src/assets/bedroom3.jpg"
                loading="lazy"
                alt="Post Thumbnail"
                className="w-full h-[30rem] rounded-md"
              />
              <div className="mt-5">
                <div className="flex lg:items-center text-gray-500 text-sm space-x-3 lg:flex-row flex-col gap-1  relative">
                  <span className="uppercase bg-black hover:bg-gray-200 px-2 py-1 rounded text-white hover:text-black w-20 absolute -top-12">
                    Interior
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-bold text-gray-800 hover:text-black cursor-pointer">
                  Elegant Bedrooms: Creating a Luxurious Retreat
                </h2>
                <p className="text-justify text-gray-600 mt-2">
                  Elegant Bedroom, serene sanctuary-an abode of utmost style, to
                  just unwind and rejuvenate in style. Carefully chosen pieces
                  of furniture are at the core of this design: richly bedding,
                  ambient lighting, and an appropriately chosen color palette
                  can change the room into a sumptuous retreat. Rich woods, soft
                  linens, and opulent fabrics define a place of unparalleled
                  comfort and sophistication....
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
          <div className="col-span-2">
            <div>
              <img src="/src/assets/Cards/Elite.jpg" loading="lazy" alt="" />
            </div>
          </div>
        </article>
      </div>
      {isPopUpOpen && <PopUpForm value={isPopUpOpen} />}
    </section>
  );
};

export default ListingPremium;
