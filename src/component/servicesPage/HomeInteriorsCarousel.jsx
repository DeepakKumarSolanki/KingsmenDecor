import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PopUpForm from "../PopUpForm/PopUpForm";

const interiorTypes = [
  {
    title: "3 BHK: Charming Efficiency",
    subtitle:
      "Find yourself in perfect harmony of aesthetics and practicality.",
    description:
      "Our 3 BHK designs capture the essence of smart luxury, with every layout thoughtfully designed to maximize space and light. For modern families, are an epitome of elegance and seamless transitions with perfectly Luxury.",
    image: "/src/assets/3bhk.jpg",
  },
  {
    title: "3.5 BHK: An Ode to Luxury",
    subtitle: "For more space where it matters the most.",
    description:
      "The 3.5 BHK concept offers an additional half-room that can transform into your personal sanctuary, be it a study, home office, or creative studio. These homes merge contemporary design with practical luxury.",
    image: "/src/assets/3.5bhk.jpg",
  },
  {
    title: "4 BHK: Grand Living, Amplified",
    subtitle: "Space that speaks of sophistication.",
    description:
      "Step into a world of luxury with our 4 BHK homes, designed for the larger family or those who simply crave expansive living.",
    image: "/src/assets/4bhk.jpg",
  },
  {
    title: "4.5 BHK: Aspirations",
    subtitle: "Tailor-made blend of space and style.",
    description:
      "Our 4.5 BHK homes offer unparalleled flexibility and luxury, with an additional half-room designed to adapt to your lifestyle, this extra space redefines personalized luxury in a modern home.",
    image: "/src/assets/4.5bhk.jpg",
  },
  {
    title: "5 BHK: The Pinnacle of Luxury",
    subtitle: "Where every inch exudes grandeur.",
    description:
      "For those who prefer the ultimate luxury living lifestyle, our 5 BHK homes are the epitomes of magnificence with expansive layouts, grand interiors, and all this with an aura of sophistication.",
    image: "/src/assets/5bhk.jpg",
  },
];

const HomeInteriorsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  let [isPopUpOpen, setIsPopUpOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsPerView >= interiorTypes.length
        ? prevIndex
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  let handlePopUpToggle = () => {
    setIsPopUpOpen(!isPopUpOpen); // Toggle the popup visibility
  };
  return (
    <div className="main-container  bottom-spacing">
      <motion.h1
        className="lg:text-4xl text-xl font-semibold text-[#104438] text-center"
        initial={{ opacity: 1, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      >
        Home Interiors
      </motion.h1>
      <div className="relative mt-8">
        <div className="overflow-hidden">
          <motion.div
            className="flex transition-all ease-in-out duration-300 cursor-pointer"
            onClick={handlePopUpToggle}
            style={{
              width: `${(100 / cardsPerView) * interiorTypes.length}%`,
              transform: `translateX(-${
                (currentIndex * 100) / interiorTypes.length
              }%)`,
            }}
          >
            {interiorTypes.map((interior, index) => (
              <motion.div
                key={index}
                className={`w-full ${
                  cardsPerView === 1
                    ? ""
                    : cardsPerView === 2
                    ? "sm:w-1/2"
                    : "sm:w-1/2 lg:w-1/3"
                } p-4`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                  <img
                  loading="lazy"
                    src={interior.image}
                    alt={interior.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl text-[#104438] font-semibold mb-2">
                      {interior.title}
                    </h2>
                    <h3 className="text-lg text-gray-600 mb-4">
                      {interior.subtitle}
                    </h3>
                    <p className="text-gray-700">{interior.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <button
          onClick={prevSlide}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md ${
            currentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          disabled={currentIndex === 0}
          aria-label="Previous slide"
        >
          <IoIosArrowBack className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md ${
            currentIndex + cardsPerView >= interiorTypes.length
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          disabled={currentIndex + cardsPerView >= interiorTypes.length}
          aria-label="Next slide"
        >
          <IoIosArrowForward className="w-6 h-6" />
        </button>
      </div>
      {isPopUpOpen && <PopUpForm value={isPopUpOpen} />}
    </div>
  );
};

export default HomeInteriorsCarousel;
