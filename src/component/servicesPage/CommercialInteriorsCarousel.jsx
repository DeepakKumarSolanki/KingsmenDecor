import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const commercialTypes = [
  {
    title: "Office Design: Inspiring Excellence, Embodying Elegance",
    subtitle: "Where innovation thrives in luxurious surroundings.",
    description:
      "Our office designs redefine the modern workplace with an exquisite balance of sophistication and functionality. From executive boardrooms bedecked with bespoke furnishings to open-plan workspaces inspiring collaboration, every detail reflects your company's ethos and ambition. We integrate cutting-edge technology, timeless aesthetics, and ergonomic luxury to craft environments that empower productivity, impress clients, and redefine professional elegance.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Hotels: Sophisticated Ambiances, Unparalleled Comfort",
    subtitle: "Transforming hospitality into an art form.",
    description:
      "Our hotel designs express grandeur with warmth for the visitor who indulges in pleasure. Elegant lobbies open into great rooms of breath-taking beauty; serene suites are now an oasis for the quiet refuge of refined relaxation. The smallest element-from gourmet dining areas to quiet spas-stands up and is painstakingly assembled for your guest's senses and soul.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Jewellery Showrooms: Glittering Tales of Beauty",
    subtitle: "A jewel box as precious as the jewels it holds.",
    description:
      "We design jewellery showrooms that are works of art in themselves, elevating your collections to new heights. Through the interplay of opulent materials, soft ambient lighting, and architectural finesse, we design interiors that captivate and enchant. Each space becomes a treasure trove where your customers are immersed in a luxurious shopping experience that mirrors the brilliance of your creations.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Hospitals: Luxury Care, Thoughtfully Designed",
    subtitle: "Healing spaces imbued with serenity and grace.",
    description:
      "Our hospital designs combine functionality with an elevated sense of calm, creating a haven for healing and comfort for patients. Using soothing tones, premium materials, and innovative layouts, we transform medical spaces into environments of serenity and efficiency. Whether it's a state-of-the-art lobby or private patient suites, every detail is designed to evoke trust, care, and an air of understated luxury.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Malls: Grandeur in Retail, Excellence in Experience",
    subtitle: "A celebration of style, luxury, and seamless commerce.",
    description:
      "Our mall designs create immersive shopping destinations that resonate with sophistication and charm. Lavish interiors, dramatic lighting, and intuitive layouts transform every visit into an extraordinary experience. From high-end boutiques to gourmet food courts, every zone is meticulously designed to delight shoppers and set new standards in retail luxury to make your mall a hallmark of opulent commerce.",
    image: "/placeholder.svg?height=300&width=400",
  },
];

const CommercialInteriorsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

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
      prevIndex + cardsPerView >= commercialTypes.length
        ? prevIndex
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <div className="main-container top-spacing bottom-spacing">
      {/* <h1 className="text-4xl font-bold text-center mb-8">
        Commercial Interiors
      </h1> */}

      <motion.h1
        className="lg:text-4xl text-xl font-semibold text-[#104438] text-center mb-8"
        initial={{ opacity: 1, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      >
        Commercial Interiors
      </motion.h1>
      <div className="relative">
        <div className="overflow-hidden">
          <motion.div
            className="flex transition-all ease-in-out duration-300"
            style={{
              width: `${(100 / cardsPerView) * commercialTypes.length}%`,
              transform: `translateX(-${
                (currentIndex * 100) / commercialTypes.length
              }%)`,
            }}
          >
            {commercialTypes.map((commercial, index) => (
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
                    src={commercial.image}
                    alt={commercial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl text-[#104438] font-semibold mb-2">
                      {commercial.title}
                    </h2>
                    <h3 className="text-lg text-gray-600 mb-4">
                      {commercial.subtitle}
                    </h3>
                    <p className="text-gray-700">{commercial.description}</p>
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
            currentIndex + cardsPerView >= commercialTypes.length
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          disabled={currentIndex + cardsPerView >= commercialTypes.length}
          aria-label="Next slide"
        >
          <IoIosArrowForward className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CommercialInteriorsCarousel;
