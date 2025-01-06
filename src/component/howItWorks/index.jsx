import React from "react";
import "tailwindcss/tailwind.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Evalution from "./Evalution";
import DesignQuoteForm from "./DesignQuoteForm";
import PageHomeBanner from "../common/PageHomeBanner";

import { FaHandshake } from "react-icons/fa6";
import { GiOlive } from "react-icons/gi";
import { FaHourglassStart } from "react-icons/fa";
import { FaInstalod } from "react-icons/fa6";
import { RiEmotionHappyFill } from "react-icons/ri";

const HowItWorks = () => {
  const { ref: designFormRef, inView: designFormInView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Adjust the threshold as needed
  });
  return (
    <div className="bg-gray-100 relative">
      <div>
        {/* Large screen banner */}
        <div className="hidden lg:block">
          <PageHomeBanner
            title=""
            subtitle=""
            buttonText=""
            backgroundImage="/src/assets/NewDesign.jpg"
            onButtonClick={() => alert("Button Clicked!")}
          />
        </div>

        {/* Mobile or tablet screen banner */}
        <div className="block lg:hidden">
          <PageHomeBanner
            title=""
            subtitle=""
            buttonText=""
            backgroundImage="/src/assets/DesignProcess_Mobile_Version_Banner.jpg"
            onButtonClick={() => alert("Button Clicked!")}
          />
        </div>

        {/* Steps Section */}
        <section className="main-container">
          <Evalution />
          {/* Design Quote Form Section */}
          <div ref={designFormRef} className="top-spacing bottom spacing">
            {designFormInView && <DesignQuoteForm />}
          </div>
        </section>
      </div>
    </div>
  );
};
export default HowItWorks;
