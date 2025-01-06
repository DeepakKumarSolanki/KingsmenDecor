import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import PopUpForm from "../../PopUpForm/PopUpForm";

const GridPremium = () => {
  const posts = [
    {
      image: "/src/assets/sofa4.jpg",
      tag: "INTERIOR",
      title: "Customized furniture-luxury tailored for your space",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "Customized furniture is a reflection of luxury personalized to create a home ...",
    },
    {
      image: "/src/assets/dinning4.jpg",
      tag: "INTERIOR",
      title: "Stylish Dining Designs: Modern Modular Solutions",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "Stylish dining designs have become the epitome of modern living with the right blend of...",
    },
    {
      image: "/src/assets/bedroom3.jpg",
      tag: "INTERIOR",
      title: "Elegant Bedrooms: Creating a Luxurious Retreat",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "Elegant Bedroom, serene sanctuary-an abode of utmost style, to just unwind ...",
    },
    {
      image: "/src/assets/bathroom2.jpg",
      tag: "INTERIOR",
      title: "Refined Bathrooms: Polished Design and Practicality",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "A refined bathroom brings together high-quality fixtures, designer tiles, and smart storage ...",
    },
    {
      image: "/src/assets/outdoor2.jpg",
      tag: "OUTDOOR",
      title: "Chic Outdoor Spaces: Stylish Living Outside",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "Chic outdoor spaces are beautifully designed to extend the comfort and elegance of your home into the great outdoors for a ...",
    },
    {
      image: "/src/assets/eliteKitchen.jpg",
      tag: "INTERIOR",
      title: "Balcony retreats are semi-luxurious outdoor setup.",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "A refined bathroom brings together high-quality fixtures, designer tiles, and smart storage ...",
    },
  ];

  const NavigateToFirstPage = useNavigate();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handlePopUpToggle = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  return (
    <section>
      <div className="grid lg:grid-cols-3 gap-6">
        {posts.slice(0, 6).map((post, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={post.image}
              loading="lazy"
              alt={post.title}
              className="w-full  h-[20rem]  object-cover"
            />
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-2">
                <span className="bg-black text-white px-2 py-1 rounded uppercase">
                  {post.tag}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-black cursor-pointer">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm">{post.description}</p>
              <div className="flex  items-center justify-center font-semibold mt-3">
                <button
                  onClick={handlePopUpToggle}
                  className="border-[#104438] border rounded-lg py-2 px-6 hover:bg-[#104438]/30 text-[#104438]"
                >
                  Book Free Consultation
                </button>
                {/* <button
                  onClick={() => NavigateToFirstPage("/homeinterior/bhk")}
                  className="bg-[#104438] px-8 text-white rounded-lg"
                >
                  Get Started
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isPopUpOpen && <PopUpForm value={isPopUpOpen} />}
    </section>
  );
};

export default GridPremium;
