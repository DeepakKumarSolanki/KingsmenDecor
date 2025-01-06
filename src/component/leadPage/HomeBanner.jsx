import React, { useState, useEffect } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleViewProjects = () => {
    navigate("/allProjects"); // Navigate to the "/allProjects" route
  };

  const slides = [
    {
      image: "/src/assets/check.jpg",
      title: "DESIGN",
      heading: "Transforming Spaces with Elegance ",
      subheading:
        "We take pride in crafting home decors that blend timeless elegance with modern aesthetics, making every corner uniquely yours. ",
    },
    {
      image: "/src/assets/homeBannner2.jpg",
      title: "EXCELLENCE",
      heading: "Elevating Your Living Style ",
      subheading:
        "Our expertise lies in designing decor that exudes sophistication while delivering contemporary charm to redefine your home's ambiance. ",
    },
    {
      image: "/src/assets/homeBanner3.jpg",
      title: "INTERIORS",
      heading: "Pioneers in Elegant Modernity ",
      subheading:
        "Experience the perfect fusion of style and functionality as we create stunning decor that transforms your space into a masterpiece. Want to work with us. ",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <section className="relative bg-[#104438] h-screen overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
      </div>

      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-[#104438] bg-opacity-50"></div>

      <div className="relative flex items-center justify-center h-full text-white px-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute transition-opacity duration-1000 w-full ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full gap-y-4 ">
              {/* Title Animation */}
              <h3
                className={`text-8xl md:text-8xl font-bold hidden lg:flex lg:items-center lg:justify-center  tracking-widest uppercase w-full text-center transform transition-all duration-1000 text-transparent z-10 ${
                  currentSlide === index
                    ? "translate-x-0 opacity-70"
                    : "translate-x-full opacity-0"
                }`}
                style={{
                  WebkitTextStroke: "1px white",
                  color: "transparent",
                }}
              >
                {slide.title}
              </h3>

              <div className="absolute lg:top-12 flex !gap-1 flex-col">
                <h1 className="font-heading text-2xl md:text-2xl font-semibold mb-4 animate-fadeInUp z-20 w-full text-center pt-8">
                  {slide.heading}
                </h1>

                <p className="font-subheading text-base md:text-base animate-fadeInUp delay-200 z-20 w-full md:w-[70%] mx-auto text-center py-4">
                  {slide.subheading}
                </p>
              </div>

              <div className="lg:py-10 lg:relative lg:z-20 pt-[30rem]">
                <button
                  onClick={handleViewProjects}
                  className="bg-[#104438] px-8 py-4 rounded-md text-white hover:bg-white hover:text-[#104438] transition"
                >
                  VIEW PROJECTS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-0 right-[3.5rem] lg:flex items-center gap-10 hidden">
        {/* Previous Arrow */}
        <button
          className="bg-[#104438]/40 hover:bg-[#104438] text-white p-2 h-10 w-10 transition "
          onClick={handlePrevSlide}
        >
          <IoArrowBackSharp className="text-xl font-thin" />
        </button>
        {/* Next Arrow */}
        <button
          className="bg-[#104438]/40 hover:bg-[#104438] text-white p-2 h-10 w-10 transition"
          onClick={handleNextSlide}
        >
          <IoMdArrowForward className="text-xl font-thin" />
        </button>
      </div>
    </section>
  );
};

export default HomeBanner;
