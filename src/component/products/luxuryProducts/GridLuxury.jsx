import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import PopUpForm from "../../PopUpForm/PopUpForm";

const GridLuxury = () => {
  const NavigateToFirstPage = useNavigate();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handlePopUpToggle = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };
  const posts = [
    {
      image: "/src/assets/lxBathroom.jpg",
      tag: "INTERIOR",
      title: "Spa-Inspired Bathrooms: Designer Fixtures and Premium Finishes.",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "A spa-inspired bathroom is more than merely an aesthetic appeal; it's an immersive...",
    },
    {
      image: "/src/assets/ksSpecial.jpg",
      tag: "OUTDOOR",
      title: "Extravagant Outdoor Areas: Lavish Seating and Grand Landscaping.",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "Luxuriously outdoor rooms are more than mere relaxation places; they were designed to be an lavish extension of your...",
    },
    {
      image: "/src/assets/ksFurniture.jpg",
      tag: "INTERIOR",
      title: "Bespoke furniture: unique designs, perfect handcrafts",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "Bespoke furniture epitomizes the definition of personal luxury, with unique designs available that ...",
    },
    {
      image: "/src/assets/bedroom13.jpg",
      tag: "INTERIOR",
      title: "Lavish Bedrooms: Luxe Fabrics and Tailor-made Furniture",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "A lavish bedroom is a haven of luxury and comfort, carefully designed to bring one the truly...",
    },
    
    {
      image: "/src/assets/ksKitchen.jpg",
      tag: "INTERIOR",
      title: "Luxury Kitchen Concepts: Elevate Your Culinary Space",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "A luxury kitchen is more than just a place to cook; it is a hub of sophisticated design, advanced functionality and unparalleled style. This high-end culinary haven is equipped ...",
    },
    {
      image: "/src/assets/lxBalcony.jpg",
      tag: "INTERIOR",
      title: "Balcony Luxe: Top-Line Furniture and Charming Light",
      date: "March 19, 2020",
      author: "Tom Black",
      description:
        "The transformation of an old balcony to make a haven seems thoughtfully designed with high-grade pieces. Balcony Luxe creates a semi-ousted haven with premium furnishings...",
    },
  ];

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
              {/* <div className="flex  lg:flex-row flex-col pt-2 gap-3 font-semibold">
                <button
                  onClick={handlePopUpToggle}
                  className="border-[#104438] border rounded-lg py-2 px-6 hover:bg-[#104438]/30 text-[#104438]"
                >
                  Book Free Consultation
                </button>
                <button
                  onClick={() => NavigateToFirstPage("/homeinterior/bhk")}
                  className="bg-[#104438] px-8 text-white rounded-lg"
                >
                  Get Started
                </button>
              </div> */}

              <div className="flex items-center justify-center pt-3 font-semibold">
                <button
                  onClick={handlePopUpToggle}
                  className="border-[#104438] border rounded-lg py-2 px-6 hover:bg-[#104438]/30 text-[#104438]"
                >
                  Book Free Consultation
                </button>
                {/* <button
                  onClick={() => NavigateToFirstPage("/homeinterior/bhk")}
                  className="bg-[#104438] px-8 lg:py-0 py-2 text-white rounded-lg"
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

export default GridLuxury;
