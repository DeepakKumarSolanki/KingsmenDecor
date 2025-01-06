import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import PopUpForm from "../../PopUpForm/PopUpForm";

const GridEssential = () => {
  const posts = [
    {
      image: "/src/assets/sofa6.jpg",
      tag: "INTERIOR",
      title: "Functional Furniture",
      date: "March 19, 2020",
      author: "Tom Black",
      description: "A Practical Design for Everyday in Premium",
    },
    {
      image: "/src/assets/dining2.jpg",
      tag: "INTERIOR",
      title: "Minimalist Dining Setup",
      date: "March 19, 2020",
      author: "Tom Black",
      description: "Simple, Effective, and Economic",
    },
    {
      image: "/src/assets/bedroom8.jpg",
      tag: "INTERIOR",
      title: "Comfortable Bedrooms",
      date: "March 19, 2020",
      author: "Tom Black",
      description: "Simple Elegance for Restful Retreats",
    },
    
    {
      image: "/src/assets/balcony1.jpg",
      tag: "INTERIOR",
      title: "Cozy Balcony",
      date: "March 19, 2020",
      author: "Tom Black",
      description: "An Inviting, Minimalist Retreat",
    },
    {
      image: "/src/assets/bathroom3.jpg",
      tag: "INTERIOR",
      title: "Practical Bathrooms",
      date: "March 19, 2020",
      author: "Tom Black",
      description: "Clean, Functional Design for a Fresh Feel",
    },
    {
      image: "/src/assets/outdoorSimple.jpg",
      tag: "OUTDOOR",
      title: "Simple Outdoors",
      date: "March 19, 2020",
      author: "Tom Black",
      description: "Creating a Welcoming Outdoor Retreat",
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
            loading="lazy"
              src={post.image}
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

// PostCard component (for GRID and LISTING)
// const PostCard = ({ image, title, date, author, description, tag }) => (

// );

export default GridEssential;
