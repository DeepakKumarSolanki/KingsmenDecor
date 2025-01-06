import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const ServiceSection = ({ title, description, imageSrc }) => (
  <div className="flex flex-col md:flex-row items-center gap-8 top-spacing bottom-spacing">
    <div className="md:w-1/2">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#104438]">{title}</h2>
      <p className="text-lg font-thin text-slate-800">{description}</p>
    </div>
    <div className="md:w-1/2">
      <img
      loading="lazy"
        src={imageSrc}
        alt={title}
        className="w-full h-[20rem] rounded-lg shadow-lg"
      />
    </div>
  </div>
);

const CommercialDesignItem = ({ title, description, imageSrc, index }) => (
  <div
    className="border border-gray-200 rounded-md shadow-sm bg-white hover:shadow-lg transition duration-300"
    data-aos="flip-left"
    data-aos-duration="1000"
    data-aos-delay={`${index * 100}`}
  >
    <div
      className="w-full h-64"
      style={{
        backgroundImage: `url('${imageSrc}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
    <div className="p-6">
      <div className="mb-4">
        <span className="inline-block bg-black text-white text-xs font-semibold px-3 py-1 rounded-sm">
          Commercial
        </span>
      </div>
      <h3 className="text-lg font-bold  mb-2 hover:text-gray-700 transition duration-300 text-[#104438]">
        {title}
      </h3>
      <p className="text-lg font-thin text-slate-800">{description}</p>
    </div>
  </div>
);

export default function FirstSection() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="main-container top-spacing">
      <motion.h1
        className="lg:text-4xl text-xl font-semibold text-[#104438] text-center"
        initial={{ opacity: 1, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      >
        Our Services
      </motion.h1>

      <ServiceSection
        title="Apartment Design"
        description="Where Sophistication Meets Space Optimization. Our apartment design service addresses the conversion of a very small living area into luxury havens that are fully functional. This is an endeavour focused on maximizing every inch available through modern aesthetics infused into layouts to ensure your homes exemplify comfort and style, be it in one bed-room retreat or an extensive penthouse, your personalities speak through our designs with regard to today's trends."
        imageSrc="/src/assets/appartmentService.jpg"
      />

      <ServiceSection
        title="Villa Design"
        description="Designing Majesty in Every Villa. With a passion for creating unique villa designs, we breathe life into your dream house. From lush interiors to harmonious layouts, we tailor each detail to reflect your lifestyle and taste. Whether timelessness is in the veins of grandeur or sleek minimalism, our luxury villa designs blend luxury with functionality to create an amazing sanctuary that complements surroundings."
        imageSrc="/src/assets/appartmentVilla.jpg"
      />

      <div className="bottom-spacing">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#104438]">
          Commercial Design
        </h2>
        <p className="text-gray-600 mb-8">
          Take Spaces to Inspire and Wow. Our commercial design services
          redefine excellence across a range of industries, delivering stunning
          interiors that captivate and engage.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CommercialDesignItem
            title="Office Design"
            description="Inspiring Productivity, Reflecting Professionalism. Our office design solutions are tailored to create workspaces that inspire innovation, boost productivity, and reflect your company's ethos."
            imageSrc="/src/assets/office.jpg"
            index={0}
          />
          <CommercialDesignItem
            title="Hotels"
            description="Weaving warm ambiances with richness and unparalleled guest comfort."
            imageSrc="/src/assets/hotels.jpg"
            index={1}
          />
          <CommercialDesignItem
            title="Jewellery Showrooms"
            description="Designs that showcase your exquisite collections in settings as precious as the jewels themselves."
            imageSrc="/src/assets/LuxuryJewelry.jpg"
            index={2}
          />
          <CommercialDesignItem
            title="Hospitals"
            description="Functional, calming interiors designed to enhance patient care and staff efficiency."
            imageSrc="/src/assets/hospital.jpg"
            index={3}
          />
          <CommercialDesignItem
            title="Malls"
            description="Dynamic and visually engaging spaces that create a seamless shopping experience for visitors."
            imageSrc="/src/assets/mall.jpg"
            index={4}
          />
        </div>
      </div>
    </div>
  );
}
